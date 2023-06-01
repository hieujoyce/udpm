const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const shippingService = require('../../services/shipping');

async function validation(data) {
  try {
    const schema = Joi.object().keys({
      province: Joi.number().integer().min(1),
      fullName: Joi.string().min(1).max(255),
      address: Joi.string().min(1).max(255),
      district: Joi.string().min(1).max(255),
      ward: Joi.string().min(1).max(255),
      postcode: Joi.string().min(1).max(255),
    });

    return await schema.validateAsync({ ...data });
  } catch (error) {
    return abort(400, error.message);
  }
}
async function updateShipping(req, res) {
  try {
    const data = req.body;
    await validation(data);
    const result = await shippingService.updateShipping({
      id: req.params.id,
      data,
    });
    return res.status(200).send({
      message: 'update shipping successfully',
      data: result,
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = updateShipping;
