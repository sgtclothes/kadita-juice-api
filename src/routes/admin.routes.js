const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/dashboard', authMiddleware, adminController.getDashboardData);

module.exports = router;