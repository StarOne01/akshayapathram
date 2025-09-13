const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/admin/register", authController.registerUser);
router.post("/admin/login", authController.login);

module.exports = router;
