const database = require('../config/database');
const ReservasiRepository = require('../repositories/ReservasiRepository');
const RiwayatRepository = require('../repositories/RiwayatRepository');

class ReservasiController {
  static async getAllReservasi(req, res) {
    try {
      const reservasi = await ReservasiRepository.getAll(req);
      res.status(200).json(reservasi);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getReservasiById(req, res) {
    try {
      const { id } = req.params;
      const reservasi = await ReservasiRepository.getReservasiById(id);
      if (!reservasi) {
        return res.status(404).json({ message: 'Reservasi not found' });
      }
      res.status(200).json(reservasi);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async createReservation(req, res) {
    try {
      const { id } = req.params;
      const spesialisasiId = id;
      const { nama, umur, no_hp, alamat, jenis_kelamin, appointmentDate, appointmentTime } = req.body;

      const reservasi = await ReservasiRepository.createReservasi({
        spesialisasiId: spesialisasiId,
        nama,
        umur,
        no_hp,
        alamat,
        jenis_kelamin,
        appointmentDate,
        appointmentTime,
        status: 'proses'
      });

      const nomorAntrian = await RiwayatRepository.getQueueNumber(appointmentDate, spesialisasiId);
      const riwayat = await RiwayatRepository.create({
        reservasiId: reservasi.id,
        spesialisasiId: spesialisasiId,
        appointmentDate,
        appointmentTime,
        nama,
        status: 'proses',
        nomorAntrian
      });
      res.status(201).json({ 
        message : 'Berhasil menambahkan reservasi online',
        reservasi, 
        riwayat 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createReservasi(req, res) {
    try {
      const { spesialisasiId, nama, umur, no_hp, alamat, jenis_kelamin, appointmentDate, appointmentTime } = req.body;

      const reservasi = await ReservasiRepository.createReservasi({
        spesialisasiId: spesialisasiId,
        nama,
        umur,
        no_hp,
        alamat,
        jenis_kelamin,
        appointmentDate,
        appointmentTime,
        status: 'proses'
      });

      const nomorAntrian = await RiwayatRepository.getQueueNumber(appointmentDate, spesialisasiId);
      const riwayat = await RiwayatRepository.create({
        reservasiId: reservasi.id,
        spesialisasiId: spesialisasiId,
        appointmentDate,
        appointmentTime,
        nama,
        status: 'proses',
        nomorAntrian
      });
      res.status(201).json({ 
        message  : 'Berhasil menambahkan Reservasi Onsite',
        reservasi, 
        riwayat 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateReservasi(req, res) {
    try {
      const { id } = req.params;
      const reservasi = await ReservasiRepository.updateReservasi(id, req.body);
      if (!reservasi) {
        return res.status(404).json({ message: 'Reservasi not found' });
      }
      res.status(200).json({ 
        message : 'Berhasil mengubah reservasi',
        reservasi 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteReservasi(req, res) {
    try {
      const { id } = req.params;
      const reservasi = await ReservasiRepository.deleteReservasi(id);
      if (!reservasi) {
        return res.status(404).json({ message: 'Reservasi not found' });
      }
      res.status(200).json({ 
        message: 'Data reservasi berhasil dihapus',
        data : reservasi
       });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReservasiController;
