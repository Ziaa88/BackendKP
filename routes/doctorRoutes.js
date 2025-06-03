const express = require('express');
const DoctorController = require('../controllers/DoctorController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: 'uploads/doctor',
  filename: (req, file, cb) => {
    const baseName = Date.now() + '-' + file.originalname;
    const fullPath = path.join('uploads/doctor', baseName);

    if (fs.existsSync(fullPath)) {
      return cb(new Error('File already exists'), null);
    }

    cb(null, baseName);
  }
});
const upload = multer({ storage });

const router = express.Router();
router.use(authenticateToken);

router.get('/list', DoctorController.getAll);
router.post('/create', upload.single('foto'), DoctorController.createDoctor);
router.get('/:id', DoctorController.getDoctorById);
router.post('/uploadFoto/:id', upload.single('foto'), DoctorController.uploadFoto);
router.put('/:id', upload.single('foto'), DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

module.exports = router;
