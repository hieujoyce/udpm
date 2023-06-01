const express = require('express');

const { auth: authController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);
router.post('/send-code', authController.sendCode);
router.post('/verify-code', authController.verifyCode);
router.post('/forgot-password', authController.forgotPassword);

router.get('/me', auth, authController.me);

module.exports = router;
