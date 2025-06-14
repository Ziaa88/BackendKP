const AdminRepository = require('../repositories/AdminRepository');
const bcrypt = require('bcryptjs');
const { getFileUrl } = require('../utils/fileUtils');
const supabase = require('../utils/supabaseClient');
const path = require('path');

class AdminController {
  static async getAllAdmin(req, res) {
    try {
      const admins = await AdminRepository.getAllAdmin(req, res);
      res.json(admins);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAdminById(req, res) {
    try {
      const admin = await AdminRepository.getAdminById(req.params.id);
      res.json(admin);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  static async createAdmin(req, res) {
    try {
      const admin = await AdminRepository.createAdmin(req.body);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

static async uploadFoto(req, res) {
  try {
    const adminId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileExt = path.extname(req.file.originalname);
    const fileName = `admin/${Date.now()}_${adminId}${fileExt}`;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrl } = supabase
      .storage
      .from('admin')
      .getPublicUrl(fileName);
    const updated = await AdminRepository.updateAdmin(adminId, {
      foto: publicUrl.publicUrl
    });

    res.status(200).json({
      ...updated.toJSON(),
      fotoUrl: publicUrl.publicUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  static async updateFoto(req, res) {
  try {
    const adminId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const updated = await AdminRepository.updateAdmin(adminId, {
      foto: req.file.filename,
    });

    const result = {
      ...updated.toJSON(),
      fotoUrl: getFileUrl(updated.foto, req, 'admin'),
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

}

module.exports = AdminController;
