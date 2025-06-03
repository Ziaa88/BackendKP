const JadwalDokterUmumRepository = require('../repositories/JadwalDokterUmumRepository');

class JadwalDokterUmumController {
  static async getAll(req, res) {
    try {
      const jadwalDokterUmum = await JadwalDokterUmumRepository.getAll(req, res);
      res.json(jadwalDokterUmum);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getJadwalDokterUmumById(req, res) {
    try {
      const jadwalDokterUmum = await JadwalDokterUmumRepository.getJadwalDokterUmumById(req.params.id);
      if (!jadwalDokterUmum) {
        return res.status (400).json ({message: 'Jadwal Dokter Umum not found'})
      }
      res.json(jadwalDokterUmum);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createJadwalDokterUmum(req, res) {
    try {
      const jadwalDokterUmum = await JadwalDokterUmumRepository.create(req.body);
      if (!jadwalDokterUmum) {
      return res.status (400).json ({message: 'Jadwal Dokter Umum not found'})
    }
      res.status(201).json ({
        message : 'Berhasil menambahkan jadwal Dokter Umum',
        data : jadwalDokterUmum
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateJadwalDokterUmum(req, res) {
    try {
      const jadwalDokterUmum = await JadwalDokterUmumRepository.update(req.params.id, req.body);
        if (!jadwalDokterUmum) {
      return res.status (404).json ({message: 'Jadwal Dokter Umum not found'})
    }
      res.json ({
        message : 'Berhasil mengubah jadwal Dokter Umum',
        data : jadwalDokterUmum
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteJadwalDokterUmum(req, res) {
    try {
      const jadwalDokterUmum = await JadwalDokterUmumRepository.delete(req.params.id);
        if (!jadwalDokterUmum) {
      return res.status (404).json ({message: 'Jadwal Dokter Umum not found'})
    }
      res.json ({
        message : 'Berhasil menghapus jadwal Dokter Umum',
        data : jadwalDokterUmum
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = JadwalDokterUmumController;
