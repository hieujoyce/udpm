const Joi = require('joi');

const categoryService = require('../../services/category');
const { abort } = require('../../../helpers/error');

async function validation({ categoryId }) {
  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().integer().min(1),
    });

    return await schema.validateAsync({ categoryId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function remove(req, res) {
  try {
    const { categoryId } = req.params;

    await validation({ categoryId });
  
    await categoryService.remove({ categoryId });
    return res.status(200).send({
      message: 'Category removed successfully',
    });    
  } catch (error) {
    abort(500, 'Internal server error');
  }

}

module.exports = remove;
