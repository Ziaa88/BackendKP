const DoctorRepository = require('../repositories/DoctorRepository');
const { getFileUrl } = require('../utils/fileUtils');

class DoctorController {
  static async getAll(req, res) {
    try {
      const doctors = await DoctorRepository.getAll(req, res);
      res.json(doctors);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getDoctorById(req, res) {
    try {
      const doctor = await DoctorRepository.getDoctorById(req.params.id);
      if (doctor) {
        const result = {
          ...doctor.toJSON(),
          fotoUrl: getFileUrl(doctor.foto, req, 'doctor')
        };
        res.json(result);
      } else {
        res.status(404).json({ message: 'Dokter tidak ditemukan' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createDoctor(req, res) {
    try {
      if (req.file) {
        req.body.foto = req.file.filename;
      }
      const doctor = await DoctorRepository.createDoctor(req.body);
      const result = {
        ...doctor.toJSON(),
        fotoUrl: getFileUrl(doctor.foto, req, 'doctor')
      };
      res.status(201).json({
        message: 'Berhasil menambahkan data dokter!',
        data: result
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateDoctor(req, res) {
    try {
      if (req.file) {
        req.body.foto = req.file.filename;
      }
      const updated = await DoctorRepository.updateDoctor(req.params.id, req.body);
      const result = {
        ...updated.toJSON(),
        fotoUrl: getFileUrl(updated.foto, req, 'doctor')
      };
      res.json({
        message: 'Berhasil mengubah data dokter',
        data: result
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteDoctor(req, res) {
    try {
      const response = await DoctorRepository.deleteDoctor(req.params.id);
      res.json({ 
        message: 'Berhasil menghapus dokter',
        response
     });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async uploadFoto(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'File tidak ditemukan' });
      }
      const updated = await DoctorRepository.updateDoctor(req.params.id, {
        foto: req.file.filename,
      });
      const result = {
        ...updated.toJSON(),
        fotoUrl: getFileUrl(updated.foto, req, 'doctor')
      };
      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = DoctorController;
