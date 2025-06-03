const JadwalDokterSpesialisasiRepository = require('../repositories/JadwalDokterSpesialisasiRepository');

class JadwalDokterSpesialisasiController {
  static async getAll(req, res) {
    try {
      const jadwalDokterSpesialisasi = await JadwalDokterSpesialisasiRepository.getAll(req, res);
      res.json(jadwalDokterSpesialisasi);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getJadwalDokterSpesialisasiById(req, res) {
    try {
      const jadwalDokterSpesialisasi = await JadwalDokterSpesialisasiRepository.getJadwalDokterSpesialisasiById(req.params.id);
      res.json(jadwalDokterSpesialisasi);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createJadwalDokterSpesialisasi(req, res) {
    try {
      const jadwalDokterSpesialisasi = await JadwalDokterSpesialisasiRepository.create(req.body);
      res.status(201).json ({
        message : 'Berhasil menambahkan Jadwal dokter Spesialis',
        data : jadwalDokterSpesialisasi
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateJadwalDokterSpesialisasi(req, res) {
    try {
      const jadwalDokterSpesialisasi = await JadwalDokterSpesialisasiRepository.update(req.params.id, req.body);
      res.json({
        message: 'Berhasil mengubah jadwal dokter spesialis',
        data: jadwalDokterSpesialisasi
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteJadwalDokterSpesialisasi(req, res) {
    try {
      const jadwalDokterSpesialisasi = await JadwalDokterSpesialisasiRepository.delete(req.params.id);
      res.json({
        message: 'Berhasil menghapus jadwal dokter spesialis',
        data: jadwalDokterSpesialisasi
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = JadwalDokterSpesialisasiController;
