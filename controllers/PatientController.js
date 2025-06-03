const PatientRepository = require('../repositories/PatientRepository');
const { getFileUrl } = require('../utils/fileUtils');

class PatientController {
  static async getAll(req, res) {
    try {
      const patients = await PatientRepository.getAll(req, res);
      res.json(patients);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getPatientById(req, res) {
    try {
      const patient = await PatientRepository.getPatientById(req.params.id);
      if (patient) {
        const result = {
          ...patient.toJSON(),
          fotoUrl: getFileUrl(patient.foto, req, 'patient')
        };
        res.json(result);
      } else {
        res.status(404).json({ message: 'patient not found' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async uploadFoto(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const updated = await PatientRepository.updatePatient(req.params.id, {
        foto: req.file.filename,
      });
      const result = {
        ...updated.toJSON(),
        fotoUrl: getFileUrl(updated.foto, req, 'patient')
      };
      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = PatientController;
