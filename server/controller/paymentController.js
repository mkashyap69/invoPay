const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/AppError');

const createCheckoutSession = async (req, res, next) => {
  try {
    const { invoiceId, total, clientEmail, clientId, clientToken } = req.body;
    if (total !== 0) {
      const session = await stripe.checkout.sessions.create({
        customer_email: `${clientEmail}`,
        submit_type: 'pay',
        billing_address_collection: 'auto',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: `${invoiceId}`,
              },
              unit_amount: total,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://invopay.netlify.app/checkout/${clientToken}/${clientId}?success=true&id=${invoiceId}`,
        cancel_url: `https://invopay.netlify.app/checkout/${clientId}?canceled=true`,
      });

      res.json({ id: session.id });
    }
  } catch (err) {
    return next(new AppError(401, err.message));
  }
};

module.exports = {
  createCheckoutSession,
};
