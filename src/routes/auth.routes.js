const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { loginSchema } = require('../validators/auth.validator');

router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;