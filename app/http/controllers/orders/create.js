const { createOrder } = require('../../services/orders');

async function create(req, res, next) {
  try {
    const userId = req.user.id;
    const result = await createOrder({
      userId,
      data: req.body,
    });
    return res.status(200).send({
      data: result,
      message: 'Create order successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = create;
