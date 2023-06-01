const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const favoriteService = require('../../services/favorite');

async function validation({ productId }) {
  try {
    if (!productId) return abort(400, 'Params error');
    const schema = Joi.object().keys({
      productId: Joi.number().integer(),
    });

    return await schema.validateAsync({ productId });
  } catch (error) {
    console.log(error);
    return abort(400, 'Params error');
  }
}

async function addFavorite(req, res) {
  try {
    const { productId } = req.body;
    const { id: userId } = req.user;
    await validation({ productId });

    const favorite = await favoriteService.addFavorite({ productId, userId });
    return res.status(200).send({
      data: favorite,
      message: 'Add favorite successfully',
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = addFavorite;
