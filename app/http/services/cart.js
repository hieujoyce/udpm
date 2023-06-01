const { abort } = require('../../helpers/error');
const { Products, User, Cart } = require('../../models');
const { getDetail } = require('./product');

exports.addItemToCart = async ({
  productId,
  userId,
  quantity,
  productSize,
  productColor,
}) => {
  try {
    let checkProduct = await Products.query().findById(productId);
    if (!checkProduct) return abort(400, 'Products not found');
    let checkUser = await User.query().findById(userId);
    if (!checkUser) return abort(400, 'User not found');

    let checkCart = await Cart.query().findOne({
      productId,
      userId,
      productSize,
      productColor,
    });

    if (checkCart) {
      let result = await Cart.query().patchAndFetchById(checkCart.id, {
        quantity: quantity,
        subTotal: quantity * checkProduct.sellingPrice,
      });
      return {
        products: checkProduct,
        ...result,
      };
    }

    let result = await Cart.query().insert({
      productId,
      userId,
      quantity,
      subTotal: quantity * checkProduct.sellingPrice,
      productSize,
      productColor,
    });
    return {
      products: checkProduct,
      ...result,
    };
  } catch (error) {
    abort(500, error.message);
  }
};

exports.getActiveCart = async ({ userId }) => {
  const result = await Cart.query().where({ userId });
  const products = await Promise.all(
    result.map(async (item) => {
      const product = await getDetail({ productId: item.productId });
      return {
        ...item,
        products: product,
      };
    })
  );

  return products;
};

exports.emptyCart = async ({ userId }) => {
  const result = await Cart.query().deleteById(userId);
  return result;
};

exports.updateCart = async (id, params) => {
  try {
    const { productId } = params;
    let checkProduct = await Products.query().findById(productId);
    if (!checkProduct) return abort(400, 'Products not found');
    const result = await Cart.query().patchAndFetchById(id, {
      ...params,
    });
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.deleteCart = async ({ id }) => {
  try {
    const result = await Cart.query().deleteById(id);
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};
