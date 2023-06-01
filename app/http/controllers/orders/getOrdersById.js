const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const ordersService = require('../../services/orders');

async function validation({ id }) {
  try {
    const schema = Joi.object().keys({
      id: Joi.number().integer().min(0),
    });

    return await schema.validateAsync({ id });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getOrdersById(req, res) {
  try {
    const { id } = req.params;
    await validation({ id });

    const result = await ordersService.getOrdersById({ id });
    return res.status(200).send({
      data: result,
      message: 'Get orders by id successfully',
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = getOrdersById;
