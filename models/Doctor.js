const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Spesialisasi = require('./Spesialisasi');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto: DataTypes.STRING,
  aktif: DataTypes.BOOLEAN,
  spesialisasiId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' }
  },
}, {
  timestamps: true,
  tableName: 'DT_DOKTER',
});

Doctor.belongsTo(Spesialisasi, { foreignKey: 'spesialisasiId', targetKey: 'id' });

module.exports = Doctor;
