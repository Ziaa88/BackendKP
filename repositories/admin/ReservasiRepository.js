const Reservasi = require('../models/Reservasi');
const Spesialisasi = require('../models/Spesialisasi');
const { Op } = require('sequelize');

class DoctorRepository {
  static async getAll(req) {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const searchTerm = search.trim();

    const whereClause = searchTerm ? {
      [Op.or]: [
        { nama: { [Op.like]: `%${searchTerm}%` } },
        { '$Spesialisasi.nama$': { [Op.like]: `%${searchTerm}%` } },
        { '$Reservasi.nama$': { [Op.like]: `%${searchTerm}%` } }
      ]
    } : {};

    if (req.query.all === 'true') {
      const rows = await Doctor.findAll({
        where: whereClause,
        include: [
          { model: Reservasi, attributes: ['id', 'nama', "umur", "no_hp"] },
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

    const get = await Doctor.findAndCountAll({
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

  static async getDoctorById(id) {
    return await Doctor.findByPk(id);
  }

  static async createDoctor(userData) {
    return await Doctor.create(userData);
  }

  static async updateDoctor(id, userData) {
    const user = await Doctor.findByPk(id);
    if (!user) throw new Error('Doctor not found');
    return await user.update(userData);
  }

  static async deleteDoctor(id) {
    const user = await Doctor.findByPk(id);
    if (!user) throw new Error('Doctor not found');
    return await user.destroy();
  }
}

module.exports = DoctorRepository;
