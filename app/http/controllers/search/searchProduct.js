const { abort } = require('../../../helpers/error');
const searchService = require('../../services/search');

async function searchProduct(req, res) {
  try {
    const { keyword, typeCategory, limit, page } = req.query;
    const result = await searchService.searchProductByName({
      keyword,
      typeCategory,
      limit,
      page,
    });
    return res.status(200).send({
      message: 'Search product success',
      data: result,
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = searchProduct;
