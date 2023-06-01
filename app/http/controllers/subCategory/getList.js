const subCategoryService = require('../../services/subCategory');

async function getList(req, res) {
  const subCategory = await subCategoryService.getList();

  return res.status(200).send(subCategory);
}

module.exports = getList;