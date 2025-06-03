const Patient = require('../models/Patient');

class PatientRepository {
  static async getAll(req) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const get = await Patient.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    },
    );
    return {
      data: get.rows,
      total: get.count,
      page: parseInt(page),
      limit: parseInt(limit)
    };
  }

  static async getPatientById(id) {
    return await Patient.findByPk(id);
  }

  static async createAdmin(userData) {
    return await Patient.create(userData);
  }

  static async updatePatient(id, userData) {
    const user = await Patient.findByPk(id);
    if (!user) throw new Error('Patient not found');
    return await user.update(userData);
  }

  static async deleteAdmin(id) {
    const user = await Patient.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.destroy();
  }
}

module.exports = PatientRepository;
