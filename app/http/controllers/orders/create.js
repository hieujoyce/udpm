const { createOrder } = require('../../services/orders');
const { abort } = require('../../../helpers/error');

async function create(req, res, next) {
  try {
    const userId = req.user.id;
    const { result, order } = await createOrder({
      userId,
      data: req.body,
    });
    return res.status(200).send({
      order,
      data: result,
      message: 'Create order successfully',
    });
  } catch (error) {
    abort(error.statusCode, error.message);
    //next(error);
  }
}

module.exports = create;
