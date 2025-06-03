const express = require('express');
const router = express.Router();
const RiwayatController = require('../controllers/RiwayatController');

router.get('/list', RiwayatController.getAll);
router.post('/cancel/:id', RiwayatController.cancel);
router.get('/antrian/:id', RiwayatController.getRiwayatById);
router.delete("/:id", RiwayatController.delete);


module.exports = router;
