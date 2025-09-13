const express = require("express");
const router = express.Router();
const donateController = require('../controllers/donateController');

router.post("/donate", donateController.donate);

module.exports = router