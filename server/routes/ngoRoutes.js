const express = require("express");
const router = express.Router();
const ngoController = require('../controllers/ngoController');

router.get("/fetchNgo",ngoController.fetchNgo);

module.exports = router