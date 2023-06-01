const { abort } = require('../../helpers/error');
const { Orders, OrdersDetail } = require('../../models');

exports.getInfo = async () => {
  try {
    const orderDetailList = await OrdersDetail.query();
    const orderList = await Orders.query();
    const paymentAmount = orderDetailList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    // filter list userId in orderList and filter duplicate userId
    const userIdList = orderList
      .map((item) => item.userId)
      .filter((value, index, self) => self.indexOf(value) === index);

    return {
      paymentAmount,
      paymentOrder: orderList.length,
      paymentUser: userIdList.length,
      pendingOrder: orderList.filter((item) => item.status === 'pending')
        .length,
    };
  } catch (error) {
    abort(500, error.message);
  }
};
