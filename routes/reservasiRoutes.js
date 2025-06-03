const express = require('express');
const router = express.Router();
const ReservasiController = require('../controllers/ReservasiController');

router.get('/list', ReservasiController.getAllReservasi);
router.get('/:id', ReservasiController.getReservasiById);
router.post('/create', ReservasiController.createReservasi);
router.post('/:id', ReservasiController.createReservation);
router.put('/:id', ReservasiController.updateReservasi);
router.delete('/:id', ReservasiController.deleteReservasi);

module.exports = router;
