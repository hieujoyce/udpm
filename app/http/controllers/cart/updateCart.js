const Joi = require('joi');
const { abort } = require('../../../helpers/error');

const cartService = require('../../services/cart');

async function validation({ id }) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    return await schema.validateAsync({ id });
  } catch (error) {
    return abort(400, 'Params Error');
  }
}

async function updateCart(req, res) {
  try {
    const params = req.body;
    const { id } = req.params;
    await validation({ id });
    const result = await cartService.updateCart(id, params);
    return res.status(200).send({
      message: 'Cart updated successfully',
      data: result,
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = updateCart;
