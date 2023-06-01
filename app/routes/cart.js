const express = require('express');

const { cart: cartController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/cart', auth, cartController.addToCart);
router.get('/activeCart', auth, cartController.getActiveCart);
router.delete('/cart/emptyCart', auth, cartController.emptyCart);
router.delete('/cart/:id', auth, cartController.deleteCart);
router.put('/cart/:id', auth, cartController.updateCart);
module.exports = router;
