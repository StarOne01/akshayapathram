const express = require("express");
const router = express.Router();

router.post("/admin/", authController.registerUser); // Line likely causing the error
router.post("/login", authController.login);
