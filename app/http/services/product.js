/* eslint-disable no-undef */
const { Products, Category, Favorite } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async (params) => {
  // check product is already exits

  const isExitsProduct = await Products.query().findOne({
    productName: params.productName,
  });

  if (isExitsProduct) return abort(400, 'This product is already exits');

  const isExitsCategory = await Category.query().findById(params.categoryId);

  if (!isExitsCategory) return abort(400, 'This category is not already exits');

  const result = await Products.query().insert(params);

  return result;
};

exports.getList = async ({ limit, page, categoryId, userId, sortBy }) => {
  const offset = page * limit - limit;
  const [field, type] = sortBy ? sortBy.split('=') : ['id', 'asc'];
  let products = await Products.query()
    .offset(offset)
    .limit(limit)
    .orderBy(field, type);
  let favoriteList = null;
  let total = Products.query().count();

  if (categoryId) {
    // filter by category
    products = await Products.query()
      .offset(offset)
      .limit(limit)
      .where('categoryId', categoryId)
      .orderBy(field, type);

    total = await Products.query()
      .count()
      .where('categoryId', categoryId)
      .skipUndefined();
  }

  if (userId) {
    favoriteList = await Favorite.query().where('userId', userId);
    favoriteList = favoriteList.map((item) => item.productId);
  }

  products = await products;
  [{ 'count(*)': total }] = await total;

  products = products.map((product) => {
    const productThumbnailArray = product.productThumbnail.split(',');
    return {
      ...product,
      productThumbnail: productThumbnailArray,
    };
  });

  if (favoriteList) {
    products = products.map((item) => {
      if (favoriteList.includes(item.id)) {
        item.favoriteStatus = true;
      } else {
        item.favoriteStatus = false;
      }
      return item;
    });
  }
  return { products, total };
};

exports.getDetail = async ({ productId }) => {
  const product = await Products.query().findById(productId);

  if (!product) return abort(400, 'Products is not already exists');

  if (product.favoriteId) {
    product.favoriteStatus = true;
  }

  return product;
};

exports.update = async (params) => {
  const product = await Products.query().findById(params.productId);
  if (!product) return abort(400, 'This product is not already exits');

  const category = await Category.query().findById(params.categoryId);
  if (!category) return abort(400, 'This category is not already exits');

  const { productId, ...paramsWithoutId } = params;

  const result = await Products.query()
    .findById(productId)
    .update(paramsWithoutId);

  return result;
};

exports.remove = async ({ productId }) => {
  const product = await Products.query().findById(productId);

  if (!product) return abort(400, 'Products is not already exists');

  await Products.query().findById(productId).delete();

  return '';
};

exports.uploadFile = async (req, res) => {
  try {
    const { file } = req;

    if (!file) return res.status(400).json({ message: 'File is required' });

    return res
      .status(200)
      .json({ message: 'Upload file success', data: file.filename });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
