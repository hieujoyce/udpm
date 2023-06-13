const express = require('express');
const stripe = require('stripe')(
  'sk_test_51NGYqfEeVEcFjPQ3n0VLuH8mSdXQL9SlhrUIBB1WeqLW0UMYCoMTk6V1NHkRSig3GKrfosIWqtVKVffxL4ISc9xr00araHYXL2'
);
const { auth } = require('../http/middlewares');
const { abort } = require('../helpers/error');
// @ts-ignore
const { Orders, OrdersDetail } = require('../models');

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

const router = express.Router();

router.post('/payment-srtipe', auth, async (req, res) => {
  let stripe_Body = req.body;

  //let secureHash = stripe_Params['stripe_SecureHash'];
  //vnp_CurrCode stripe_OrderId cardNumber cvc dateCvc stripe_Amount

  // let querystring = require('qs');
  // let signData = querystring.stringify(stripe_Params, { encode: false });
  // let crypto = require('crypto');
  // let hmac = crypto.createHmac('sha512', secretKey);
  // let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  // res.json({
  //   signed,
  // });4242 4242 4242 4242

  let { stripe_OrderId, cardNumber, cvc, dateCvc, stripe_Amount } = stripe_Body;
  if (
    cardNumber === '4242424242424242' &&
    dateCvc === '12/34' &&
    cvc === '567'
  ) {
    try {
      const result = await Orders.query()
        .where({ id: stripe_OrderId })
        .withGraphFetched('shipping');

      if (!result) {
        return res.status(400).json({
          message: 'OrderId không chính xác.',
        });
      }
      //console.log(result);
      console.log(result[0].paymentType + ' ' + result[0].paymentId);
      if (result[0].paymentType && result[0].paymentId) {
        return res.status(400).json({
          message: 'Đơn hàng này đã được thanh toán tiền.',
        });
      }

      const ordersDetail = await OrdersDetail.query()
        .where({ orderId: stripe_OrderId })
        .withGraphFetched('product');
      const data = {
        ...result[0],
        ordersDetail,
      };

      let total = data.ordersDetail.reduce((a, b) => {
        return a + b.price;
      }, 0);
      if (stripe_Amount != total) {
        return res.status(400).json({
          total,
          message: 'Giá tiền không chính xác',
        });
      }
      const updateOrder = await Orders.query().patchAndFetchById(
        stripe_OrderId,
        {
          paymentType: 'card',
          paymentId: `${Math.floor(Math.random() * 1000000000000)}${total}`,
        }
      );

      return res.json({
        message: 'Đã thanh toán thành công',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      message: 'Tài khoản không đúng',
    });
  }
});

router.post('/payment-sheet', auth, async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const { amount } = req.body;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1,
    currency: 'usd',
    customer: customer.id,
    payment_method_types: [
      'bancontact',
      'card',
      'ideal',
      'klarna',
      'sepa_debit',
      'sofort',
    ],
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51NGYqfEeVEcFjPQ3qGptx1UrxflPSORQwhzF9wu3x0s5vKy0UBJNFrjRN2Rn7U9ZiR30pxBBbSTFGWBqXLSy9gdd00lh1K5eox',
  });
});

module.exports = router;
