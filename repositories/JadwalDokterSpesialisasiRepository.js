const Doctor = require('../models/Doctor');
const Spesialisasi = require('../models/Spesialisasi');
const jadwalDokterSpesialisasi = require('../models/JadwalDokterSpesialisasi');
const { Op } = require('sequelize');

class JadwalDokterSpesialisasiRepository {
  static async getAll(req) {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const searchTerm = search.trim();

    const whereClause = searchTerm ? {
      [Op.or]: [
        { '$Doctor.nama$': { [Op.like]: `%${searchTerm}%` } },
        { '$Spesialisasi.nama$': { [Op.like]: `%${searchTerm}%` } }
      ]
    } : {};

    if (req.query.all === 'true') {
      const rows = await jadwalDokterSpesialisasi.findAll({
        where: whereClause,
        include: [
          { model: Doctor, attributes: ['id', 'nama'] },
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

    const get = await jadwalDokterSpesialisasi.findAndCountAll({
      where: whereClause,
      include: [
        { model: Doctor, attributes: ['id', 'nama'] },
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

  static async getJadwalDokterSpesialisasiById(id) {
    return await jadwalDokterSpesialisasi.findOne({
      where: { id },
      include: [
        { model: Doctor, attributes: ['id', 'nama'] },
        { model: Spesialisasi, attributes: ['id', 'nama'] }
      ]
    });
  }

  static async create(data) {
    const exists = await jadwalDokterSpesialisasi.findOne({
      where: { doctorId: data.doctorId }
    });
    if (exists) {
      throw new Error('Jadwal dokter spesialis untuk Id dokter ini sudah ada.');
    }
    return await jadwalDokterSpesialisasi.create(data);
  }

  static async update(id, data) {
    const jadwalSpesialisasi = await jadwalDokterSpesialisasi.findByPk(id);
    if (!jadwalSpesialisasi) throw new Error('id dokter tidak tersedia');
    await jadwalSpesialisasi.update(data);
    return await jadwalDokterSpesialisasi.findOne({
      where: { id },
      include: [
        { model: Doctor, attributes: ['id', 'nama'] },
        { model: Spesialisasi, attributes: ['id', 'nama'] }
      ]
    });
  }

  static async delete(id) {
    const jadwalSpesialisasi = await jadwalDokterSpesialisasi.findByPk(id);
    if (!jadwalSpesialisasi) throw new Error('jadwal dokter spesialisasi sudah tidak tersedia');
    const deletedData = jadwalSpesialisasi.get({ plain: true });
    await jadwalSpesialisasi.destroy();
    return deletedData; 
  }
}  

module.exports = JadwalDokterSpesialisasiRepository;