const SpesialisasiRepository = require('../repositories/SpesialisasiRepository');
const { getFileUrl } = require('../utils/fileUtils');
const supabase = require('../utils/supabaseClient');

class SpesialisasiController {
  static async getAll(req, res) {
    try {
      const spesialisasi = await SpesialisasiRepository.getAll(req, res);

      spesialisasi.data = spesialisasi.data.map(item => ({
        ...item.toJSON(),
        fotoUrl: getFileUrl(item.foto, req, 'spesialisasi')
      }));

      res.json(spesialisasi);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getSpesialisasiById(req, res) {
    try {
      const spesialisasi = await SpesialisasiRepository.getSpesialisasiById(req.params.id);
      if (spesialisasi) {
        const result = {
          ...spesialisasi.toJSON(),
          fotoUrl: getFileUrl(spesialisasi.foto, req, 'spesialisasi')
        };
        res.json(result);
      } else {
        res.status(404).json({ 
          message: 'Spesialisasi not found' 
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createSpesialisasi(req, res) {
    try {
      if (req.file) {
        req.body.foto = req.file.filename;
      }
      const spesialisasi = await SpesialisasiRepository.createSpesialisasi(req.body);
      const result = {
        ...spesialisasi.toJSON(),
        fotoUrl: getFileUrl(spesialisasi.foto, req, 'spesialisasi')
      };
      res.status(201).json ({
          message : 'Berhasil menambahkan layanan Spesialisasi',
          data : result
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async uploadFoto(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const updated = await SpesialisasiRepository.updateSpesialisasi(req.params.id, {
        foto: req.file.filename,
      });
      const result = {
        ...updated.toJSON(),
        fotoUrl: getFileUrl(updated.foto, req, 'spesialisasi')
      };
      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateSpesialisasi(req, res) {
    try {
      console.log(req.file)
      if (req.file) {
        req.body.foto = req.file.filename;
      }
      const updated = await SpesialisasiRepository.updateSpesialisasi(req.params.id, req.body);
      const result = {
        ...updated.toJSON(),
        fotoUrl: getFileUrl(updated.foto, req, 'spesialisasi')
      };
      res.json ({
        message : 'Berhasil mengubah layanan Spesialisasi',
        data : result
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteSpesialisasi(req, res) {
    try {
      const response = await SpesialisasiRepository.deleteSpesialisasi(req.params.id);
      res.json({ 
        message: 'Spesialisasi deleted successfully',
        response
    });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = SpesialisasiController;
