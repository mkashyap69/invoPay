const Stripe = require('stripe');
stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCard = async(
  card_number,
  card_exp_month,
  card_exp_year,
  card_cvc,
  card_holder_name
) => {
  const card = await stripe.customers.createSource(`cus_JbT0cUBtUNcfYA`, {
    source: 'tok_visa'
    // {
    //   object: 'card',
    //   number: card_number,
    //   exp_month: card_exp_month,
    //   exp_year: card_exp_year,
    //   cvc: card_cvc,
    //   name: card_holder_name,}
    },
  );

  return card;
};

module.exports = { createCard };
