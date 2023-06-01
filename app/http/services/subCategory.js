const { abort } = require('../../helpers/error');
const { SubCategory } = require('../../models');

exports.create = async ({
  subcategoryName,
  subCategory_slug,
  subCategory_icon,
}) => {
  const subCategory = await SubCategory.query().findOne({
    subcategoryName,
  });

  if (subCategory) return abort(400, 'This category is already exits');

  await SubCategory.query().insert({
    subcategoryName,
    subCategory_slug,
    subCategory_icon,
  });

  return '';
};

exports.update = async ({
  subCategoryId,
  subcategoryName,
  subCategory_slug,
  icon: subCategory_icon,
}) => {
  const subCategory = await SubCategory.query().findOne({
    subcategoryName,
  });

  if (subCategory && subCategory.id === subCategoryId)
    return abort(400, 'This category is already exits');

  await subCategory
    .query()
    .findById(subCategoryId)
    .update({
      subcategoryName,
      subCategory_icon: subCategory_icon,
      subCategory_slug,
    });

  return '';
};

exports.getList = () => {
  const subCategories = SubCategory.query().select(
    'id',
    'subcategoryName',
    'subCategory_icon',
    'subCategory_slug'
  );

  return subCategories;
};

exports.remove = async ({ subCategoryId }) => {
  const subCategory = await SubCategory.query().findById(subCategoryId);

  if (!subCategory) return abort(400, 'This subCategory is not already exists');

  await SubCategory.query().findById(subCategoryId).delete();

  return '';
};
