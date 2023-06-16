const { deleteOrder } = require('../../services/orders');
const { abort } = require('../../../helpers/error');

async function deleteC(req, res, next) {
  try {
    const userId = req.user.id;
    const { id: orderId } = req.params;
    await deleteOrder({
      orderId,
      userId,
    });
    return res.status(200).send({
      message: 'Delete order successfully',
    });
  } catch (error) {
    abort(error.statusCode, error.message);
    //next(error);
  }
}

module.exports = deleteC;
