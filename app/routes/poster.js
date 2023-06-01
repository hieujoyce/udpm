const express = require('express');

const { poster: posterController } = require('../http/controllers');
const checkPermission = require('../http/middlewares/permission');
const { auth } = require('../http/middlewares');
const upload = require('../http/middlewares/uploadFile');

const router = express.Router();

router.get('/poster', posterController.getList);
router.post(
  '/poster/banner',
  auth,
  checkPermission,
  upload.single('image'),
  posterController.createBanner
);

module.exports = router;
