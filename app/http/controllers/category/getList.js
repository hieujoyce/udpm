const categoryService = require('../../services/category');

async function getList(req, res) {
  const category = await categoryService.getList();

  return res.status(200).send(category);
}

module.exports = getList;
