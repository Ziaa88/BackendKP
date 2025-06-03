const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

class adminService {
  static async getByUsername(username, password) {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      throw new Error('Admin not found');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: admin.id, nama: admin.nama, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { admin, token };
  }

  static async register(userData) {
    const existingUser = await Admin.findOne({ where: { username: userData.username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Pastikan password di-hash sebelum disimpan
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await Admin.create(userData);
    return user;
  }

  static async adminLogin(credentials) {
    const admin = await Admin.findOne({ where: { username: credentials.username } });
    if (!admin) {
      throw new Error('Admin not found');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: admin.id, nama: admin.nama, foto: admin.foto, aktif: admin.aktif },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { admin, token };
  }
}

module.exports = adminService;