const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const fakePatients = [];
    for (let i = 0; i < 100; i++) {
      fakePatients.push({
      nama: faker.person.fullName().toLowerCase(),
      username: faker.internet.username().toLowerCase(),
      password: faker.internet.password(),
      foto: null,
      aktif: true,
      createdAt: new Date(),
      updatedAt: new Date()
      });
    }

    const fakeSpesialisasi = [];
    for (let i = 0; i < 100; i++) {
      const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
      let randomDays = days.filter(() => Math.random() < 0.5);
      if (randomDays.length === 0) {
      randomDays.push(days[Math.floor(Math.random() * days.length)]);
      }
      fakeSpesialisasi.push({
      nama: faker.company.name().toLowerCase(),
      jam_mulai: '08:00',
      jam_selesai: '16:00',
      foto: null,
      hari: JSON.stringify(randomDays),
      aktif: true,
      estimasi: Math.floor(Math.random() * 51) + 10,
      createdAt: new Date(),
      updatedAt: new Date()
      });
    }

    const fakeDokter = [];
    for (let i = 0; i < 100; i++) {
      fakeDokter.push({
        spesialisasiId: Math.floor(Math.random() * 100) + 1,
        nama: faker.person.fullName().toLowerCase(),
        foto: null,
        aktif: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    const jadwalSpesialisasi = []
    for (let i = 0; i < 100; i++) {
      jadwalSpesialisasi.push({
        spesialisasiId: Math.floor(Math.random() * 100) + 1,
        doctorId: Math.floor(Math.random() * 100) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    const jadwalUmum = []
    for (let i = 0; i < 100; i++) {
      jadwalUmum.push({
        jadwal_mulai: '08:00',
        jadwal_selesai: '16:00',
        senin: Math.floor(Math.random() * 100) + 1,
        selasa: Math.floor(Math.random() * 100) + 1,
        rabu: Math.floor(Math.random() * 100) + 1,
        kamis: Math.floor(Math.random() * 100) + 1,
        jumat: Math.floor(Math.random() * 100) + 1,
        sabtu: Math.floor(Math.random() * 100) + 1,
        minggu: Math.floor(Math.random() * 100) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }


    await queryInterface.bulkInsert('DT_LAYANAN_SPESIALISASI', fakeSpesialisasi);
    await queryInterface.bulkInsert('DT_PASIEN', fakePatients);
    await queryInterface.bulkInsert('DT_DOKTER', fakeDokter);
    await queryInterface.bulkInsert('DT_JADWAL_DOKTER_SPESIALISASI', jadwalSpesialisasi);
    await queryInterface.bulkInsert('DT_JADWAL_DOKTER_UMUM', jadwalUmum);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DT_LAYANAN_SPESIALISASI', null, {});
    await queryInterface.bulkDelete('DT_PASIEN', null, {});
    await queryInterface.bulkDelete('DT_DOKTER', null, {});
    await queryInterface.bulkDelete('DT_JADWAL_DOKTER_SPESIALISASI', null, {});
    await queryInterface.bulkDelete('DT_JADWAL_DOKTER_UMUM', null, {});
  }
};