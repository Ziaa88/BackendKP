const Spesialisasi = require('../models/Spesialisasi');
const { Op } = require('sequelize');

class SpesialisasiRepository {
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
      const rows = await Spesialisasi.findAll({
        where: whereClause,
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

    const get = await Spesialisasi.findAndCountAll({
      where: whereClause,
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

  static async getSpesialisasiById(id) {
    return await Spesialisasi.findByPk(id);
  }

  static async createSpesialisasi(userData) {
    return await Spesialisasi.create(userData);
  }

  static async updateSpesialisasi(id, userData) {
    const user = await Spesialisasi.findByPk(id);
    if (!user) throw new Error('Spesialisasi not found');
    return await user.update(userData);
  }

  static async deleteSpesialisasi(id) {
    const spesialisasi = await Spesialisasi.findByPk(id);
    if (!spesialisasi) throw new Error('Spesialisasi not found');
    const deletedData = spesialisasi.get ({plain: true});
    await spesialisasi.destroy();
    return deletedData;
  }
}

module.exports = SpesialisasiRepository;
