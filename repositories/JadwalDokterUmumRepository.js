const Doctor = require('../models/Doctor');
const Spesialisasi = require('../models/Spesialisasi');
const jadwalDokterUmum = require('../models/JadwalDokterUmum');
const { Op } = require('sequelize');

// Helper to sanitize numeric fields
function sanitizeData(data) {
  const numericFields = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
  numericFields.forEach(field => {
    if (data[field] === "") {
      data[field] = null;
    }
  });
  return data;
}

class JadwalDokterSpesialisasiRepository {
  static async getAll(req) {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const searchTerm = search.trim();

    const whereClause = searchTerm ? {
      [Op.or]: [
        { '$doctorSenin.nama$': { [Op.like]: `%${searchTerm}%` } },
      ]
    } : {};

    if (req.query.all === 'true') {
      const rows = await jadwalDokterUmum.findAll({
        where: whereClause,
        include: [
          { model: Doctor, as: 'doctorSenin', attributes: ['id', 'nama'] },
          { model: Doctor, as: 'doctorSelasa', attributes: ['id', 'nama'] },
          { model: Doctor, as: 'doctorRabu', attributes: ['id', 'nama'] },
          { model: Doctor, as: 'doctorKamis', attributes: ['id', 'nama'] },
          { model: Doctor, as: 'doctorJumat', attributes: ['id', 'nama'] },
          { model: Doctor, as: 'doctorSabtu', attributes: ['id', 'nama'] },
          { model: Doctor, as: 'doctorMinggu', attributes: ['id', 'nama'] }
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

    const get = await jadwalDokterUmum.findAndCountAll({
      where: whereClause,
      include: [
        { model: Doctor, as: 'doctorSenin', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorSelasa', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorRabu', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorKamis', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorJumat', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorSabtu', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorMinggu', attributes: ['id', 'nama'] }
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

  static async getJadwalDokterUmumById(id) {
    return await jadwalDokterUmum.findOne({
      where: { id },
      include: [
        { model: Doctor, as: 'doctorSenin', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorSelasa', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorRabu', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorKamis', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorJumat', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorSabtu', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorMinggu', attributes: ['id', 'nama'] }
      ]
    });
  }

  static async create(data) {
    data = sanitizeData(data);  // sanitize input
    return await jadwalDokterUmum.create(data);
  }

  static async update(id, data) {
    data = sanitizeData(data);  // sanitize input
    const jadwalSpesialisasi = await jadwalDokterUmum.findByPk(id);
    if (!jadwalSpesialisasi) throw new Error('jadwal dokter umum tidak ditemukan');
    await jadwalSpesialisasi.update(data);
    return await jadwalDokterUmum.findOne({
      where: { id },
      include: [
        { model: Doctor, as: 'doctorSenin', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorSelasa', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorRabu', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorKamis', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorJumat', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorSabtu', attributes: ['id', 'nama'] },
        { model: Doctor, as: 'doctorMinggu', attributes: ['id', 'nama'] }
      ]
    });
  }

    static async delete(id) {
      const jadwalDokter = await jadwalDokterUmum.findByPk(id);
      if (!jadwalDokter) throw new Error('Jadwal dokter umum tidak ditemukan');
      const deletedData = jadwalDokter.get({ plain: true });
      await jadwalDokter.destroy();
      return deletedData;
    }
}

module.exports = JadwalDokterSpesialisasiRepository;