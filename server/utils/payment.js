const Stripe = require('stripe');
stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripePay = async () => {
  const chargeResult = await stripe.charges.create({
    amount: 2000000,
    currency: 'INR',
    receipt_email: 'mk168804@gmail.com',
    description: 'Test Charge',
    source: 'tok_visa',
    metadata: { invoice_id: '6735', client_name: 'man', client_id: '1234453' },
  });

  return chargeResult;
};

module.exports = stripePay;
