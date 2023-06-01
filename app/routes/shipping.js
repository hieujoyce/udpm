const express = require('express');

const { shipping: shippingController } = require('../http/controllers');
const auth = require('../http/middlewares/auth');
const router = express.Router();

router.get('/shipping/:userId', auth, shippingController.getShippingByUser);
router.delete('/shipping/:id', auth, shippingController.delete);

router.put('/shipping/:id', auth, shippingController.update);
router.post('/shipping/:userId', auth, shippingController.create);

module.exports = router;
