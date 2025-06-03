const RiwayatRepository = require('../repositories/RiwayatRepository');

class RiwayatController {
  static async getAll(req, res) {
    try {
      const history = await RiwayatRepository.getAll(req);
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async cancel(req, res) {
    try {
      const { id } = req.params;
      await RiwayatRepository.cancel(id);
      res.status(200).json({ message: "Reservasi dibatalkan" });
    } catch (error) {
      if (error.message === "Riwayat tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  static async getAntrian(req, res) {
    try {
      const { id } = req.params;
      const history = await RiwayatRepository.getAntrian(id);
      res.status(200).json(history);
    } catch (error) {
      if (error.message === 'Data tidak ditemukan') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  static async getRiwayatById(req, res) {
    try {
      const { id } = req.params;
      const history = await RiwayatRepository.getRiwayatById(id);
      res.status(200).json(history);
    } catch (error) {
      if (error.message === 'Data tidak ditemukan') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await RiwayatRepository.delete(id);
      res.status(200).json({ message: "Riwayat berhasil dihapus" });
    } catch (error) {
      if (error.message === "Riwayat tidak ditemukan") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RiwayatController;
