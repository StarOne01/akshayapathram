const express = require('express');
const router = express.Router();
const recommendController = require('../controllers/recommendController');

// POST /recommend - expects { latitude, longitude, radiusKm? }
router.post('/', recommendController.sorted);

module.exports = router;
