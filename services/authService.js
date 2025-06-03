const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');

class AuthService {
  static async login(credentials) {
    const user = await Patient.findOne({ where: { username: credentials.username } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, nama: user.nama, foto: user.foto, aktif: user.aktif, role: 'patient' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { user, token };
  }

  static async register(userData) {
    const existingUser = await Patient.findOne({ where: { username: userData.username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await Patient.create(userData);
    return user;
  }

  static async adminLogin(credentials) {
    const admin = await Admin.findOne({ where: { username: credentials.username } });
    if (!admin) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: admin.id, nama: admin.nama, foto: admin.foto, aktif: admin.aktif, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { admin, token };
  }

  static async adminRegister(userData) {
    const existingAdmin = await Admin.findOne({ where: { username: userData.username } });
    if (existingAdmin) {
      throw new Error('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const admin = await Admin.create(userData);
    return admin;
  }
}

module.exports = AuthService;
