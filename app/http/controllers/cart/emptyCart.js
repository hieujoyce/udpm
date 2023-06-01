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

async function emptyCart(req, res) {
  try {
    const userId = req.user.id;
    await validation({ userId });
    await cartService.emptyCart({
      userId,
    });
    return res.status(200).send({
      message: 'Delete All Cart successfully',
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = emptyCart;
