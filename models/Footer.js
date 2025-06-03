const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // pastikan Anda sudah membuat konfigurasi Sequelize

const Footer = sequelize.define('Footer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'DT_FOOTER',
});

module.exports = Footer;
