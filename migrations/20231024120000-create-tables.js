'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DT_ADMIN', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nama: { type: Sequelize.STRING, allowNull: true },
      username: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false, unique: true },
      foto: { type: Sequelize.STRING, allowNull: true },
      aktif: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    // Create DT_LAYANAN_SPESIALISASI table
    await queryInterface.createTable('DT_LAYANAN_SPESIALISASI', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nama: { type: Sequelize.STRING, allowNull: false },
      jam_mulai: { type: Sequelize.STRING },
      jam_selesai: { type: Sequelize.STRING },
      foto: { type: Sequelize.STRING, allowNull: true },
      hari: { type: Sequelize.JSON },
      aktif: { type: Sequelize.BOOLEAN },
      estimasi: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    // Create DT_DOKTER table
    await queryInterface.createTable('DT_DOKTER', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nama: { type: Sequelize.STRING, allowNull: false },
      foto: { type: Sequelize.STRING, allowNull: true },
      aktif: { type: Sequelize.BOOLEAN },
      spesialisasiId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    // Create DT_PASIEN table
    await queryInterface.createTable('DT_PASIEN', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nama: { type: Sequelize.STRING, allowNull: false },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      foto: { type: Sequelize.STRING, allowNull: true },
      aktif: { type: Sequelize.BOOLEAN, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    // Create DT_JADWAL_DOKTER_SPESIALISASI table
    await queryInterface.createTable('DT_JADWAL_DOKTER_SPESIALISASI', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      spesialisasiId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    // Create DT_JADWAL_DOKTER_UMUM table
    await queryInterface.createTable('DT_JADWAL_DOKTER_UMUM', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      jadwal_mulai: { type: Sequelize.STRING, allowNull: true },
      jadwal_selesai: { type: Sequelize.STRING, allowNull: true },
      senin: {
        type: Sequelize.INTEGER, allowNull: true,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      selasa: {
        type: Sequelize.INTEGER, allowNull: true,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      rabu: {
        type: Sequelize.INTEGER, allowNull: true,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      kamis: {
        type: Sequelize.INTEGER, allowNull: true,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jumat: {
        type: Sequelize.INTEGER, allowNull: true,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      sabtu: {
        type: Sequelize.INTEGER, allowNull: true,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      minggu: {
        type: Sequelize.INTEGER, allowNull: true,
        allowNull: true,
        references: { model: 'DT_DOKTER', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    // Create DT_RESERVASI table
    await queryInterface.createTable('DT_RESERVASI', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      spesialisasiId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nama: { type: Sequelize.STRING, allowNull: false },
      umur: { type: Sequelize.INTEGER, allowNull: false },
      no_hp: { type: Sequelize.STRING, allowNull: false },
      alamat: { type: Sequelize.STRING, allowNull: false },
      jenis_kelamin: { type: Sequelize.STRING, allowNull: false },
      appointmentTime: { type: Sequelize.STRING, allowNull: false },
      appointmentDate: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.ENUM('proses', 'selesai', 'batal'), defaultValue: 'proses' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('DT_RIWAYAT', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      reservasiId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'DT_RESERVASI', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      spesialisasiId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'DT_LAYANAN_SPESIALISASI', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nama: { type: Sequelize.STRING, allowNull: false },
      appointmentDate: { allowNull: false, type: Sequelize.DATE },
      appointmentTime: { allowNull: false, type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('proses', 'selesai', 'batal'), defaultValue: 'proses' },
      nomorAntrian: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable('DT_FOOTER', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      telepon: { type: Sequelize.STRING, allowNull: true },
      whatsapp: { type: Sequelize.STRING, allowNull: true },
      alamat: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DT_JADWAL_DOKTER_SPESIALISASI');
    await queryInterface.dropTable('DT_JADWAL_DOKTER_UMUM');
    await queryInterface.dropTable('DT_DOKTER');
    await queryInterface.dropTable('DT_RIWAYAT');
    await queryInterface.dropTable('DT_RESERVASI');
    await queryInterface.dropTable('DT_LAYANAN_SPESIALISASI');
    await queryInterface.dropTable('DT_PASIEN');
    await queryInterface.dropTable('DT_FOOTER');
    // await queryInterface.dropTable('DT_ADMIN');
  }
};
