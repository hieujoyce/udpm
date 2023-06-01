const express = require('express');

const { report: reportController } = require('../http/controllers');
const checkPermission = require('../http/middlewares/permission');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/report', auth, checkPermission, reportController.getInfo);
module.exports = router;
