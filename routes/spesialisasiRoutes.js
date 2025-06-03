const express = require('express');
const SpesialisasiController = require('../controllers/SpesialisasiController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: 'uploads/spesialisasi',
  filename: (req, file, cb) => {
    const baseName = Date.now() + '-' + file.originalname;
    const fullPath = path.join('uploads/spesialisasi', baseName);

    if (fs.existsSync(fullPath)) {
      return cb(new Error('File already exists'), null);
    }

    cb(null, baseName);
  }
});
const upload = multer({ storage });

const router = express.Router();
router.use(authenticateToken);

router.get('/list', SpesialisasiController.getAll);
router.post('/create', upload.single('foto'), SpesialisasiController.createSpesialisasi);
router.get('/:id', SpesialisasiController.getSpesialisasiById);
router.post('/uploadFoto/:id', upload.single('foto'), SpesialisasiController.uploadFoto);
router.put('/:id', upload.single('foto'), SpesialisasiController.updateSpesialisasi);
router.delete('/:id', SpesialisasiController.deleteSpesialisasi);

module.exports = router;
