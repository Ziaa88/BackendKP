const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./Doctor');

const JadwalDokterUmum = sequelize.define('JadwalDokterUmum', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jadwal_mulai: {
    type: DataTypes.TIME,
    allowNull: true
  },
  jadwal_selesai: {
    type: DataTypes.TIME,
    allowNull: true
  },
  senin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
  selasa: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
  rabu: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
  kamis: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
  jumat: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
  sabtu: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
  minggu: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'DT_DOKTER', key: 'id' }
  },
}, {
  timestamps: true,
  tableName: 'DT_JADWAL_DOKTER_UMUM',
});

JadwalDokterUmum.belongsTo(Doctor, { foreignKey: 'senin', targetKey: 'id', as: 'doctorSenin' });
JadwalDokterUmum.belongsTo(Doctor, { foreignKey: 'selasa', targetKey: 'id', as: 'doctorSelasa' });
JadwalDokterUmum.belongsTo(Doctor, { foreignKey: 'rabu', targetKey: 'id', as: 'doctorRabu' });
JadwalDokterUmum.belongsTo(Doctor, { foreignKey: 'kamis', targetKey: 'id', as: 'doctorKamis' });
JadwalDokterUmum.belongsTo(Doctor, { foreignKey: 'jumat', targetKey: 'id', as: 'doctorJumat' });
JadwalDokterUmum.belongsTo(Doctor, { foreignKey: 'sabtu', targetKey: 'id', as: 'doctorSabtu' });
JadwalDokterUmum.belongsTo(Doctor, { foreignKey: 'minggu', targetKey: 'id', as: 'doctorMinggu' });

module.exports = JadwalDokterUmum;
