const express = require('express');

const { category: categoryController } = require('../http/controllers');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');
const upload = require('../http/middlewares/uploadFile');

const router = express.Router();

router.post(
  '/categories',
  auth,
  checkPermission,
  upload.single('categoryIcon'),
  categoryController.create
);
router.get('/categories', categoryController.getList);
router.put(
  '/categories/:categoryId',
  auth,
  checkPermission,
  upload.single('file'),
  categoryController.update
);
router.delete(
  '/categories/:categoryId',
  auth,
  checkPermission,
  categoryController.remove
);

module.exports = router;
