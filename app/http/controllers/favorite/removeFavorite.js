const favoriteService = require('../../services/favorite');
async function removeFavorite(req, res, next) {
  try {
    const { id: productId } = req.params;
    const userId = req.user.id;
    await favoriteService.removeFavorite({
      productId,
      userId,
    });
    return res.status(200).send({
      message: 'Delete favorite successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = removeFavorite;
