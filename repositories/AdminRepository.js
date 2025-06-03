const Admin = require('../models/Admin');

class AdminRepository {
  static async getAllAdmin(req) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const get = await Admin.findAndCountAll({
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

  static async getAdminById(id) {
    return await Admin.findByPk(id);
  }

  static async createAdmin(userData) {
    return await Admin.create(userData);
  }

  static async updateAdmin(id, userData) {
    const user = await Admin.findByPk(id);
    if (!user) throw new Error('Admin not found');
    return await user.update(userData);
  }

  static async deleteAdmin(id) {
    const user = await Admin.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.destroy();
  }
}

module.exports = AdminRepository;
