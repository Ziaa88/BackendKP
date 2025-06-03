const express = require('express');
const FooterController = require('../controllers/FooterController');

const router = express.Router();

router.get('/:id', FooterController.getFooterById);
router.put('/:id', FooterController.updateFooter);

module.exports = router;
