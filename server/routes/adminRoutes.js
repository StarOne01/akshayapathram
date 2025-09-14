const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin auth routes (register/login remains)
router.post("/admin/register", authController.registerUser);
router.post("/admin/login", authController.login);

// Admin-only endpoints to manage organization/home requests (single entity)
router.get('/requests', adminController.listPendingOrgs);
router.post('/requests/:orgId/approve', authMiddleware, adminMiddleware, adminController.approveOrg);
router.post('/requests/:orgId/deny', authMiddleware, adminMiddleware, adminController.denyOrg);

module.exports = router;
