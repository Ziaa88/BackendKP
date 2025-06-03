const express = require('express');
const jadwalDokterUmumController = require('../controllers/JadwalDokterUmumController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authenticateToken);


router.get('/list', jadwalDokterUmumController.getAll);
router.post('/create', jadwalDokterUmumController.createJadwalDokterUmum);
router.get('/:id', jadwalDokterUmumController.getJadwalDokterUmumById);
router.put('/:id', jadwalDokterUmumController.updateJadwalDokterUmum);
router.delete('/:id', jadwalDokterUmumController.deleteJadwalDokterUmum);

module.exports = router;