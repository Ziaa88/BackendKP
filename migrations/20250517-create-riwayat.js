'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DT_RIWAYAT', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      reservasiId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DT_RESERVASI',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      spesialisasiId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DT_LAYANAN_SPESIALISASI',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      appointmentDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      appointmentTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('proses', 'selesai', 'batal'),
        defaultValue: 'proses',
      },
      nomorAntrian: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Saat rollback, hapus dulu enum agar gak error
    await queryInterface.dropTable('DT_RIWAYAT');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_DT_RIWAYAT_status";');
  }
};
