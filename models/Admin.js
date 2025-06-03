const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // pastikan Anda sudah membuat konfigurasi Sequelize

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aktif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  tableName: 'DT_ADMIN',
});

module.exports = Admin;
