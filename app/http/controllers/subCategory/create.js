const Joi = require('joi');

const subCategoryService = require('../../services/subCategory');
const { abort } = require('../../../helpers/error');

async function validation({ subcategoryName }) {
  try {
    const schema = Joi.object().keys({
      subcategoryName: Joi.string(),
    });

    return await schema.validateAsync({ subcategoryName });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
    const { name } = req.body;
    const iconSubCategory = req.file.filename;
    const subCategoryInformation = {
      subcategoryName,
      subCategory_icon: iconSubCategory,
      subCategory_slug
    };
    await validation({ subcategoryName, });
  
    await subCategoryService.create(subCategoryInformation);
  
    return res.status(201).send();
  }
  
  module.exports = create;