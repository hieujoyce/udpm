const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const favoriteService = require('../../services/favorite');

async function getAllFavoriteByUser(req, res) {
  try {
    const { id: userId } = req.user;

    const favorites = await favoriteService.getAllFavoriteByUser({
      userId,
    });
    return res.status(200).send({
      data: favorites,
      message: 'Get All favorite successfully',
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = getAllFavoriteByUser;
