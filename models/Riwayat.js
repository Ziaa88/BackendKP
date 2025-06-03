const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Reservasi = require('./Reservasi');
const Spesialisasi = require('./Spesialisasi');

const Riwayat = sequelize.define('Riwayat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reservasiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'DT_RESERVASI', key: 'id' },
  },
  spesialisasiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' },
  },
  nama: { type: DataTypes.STRING, allowNull: false },
  appointmentDate: { type: DataTypes.DATE, allowNull: false },
  appointmentTime: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('proses', 'selesai', 'batal'), defaultValue: 'proses' },
 nomorAntrian: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  createdAt: { allowNull: false, type: DataTypes.DATE },
  updatedAt: { allowNull: false, type: DataTypes.DATE },
}, {
  tableName: 'DT_RIWAYAT',
  freezeTableName: true,
});

Riwayat.belongsTo(Reservasi, {
  foreignKey: 'reservasiId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Riwayat.belongsTo(Spesialisasi, {
  foreignKey: 'spesialisasiId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Riwayat;
