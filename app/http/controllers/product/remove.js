const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({ productId }) {
  try {
    const schema = Joi.object().keys({
      productId: Joi.number().min(1),
    });

    return await schema.validateAsync({ productId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function remove(req, res) {
  const { productId } = req.params;
  try {
    await validation({ productId });

    await productService.remove({ productId });
  } catch (error) {
    console.log(error);
    return abort(400, error.message);
  }

  return res.status(200).json({ message: 'Delete product success.' });
}

module.exports = remove;
