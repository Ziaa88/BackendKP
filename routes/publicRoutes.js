const express = require('express');
const SpesialisasiController = require('../controllers/SpesialisasiController');
const JadwalDokterSpesialisasiController = require('../controllers/JadwalDokterSpesialisasiController');
const JadwalDokterUmumController = require('../controllers/JadwalDokterUmumController');
const router = express.Router();

router.get('/spesialisasi/list', SpesialisasiController.getAll);
router.get('/spesialisasi/:id', SpesialisasiController.getSpesialisasiById);
router.get('/jadwal-dokter-spesialisasi/list', JadwalDokterSpesialisasiController.getAll);
router.get('/jadwal-dokter-umum/list', JadwalDokterUmumController.getAll);

module.exports = router;