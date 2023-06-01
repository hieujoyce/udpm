const Joi = require('joi');

const subCategoryService = require('../../services/subCategory');
const { abort } = require('../../../helpers/error');

async function validation({ subCategoryId, subcategoryName }) {
  try {
    const schema = Joi.object().keys({
      subCategoryId: Joi.number().integer().min(1),
      subcategoryName: Joi.string(),
    });

    return await schema.validateAsync({ subCategoryId, subcategoryName });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const { subCategoryId } = req.params;
  const { subcategoryName, subCategory_slug } = req.body;
  const categoryIcon = req.file.filename;

  await validation({ subCategoryId, subcategoryName, subCategory_slug });

  await categoryService.update({ subCategoryId, subcategoryName, categoryIcon, subCategory_slug });

  return res.status(204).send();
}

module.exports = update;