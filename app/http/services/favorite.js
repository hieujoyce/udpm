const productService = require('./product');
const { Favorite } = require('../../models');
const { abort } = require('../../helpers/error');
const { getDetail } = require('./product');

exports.getAllFavoriteByUser = async ({ userId }) => {
  try {
    const favorites = await Favorite.query().where('userId', userId);

    const mapFavorites = await Promise.all(
      favorites.map(async (item) => {
        const product = await getDetail({ productId: item.productId });
        return {
          ...product,
        };
      })
    );
    return mapFavorites;
  } catch (error) {
    abort(400, error.message);
  }
};

exports.addFavorite = async ({ productId, userId }) => {
  try {
    await productService.getDetail({ productId });
    const favorite = await Favorite.query().findOne({
      productId,
      userId,
    });
    if (favorite) {
      return abort(400, 'Products already in favorite');
    }
    const result = await Favorite.query().insert({
      productId,
      userId,
    });
    return result;
  } catch (error) {
    abort(400, error.message);
  }
};

exports.removeFavorite = async ({ productId, userId }) => {
  try {
    await productService.getDetail({ productId });
    const favorite = await Favorite.query().findOne({
      productId,
      userId,
    });

    if (!favorite) {
      return abort(400, 'Products not in favorite');
    }
    await Favorite.query().deleteById(favorite.id);
  } catch (error) {
    abort(400, error.message);
  }
};
