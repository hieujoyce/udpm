const { abort } = require('../../helpers/error');
const { ShippingDetail: shippingDetail, User } = require('../../models');

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
    const shippingUpdate = await User.query().patchAndFetchById(userId, {
      shippingId: shipping.id,
    });
    return shipping;
  } catch (error) {
    console.log(error);
    abort(400, error.message);
  }
};
