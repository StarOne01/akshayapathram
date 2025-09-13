const express = require("express");
const router = express.Router();
const donateController = require('../controllers/donateController');

router.post("/donate", donateController.donate);
router.get("/getAllDonations", donateController.getAllDonations);

module.exports = router