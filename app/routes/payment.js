const express = require('express');
const stripe = require('stripe')(
  'sk_test_51NGYqfEeVEcFjPQ3n0VLuH8mSdXQL9SlhrUIBB1WeqLW0UMYCoMTk6V1NHkRSig3GKrfosIWqtVKVffxL4ISc9xr00araHYXL2'
);
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/payment-sheet', auth, async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const { amount } = req.body;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'eur',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
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
