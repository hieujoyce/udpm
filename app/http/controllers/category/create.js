const Joi = require('joi');

const categoryService = require('../../services/category');
const { abort } = require('../../../helpers/error');
const convertToSlug = require('../../../utils/common');

async function validation({ categoryName }) {
  try {
    if(!categoryName) return abort(400, 'Params error');
    const schema = Joi.object().keys({
      categoryName: Joi.string(),
    });

    return await schema.validateAsync({ categoryName });
  } catch (error) {
    console.log(error);
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  try {
    const { categoryName } = req.body;
    await validation({ categoryName });
    const imageFilePath = req.file.path;
    const imageFileName = req.file.filename;
    const categorySlug = convertToSlug(categoryName);
    const result = await categoryService.create({ categoryName, imageFilePath, imageFileName , categorySlug});
    return res.status(200).send({
      data: result,
      message: 'Create category successfully',
    });
  } catch (error) {
    abort(error.status, error.message);    
  }
}

module.exports = create;
