const { Category } = require('../../models');

const { abort } = require('../../helpers/error');
const { uploadImage } = require('../../config/cloudinary');

exports.create = async ({ categoryName, imageFilePath, categorySlug, imageFileName }) => {
  try {
    const category = await Category.query().findOne({
      categoryName,
    });
  
    if (category) return abort(400, 'This category is already exits');
    const result = await uploadImage(imageFilePath, imageFileName);
    const data = await Category.query().insert({ categoryName, categoryIcon: result.secure_url, categorySlug });
  
    return data;    
  }
  catch (error) {
    return abort(error.status, error.message);
  }
};

exports.update = async (params) => {
  const category = await Category.query().findById(params.categoryId);

  if (!category) return abort(400, 'This category is not already exits');

  const {categoryId, ...paramsWithoutId} = params;
  const result = await Category.query().findById(categoryId).update(paramsWithoutId);

  return result;
};

exports.getList = () => {
  const categories = Category.query().select('id', 'categoryName', 'categoryIcon', 'categorySlug');

  return categories;
};

exports.remove = async ({ categoryId }) => {
  try {
    const category = await Category.query().findById(categoryId);

    if (!category) return abort(400, 'This category is not already exists');
  
    await Category.query().findById(categoryId).delete();
  
    return ;
      
  } catch (error) {
    abort(400, 'Params error');    
  }
};
