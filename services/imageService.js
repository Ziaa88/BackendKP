const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Patient } = require('./models'); // sesuaikan path model Sequelize

const router = express.Router();

// === Multer config ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads/patient');
    // pastikan folder uploads/patient ada
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// === Helper function ===
function buildFotoUrl(req, filename, folder = 'patient') {
  if (!filename) return null;
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}/uploads/${folder}/${filename}`;
}

async function deleteImage(filename, folder = 'patient') {
  if (!filename) return false;
  const filePath = path.join(__dirname, '../uploads', folder, filename);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

// === Route upload foto pasien ===
router.post('/api/patient/uploadFoto/:id', upload.single('foto'), async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await Patient.findByPk(id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Hapus foto lama kalau ada
    if (patient.foto) {
      await deleteImage(patient.foto);
    }

    // Simpan nama file baru
    patient.foto = req.file.filename;
    await patient.save();

    // Buat URL foto dinamis
    const fotoUrl = buildFotoUrl(req, patient.foto);

    return res.json({
      ...patient.toJSON(),
      fotoUrl
    });
  } catch (error) {
    console.error('Upload foto error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
