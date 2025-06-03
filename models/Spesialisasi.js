const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Spesialisasi = sequelize.define('Spesialisasi', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jam_mulai: DataTypes.STRING,
  jam_selesai: DataTypes.STRING,
  hari: DataTypes.JSON,
  estimasi: DataTypes.INTEGER,
  aktif: DataTypes.BOOLEAN,
  foto: DataTypes.STRING,
},
  {
    timestamps: true,
    tableName: 'DT_LAYANAN_SPESIALISASI',
  });

Spesialisasi.associate = function (models) {
  Spesialisasi.hasMany(models.Doctor, { foreignKey: 'spesialisasiId', sourceKey: 'id' });
};

module.exports = Spesialisasi;
