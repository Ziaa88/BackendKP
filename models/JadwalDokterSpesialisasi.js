const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./Doctor');
const Spesialisasi = require('./Spesialisasi');

const JadwalDokterSpesialisasi = sequelize.define('JadwalDokterSpesialisasi', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  spesialisasiId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' }
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
}, {
  timestamps: true,
  tableName: 'DT_JADWAL_DOKTER_SPESIALISASI',
});

JadwalDokterSpesialisasi.belongsTo(Spesialisasi, { foreignKey: 'spesialisasiId', targetKey: 'id' });
JadwalDokterSpesialisasi.belongsTo(Doctor, { foreignKey: 'doctorId', targetKey: 'id' });

module.exports = JadwalDokterSpesialisasi;
