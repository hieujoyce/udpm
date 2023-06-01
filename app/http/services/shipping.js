const { abort } = require('../../helpers/error');
const shippingDetail = require('../../models/ShippingDetail');

exports.getShippingByUser = async ({ userId }) => {
  try {
    const shipping = await shippingDetail
      .query()
      .where('userId', userId)
      .orderBy('created_at', 'desc');
    return shipping;
  } catch (error) {
    abort(400, error.message);
  }
};

exports.deleteShipping = async ({ id }) => {
  try {
    await shippingDetail.query().deleteById(id);
  } catch (error) {
    abort(400, error.message);
  }
};

exports.updateShipping = async ({ id, data }) => {
  try {
    await shippingDetail.query().findById(id).update(data);
    const result = await shippingDetail.query().findById(id);
    return result;
  } catch (error) {
    abort(400, error.message);
  }
};

exports.createShipping = async (userId, data) => {
  try {
    const shipping = await shippingDetail.query().insert({
      userId,
      ...data,
    });
    return shipping;
  } catch (error) {
    abort(400, error.message);
  }
};
