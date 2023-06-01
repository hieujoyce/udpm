const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const cartService = require('../../services/cart');
async function validation({
  productId,
  quantity,
  userId,
  productColor,
  productSize,
}) {
  try {
    if (!productId || !quantity || !userId) return abort(400, 'Missing params');
    const schema = Joi.object().keys({
      productId: Joi.number().integer(),
      quantity: Joi.number().integer(),
      productColor: Joi.string(),
      productSize: Joi.string(),
      userId: Joi.number().integer(),
    });

    return await schema.validateAsync({
      productId,
      quantity,
      userId,
      productColor,
      productSize,
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity, productSize, productColor } = req.body;
    const userId = req.user.id;
    await validation({
      productId,
      quantity,
      userId,
      productSize,
      productColor,
    });
    const result = await cartService.addItemToCart({
      productId,
      quantity,
      userId,
      productSize,
      productColor,
    });
    return res.status(200).send({
      data: result,
      message: 'Add to cart successfully',
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = addToCart;
