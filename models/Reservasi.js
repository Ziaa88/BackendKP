const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Spesialisasi = require('./Spesialisasi');

const Reservasi = sequelize.define('Reservasi', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  spesialisasiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' },
  },
  nama: { type: DataTypes.STRING, allowNull: false },
  umur: { type: DataTypes.INTEGER, allowNull: false },
  no_hp: { type: DataTypes.STRING, allowNull: false },
  alamat: { type: DataTypes.STRING, allowNull: false },
  jenis_kelamin: { type: DataTypes.STRING, allowNull: false },
  appointmentTime: { type: DataTypes.STRING, allowNull: false },
  appointmentDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('proses', 'selesai', 'batal'), defaultValue: 'proses' },
  createdAt: { allowNull: false, type: DataTypes.DATE },
  updatedAt: { allowNull: false, type: DataTypes.DATE },
},
  {
    timestamps: true,
    tableName: 'DT_RESERVASI',
  });

Reservasi.belongsTo(Spesialisasi, { foreignKey: 'spesialisasiId', targetKey: 'id' });

module.exports = Reservasi;
