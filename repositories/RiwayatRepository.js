const { Op } = require('sequelize');
const Riwayat = require('../models/Riwayat');
const Spesialisasi = require('../models/Spesialisasi');
const Reservasi = require('../models/Reservasi');

class RiwayatRepository {
  static async getAll(req) {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const searchTerm = search.trim();

    const whereClause = {};
    if (searchTerm) {
      whereClause.nama = { [Op.like]: `%${searchTerm}%` };
    }

    if (req.query.all === 'true') {
      const rows = await Riwayat.findAll({
        where: whereClause,
        include: [
          { model: Spesialisasi, attributes: ['id', 'nama', 'jam_mulai', 'jam_selesai', 'hari', 'estimasi'] }
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
    // End new code

    const get = await Riwayat.findAndCountAll({
      where: whereClause,
      include: [
        { model: Spesialisasi, attributes: ['id', 'nama', 'jam_mulai', 'jam_selesai', 'hari', 'estimasi'] }
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

  static async create(data) {
    return await Riwayat.create(data);
  };

  static async getQueueNumber(appointmentDate, spesialisasiId) {
    const dateOnly = new Date(appointmentDate).toISOString().split("T")[0];
    const startDate = new Date(dateOnly);
    const endDate = new Date(dateOnly);
    endDate.setDate(endDate.getDate() + 1);

    const count = await Riwayat.count({
      where: {
        spesialisasiId,
        appointmentDate: {
          [Op.gte]: startDate,
          [Op.lt]: endDate
        }
      }
    });
    return count + 1;
  }

  static async cancel(id) {
  const riwayat = await Riwayat.findByPk(id);
  if (!riwayat) {
    throw new Error("Riwayat tidak ditemukan");
  }
  await Riwayat.update({ status: 'batal' }, { where: { id } });
  await Reservasi.update({ status: 'batal' }, { where: { id: riwayat.reservasiId } });
  return true;
}

  static async getAntrian(id) {
    const history = await Riwayat.findOne({ where: { id } });
    if (!history) throw new Error('Data tidak ditemukan');
    return history;
  }

  static async getRiwayatById(id) {
    const history = await Riwayat.findOne({
      where: { id },
      include: [
        { model: Reservasi, attributes: ['id', 'nama', 'no_hp', 'alamat', 'jenis_kelamin', 'umur'] },
        { model: Spesialisasi, attributes: ['id', 'nama', 'jam_mulai', 'jam_selesai', 'hari', 'estimasi'] }
      ],
    });
    if (!history) throw new Error('Data tidak ditemukan');
    return history;
  }
  static async delete(id) {
  const riwayat = await Riwayat.findByPk(id);
  if (!riwayat) throw new Error("Riwayat tidak ditemukan");
  await Riwayat.destroy({ where: { id } });
  await Reservasi.destroy({ where: { id: riwayat.reservasiId } });
  return true;
  }
}

module.exports = RiwayatRepository;
