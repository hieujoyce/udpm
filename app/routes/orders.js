const express = require('express');

const { orders: ordersController } = require('../http/controllers');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');
const router = express.Router();

router.post('/orders', auth, ordersController.create);
router.get('/orders', auth, ordersController.getAllByUserId);
router.get('/orders/getOrdersById/:id', auth, ordersController.getOrdersById);
router.get(
  '/orders/getOrderDetailById/:id',
  auth,
  ordersController.getOrderDetailById
);
router.get('/orders/getAll', auth, checkPermission, ordersController.getAll);
router.put(
  '/orders/updateStatus',
  auth,
  checkPermission,
  ordersController.updateStatus
);

module.exports = router;
