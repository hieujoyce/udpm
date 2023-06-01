const { abort } = require('../../../helpers/error');
const bannerService = require('../../services/banner');
async function createBanner(req, res) {
  try {
    const { path, filename } = req.file;
    const { alt, position } = req.body;

    const banner = await bannerService.createBanner({
      path,
      filename,
      alt,
      position,
    });
    return res.status(200).send({
      data: banner,
      message: 'Create banner successfully',
    });
  } catch (error) {
    abort(400, 'Params Error');
  }
}

module.exports = createBanner;
