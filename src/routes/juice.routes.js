const express = require('express');
const router = express.Router();
const juiceController = require('../controllers/juice.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { juiceSchema } = require('../validators/juice.validator');
const { uploadCloudinary } = require('../config/multer.config');
const upload = require('../utils/multer.util');

router.get('/', juiceController.getAllJuices);
router.get('/:id', juiceController.getJuiceById);

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  validate(juiceSchema),
  juiceController.createJuice
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  validate(juiceSchema),
  juiceController.updateJuice
);

router.delete('/:id', authMiddleware, juiceController.deleteJuice);

module.exports = router;