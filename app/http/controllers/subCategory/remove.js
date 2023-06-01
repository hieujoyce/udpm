const Joi = require('joi');

const subCategoryService = require('../../services/subCategory');
const { abort } = require('../../../helpers/error');

async function validation({ categoryId }) {
  try {
    const schema = Joi.object().keys({
      subCategoryId: Joi.number().integer().min(1),
    });

    return await schema.validateAsync({ subCategoryId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function remove(req, res) {
  const { subCategoryId } = req.params;

  await validation({ subCategoryId });

  await subCategoryService.remove({ subCategoryId });

  return res.status(204).send();
}

module.exports = remove;
