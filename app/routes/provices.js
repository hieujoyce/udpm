const express = require('express');

const { provinces: provincesController } = require('../http/controllers');
const router = express.Router();

router.get('/provinces/divisions', provincesController.getAllDivisions);

module.exports = router;
