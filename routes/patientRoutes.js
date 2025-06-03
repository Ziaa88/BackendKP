const express = require('express');
const PatientController = require('../controllers/PatientController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: 'uploads/patient',
  filename: (req, file, cb) => {
    const baseName = Date.now() + '-' + file.originalname;
    const fullPath = path.join('uploads/patient', baseName);

    if (fs.existsSync(fullPath)) {
      return cb(new Error('File already exists'), null);
    }

    cb(null, baseName);
  }
});
const upload = multer({ storage });

const router = express.Router();
router.use(authenticateToken);

router.get('/list', PatientController.getAll);
router.get('/:id', PatientController.getPatientById);
router.post('/uploadFoto/:id', upload.single('foto'), PatientController.uploadFoto);

module.exports = router;
