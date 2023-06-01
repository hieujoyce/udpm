const { abort } = require('../../../helpers/error');
const shippingService = require('../../services/shipping');

async function getShippingByUser(req, res) {
  try {
    const { userId } = req.params;
    const shippingList = await shippingService.getShippingByUser({ userId });
    return res.status(200).send({
      message: 'Get shipping list successfully',
      data: shippingList,
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = getShippingByUser;
