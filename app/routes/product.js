const express = require('express');

const { product: productController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.post('/products', auth, checkPermission, productController.create);
router.get('/products', productController.getList);
router.get('/products/:productId', productController.getDetail);
router.put(
  '/products/:productId',
  auth,
  checkPermission,
  productController.update
);
router.delete(
  '/products/:productId',
  auth,
  checkPermission,
  productController.remove
);
router.post(
  '/products/uploads/file3d',
  auth,
  checkPermission,
  upload.array('files'),
  productController.uploadFile3d
);
module.exports = router;
