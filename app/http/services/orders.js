const { abort } = require('../../helpers/error');
// @ts-ignore
const { Orders, OrdersDetail, Products } = require('../../models');
const { updateCart } = require('./cart');
// @ts-ignore
const Cart = require('../../models/Cart');

exports.deleteOrder = async ({ orderId, userId }) => {
  try {
    const order = await Orders.query().findOne({ id: orderId });
    if (!order) abort(400, 'OrderId không chính xác');
    const ordersDetailArr = await OrdersDetail.query().where(
      'orderId',
      orderId
    );

    ordersDetailArr
      .map((el) => el.id)
      .forEach(async (item) => {
        await OrdersDetail.query().deleteById(item);
      });

    await Orders.query().deleteById(orderId);

    // console.log(ordersDetailArr.map((el) => el.id));
    return 1;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.createOrder = async ({ userId, data }) => {
  try {
    let result = [];
    const { cartItems, quantityCartItems } = data;
    if (
      typeof cartItems == 'number' ||
      Array.isArray(cartItems) ||
      (typeof cartItems == 'string' && !isNaN(cartItems))
    ) {
      //console.log('Hello');
    } else {
      return abort(400, 'Lỗi kiểu dữ liệu cartItems');
    }
    if (
      typeof quantityCartItems == 'number' ||
      Array.isArray(quantityCartItems) ||
      (typeof quantityCartItems == 'string' && !isNaN(quantityCartItems))
    ) {
      //console.log('Hello');
    } else {
      return abort(400, 'Lỗi kiểu dữ liệu quantityCartItems');
    }
    if (!Array.isArray(cartItems) && !Array.isArray(cartItems)) {
      await updateCart(cartItems, { quantity: quantityCartItems });
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        await updateCart(cartItems[i], { quantity: quantityCartItems[i] });
      }
    }
    const findListCartById = await Cart.query().findByIds(cartItems);
    let notifiArr = [];
    let productQuantityArr = [];
    for (let i = 0; i < findListCartById.length; i++) {
      let item = findListCartById[i];
      let productId = item.productId,
        quantity = item.quantity;
      const isExitsProduct = await Products.query().findOne({
        id: productId,
      });
      productQuantityArr.push(isExitsProduct.quantity);
      if (quantity > isExitsProduct.quantity) {
        let el = `Số lượng ản phẩm ${isExitsProduct.productName} phải nhỏ hơn ${
          isExitsProduct.quantity + 1
        }`;
        notifiArr.push(el);
      }
    }

    if (notifiArr.length > 0) {
      return abort(400, notifiArr.join(','));
    }

    for (let i = 0; i < findListCartById.length; i++) {
      let item = findListCartById[i];
      let productId = item.productId;
      await Products.query().patchAndFetchById(productId, {
        quantity: productQuantityArr[i] - findListCartById[i].quantity,
      });
    }

    const createOrder = await Orders.query().insert({
      shippingId: data.shippingId,
      status: 'pending',
      userId,
    });

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

    // if (Array.isArray(cartItems)) {
    //   cartItems.forEach(async (item) => {
    //     await Cart.query().deleteById(item);
    //   });
    // } else {
    //   await Cart.query().deleteById(cartItems);
    // }
    if (result.length > 0) return { result, order: createOrder };
  } catch (error) {
    console.log(error);
    abort(500, error.message);
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
