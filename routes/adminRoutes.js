const express = require('express');
const AdminController = require('../controllers/AdminController');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/admin',
  filename: (req, file, cb) => {
    const baseName = Date.now() + '-' + file.originalname;
    const fullPath = path.join('uploads/admin', baseName);

    if (fs.existsSync(fullPath)) {
      return cb(new Error('File already exists'), null);
    }

    cb(null, baseName);
  }
});
const upload = multer({ storage });

const router = express.Router();
router.use(authenticateToken);


router.get('/list', AdminController.getAllAdmin);
router.post('/create', AdminController.createAdmin);
router.post('/uploadFoto/:id', upload.single('foto'), AdminController.uploadFoto);
router.put('/update/foto/:id', upload.single('foto'), AdminController.updateFoto);

module.exports = router;