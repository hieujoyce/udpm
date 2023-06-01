const express = require('express');

const { search: searchController } = require('../http/controllers');

const router = express.Router();

router.get('/search', searchController.searchProduct);
module.exports = router;
