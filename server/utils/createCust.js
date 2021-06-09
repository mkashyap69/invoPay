const Stripe = require('stripe');
stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCust = async (
  client_id,
  client_name,
  client_email,
  client_phone
) => {
  const customer = await stripe.customers.create({
    email: client_email,
    name: client_name,
    phone: client_phone,
    metadata: {
      client_id,
    },
  });

  return customer;
};

module.exports = { createCust };
