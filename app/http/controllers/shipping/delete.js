const { abort } = require('../../../helpers/error');
const shippingService = require('../../services/shipping');

async function deleteShipping(req, res) {
  try {
    const { id } = req.params;
    await shippingService.deleteShipping({ id });
    return res.status(200).send({
      message: 'Delete shipping successfully',
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = deleteShipping;
