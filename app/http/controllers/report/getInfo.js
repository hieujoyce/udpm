const { abort } = require('../../../helpers/error');
const reportService = require('../../services/report');

async function getInfo(req, res) {
  try {
    const result = await reportService.getInfo();
    return res.status(200).send({
      data: result,
      message: 'getInfo report successfully',
    });
  } catch (error) {
    abort(500, error.message);
  }
}

module.exports = getInfo;
