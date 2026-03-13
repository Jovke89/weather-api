module.exports = async function handler(req, res) {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://membership-0ee8bc.webflow.io/',
      cancel_url: 'https://membership-0ee8bc.webflow.io/',
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ url: session.url });
    
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
}
