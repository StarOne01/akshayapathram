const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Correct import

router.post("/register", authController.registerUser); // Line likely causing the error
router.post("/login", authController.login);

module.exports = router;
