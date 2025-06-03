const express = require('express');
const JadwalDokterSpesialisasiController = require('../controllers/JadwalDokterSpesialisasiController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authenticateToken);


router.get('/list', JadwalDokterSpesialisasiController.getAll);
router.post('/create', JadwalDokterSpesialisasiController.createJadwalDokterSpesialisasi);
router.get('/:id', JadwalDokterSpesialisasiController.getJadwalDokterSpesialisasiById);
router.put('/:id', JadwalDokterSpesialisasiController.updateJadwalDokterSpesialisasi);
router.delete('/:id', JadwalDokterSpesialisasiController.deleteJadwalDokterSpesialisasi);

module.exports = router;