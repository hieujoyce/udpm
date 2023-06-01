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

async function deleteCart(req, res) {
  try {
    const { id } = req.params;
    await validation({ id });
    await cartService.deleteCart({ id });
    return res.status(200).send({
      message: 'Cart deleted successfully',
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = deleteCart;
