const Joi = require('joi');

const categoryService = require('../../services/category');
const { abort } = require('../../../helpers/error');
const convertToSlug = require('../../../utils/common');
const { uploadImage } = require('../../../config/cloudinary');

async function validation({ categoryId, categoryName, categoryIcon, categorySlug}) {
  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().integer().min(1),
      categoryName: Joi.string(),
      categoryIcon: Joi.string(),
      categorySlug: Joi.string(),
    });

    return await schema.validateAsync({ categoryId, categoryName, categoryIcon, categorySlug });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  try {
    const { categoryId } = req.params;
    const params = req.body;
    const file = req.file;
    const categoryIcon = await uploadImage(file?.path);
    const categorySlug = await convertToSlug(params.categoryName)

    await validation({
      ...params,
      categoryId: categoryId,
      categorySlug,
      categoryIcon: categoryIcon?.secure_url
    });

    const data = await categoryService.update({ 
      ...params,
      categoryId: categoryId,
      categorySlug,
      categoryIcon: categoryIcon?.secure_url
    });

    if (data) {
      return res.status(200).send({
        message: 'Update category success',
        data,
      });
    }

  } catch (error) {
    return abort(400, error.message)
  }
}

module.exports = update;
