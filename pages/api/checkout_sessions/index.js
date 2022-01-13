const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  success_url: 'localhost/success',
  cancel_url: 'localhost/cancel',
  line_items: [
    {
      name: 'Custom amount donation',
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      quantity: 1,
    },
  ],
  mode: 'payment',
});

const 