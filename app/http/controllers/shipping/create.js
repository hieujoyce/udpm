const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const shippingService = require('../../services/shipping');
async function validation(data) {
  try {
    const schema = Joi.object().keys({
      province: Joi.string().min(1).max(255).required(),
      fullName: Joi.string().min(1).max(255).required(),
      address: Joi.string().min(1).max(255).required(),
      district: Joi.string().min(1).max(255).required(),
      ward: Joi.string().min(1).max(255).required(),
      phone: Joi.string().min(1).max(255).required(),
      postcode: Joi.string().min(1).max(60).required(),
    });

    return await schema.validateAsync({ ...data });
  } catch (error) {
    return abort(400, error.message);
  }
}
async function createShipping(req, res) {
  try {
    const data = req.body;
    const userId = req.params.userId;
    await validation(data);
    const shipping = await shippingService.createShipping(userId, data);
    return res.status(200).send({
      message: 'Create shipping successfully',
      data: shipping,
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = createShipping;
