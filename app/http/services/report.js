const { abort } = require('../../helpers/error');
const { Orders, OrdersDetail } = require('../../models');

exports.getInfo = async () => {
  try {
    const orderDetailList = await OrdersDetail.query();
    const orderList = await Orders.query();
    const orderDetailListIsPayment = orderDetailList.filter(
      (el) => el.paymentId !== null
    );
    const paymentAmount = orderDetailList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const totalAmountOrderIsPayment = orderDetailListIsPayment.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    // filter list userId in orderList and filter duplicate userId
    const userIdList = orderList
      .map((item) => item.userId)
      .filter((value, index, self) => self.indexOf(value) === index);

    return {
      totalAllAmount: paymentAmount,
      totalAmountOrderIsPayment: totalAmountOrderIsPayment,
      paymentOrder: orderList.length,
      paymentUser: userIdList.length,
      pendingOrder: orderList.filter((item) => item.status === 'pending')
        .length,
      shippingOrder: orderList.filter((item) => item.status === 'shipping')
        .length,
      completedOrder: orderList.filter((item) => item.status === 'completed')
        .length,
      cancelledOrder: orderList.filter((item) => item.status === 'cancelled')
        .length,
    };
  } catch (error) {
    abort(500, error.message);
  }
};

// PENDING: 'pending',
// SHIPPING: 'shipping',
// COMPLETED: 'completed',
// CANCELLED: 'cancelled',
