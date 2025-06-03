const Reservasi = require('../models/Reservasi');
const Riwayat = require('../models/Riwayat');
const Spesialisasi = require('../models/Spesialisasi');
const { Op } = require('sequelize');

class ReservasiRepository {
  static async getAll(req) {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const searchTerm = search.trim();

    const whereClause = searchTerm ? {
      [Op.or]: [
        { nama: { [Op.like]: `%${searchTerm}%` } },
        { '$Spesialisasi.nama$': { [Op.like]: `%${searchTerm}%` } }
      ]
    } : {};

    if (req.query.all === 'true') {
      const rows = await Reservasi.findAll({
        where: whereClause,
        include: [
          { model: Spesialisasi, attributes: ['id', 'nama'] }
        ],
        order: [['id', 'DESC']]
      });
      return {
        data: rows,
        total: rows.length,
        page: 1,
        limit: rows.length,
        totalPages: 1
      };
    }

    const get = await Reservasi.findAndCountAll({
      where: whereClause,
      include: [
        { model: Spesialisasi, attributes: ['id', 'nama'] }
      ],
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'DESC']]
    });

    const totalPages = Math.ceil(get.count / limit);
    if (page > totalPages && totalPages > 0) {
      page = totalPages;
    }

    return {
      data: get.rows,
      total: get.count,
      page,
      limit,
      totalPages
    };
  }

  static async getReservasiById(id) {
    return await Reservasi.findByPk(id);
  }

  static async createReservasi(userData) {
    return await Reservasi.create(userData);
  }

  static async updateReservasi(id, userData) {
    console.log(userData);
    const reservasi = await Reservasi.findByPk(id);
    if (!reservasi) throw new Error('Reservasi not found');

    await Riwayat.update({ status: userData.status }, { where: { reservasiId: id } });
    return await reservasi.update(userData);
  }

  static async deleteReservasi(id) {
    const reservasi = await Reservasi.findByPk(id);
    if (!reservasi) throw new Error('Reservasi Untuk Id ini tidak tersedia');
    await Riwayat.destroy({ where: { reservasiId: id } });
    const deletedData = reservasi.get({ plain: true });
    await reservasi.destroy();
    return deletedData;
  }
}

module.exports = ReservasiRepository;
