const { abort } = require('../../helpers/error');
// @ts-ignore
const { Orders, OrdersDetail } = require('../../models');
// @ts-ignore
const Cart = require('../../models/Cart');

exports.createOrder = async ({ userId, data }) => {
  try {
    let result = [];
    const { cartItems } = data;
    const createOrder = await Orders.query().insert({
      shippingId: data.shippingId,
      status: 'pending',
      userId,
    });
    const findListCartById = await Cart.query().findByIds(cartItems);
    const orderData = await OrdersDetail.query().insertGraph(
      findListCartById.map((item) => ({
        orderId: createOrder.id,
        productId: item.productId,
        productColor: item.productColor,
        productSize: item.productSize,
        price: item.subTotal,
        quantity: item.quantity,
      }))
    );
    result.push(orderData);
    // delete all cart item
    cartItems.forEach(async (item) => {
      await Cart.query().deleteById(item);
    });
    if (result.length > 0) return result;
  } catch (error) {
    abort(500, error);
  }
};

exports.getAllOrdersByUserId = async ({ page, limit, userId, sortBy }) => {
  try {
    if (page < 1 || limit < 1) abort(400, 'Invalid page or limit');
    const result = await Orders.query()
      .where({ userId })
      .orderBy('id', sortBy || 'desc')
      .withGraphFetched('shipping')
      .page(page - 1, limit);
    if (!result) abort(400, 'Orders not found');
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.getAll = async ({ page, limit }) => {
  try {
    if (page < 1 || limit < 1) abort(400, 'Invalid page or limit');
    const result = await Orders.query()
      .withGraphFetched('shipping')
      .page(page - 1, limit);
    // fetch all order Detail of each order
    const orderDetail = await OrdersDetail.query().withGraphFetched('product');
    result.results.forEach((order) => {
      orderDetail.forEach((detail) => {
        if (order.id === detail.orderId) {
          if (!order.orderDetail) order.orderDetail = [];
          order.orderDetail.push(detail);
        }
      });
    });
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.updateStatus = async ({ status, orderId }) => {
  try {
    const checkOrder = await Orders.query().findById(orderId);
    if (!checkOrder) abort(400, 'Order not found');
    const id = orderId;
    const result = await Orders.query().patchAndFetchById(id, { status });
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.getOrdersById = async ({ id }) => {
  try {
    const result = await Orders.query()
      .where({ id })
      .withGraphFetched('shipping');

    const ordersDetail = await OrdersDetail.query()
      .where({ orderId: id })
      .withGraphFetched('product');
    const data = {
      ...result[0],
      ordersDetail,
    };
    return data;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.getOrderDetailById = async ({ id }) => {
  try {
    const result = await OrdersDetail.query()
      .where({ id })
      .withGraphFetched('product');
    if (!result) abort(404, 'Orders not Found!!');
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};
