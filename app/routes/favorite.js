const express = require('express');

const { favorite: favoriteController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/favorite', auth, favoriteController.getAllFavoriteByUser);
router.post('/favorite', auth, favoriteController.addFavorite);
router.delete('/favorite', auth, favoriteController.removeFavorite);

module.exports = router;
