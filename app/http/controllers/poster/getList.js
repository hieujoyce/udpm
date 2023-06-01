const { abort } = require('../../../helpers/error');
const bannerService = require('../../services/banner');

async function getList(req, res) {
  try {
    const banner = await bannerService.getBanner();

    return res.status(200).send({
      topSlider: banner.filter((item) => item.position === 'top'),
      bottomSlider: banner.filter((item) => item.position === 'bottom') || [],
    });
  } catch (error) {
    abort(400, 'Params Error');
  }
}

module.exports = getList;
