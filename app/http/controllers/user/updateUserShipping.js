const { abort } = require('../../../helpers/error');

const { ShippingDetail: shippingDetail, User } = require('../../../models');

async function updateUserShipping(req, res) {
  try {
    const { shippingId } = req.body;
    console.log('Tesst');

    const shippingArr = await shippingDetail
      .query()
      .where('userId', req.user.id)
      .orderBy('created_at', 'desc');
    if (!shippingArr.some((s) => s.id === shippingId)) {
      abort(400, 'Id shipping không tồn tại');
    }

    const data = await User.query().patchAndFetchById(req.user.id, {
      shippingId,
    });
    return res.status(200).send({
      message: 'Update user shipping successfully',
      data,
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = updateUserShipping;
