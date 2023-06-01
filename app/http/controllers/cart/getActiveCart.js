const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const cartService = require('../../services/cart');
async function validation({ userId }) {
  try {
    if (!userId) return abort(400, 'Missing params');
    const schema = Joi.object().keys({
      userId: Joi.number().integer(),
    });

    return await schema.validateAsync({ userId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    await validation({ userId });
    const result = await cartService.getActiveCart({
      userId,
    });
    return res.status(200).send({
      data: result,
      message: 'Get active cart successfully',
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = addToCart;
