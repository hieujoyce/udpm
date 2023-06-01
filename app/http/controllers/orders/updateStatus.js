const StatusOrders = require('../../../enums/StatusOrders');
const { abort } = require('../../../helpers/error');
const ordersService = require('../../services/orders');

async function updateStatus(req, res) {
  try {
    const { status, orderId } = req.body;
    const statusType = StatusOrders.getValues().find((item) => item === status);
    if (!statusType) abort(400, 'Status orders is invalid');
    await ordersService.updateStatus({ status, orderId });
    res.status(200).json({
      data: `Now status orders is ${status}`,
      message: 'Update status orders successfully',
    });
  } catch (error) {
    abort(error.statusCode, error.message);
  }
}

module.exports = updateStatus;
