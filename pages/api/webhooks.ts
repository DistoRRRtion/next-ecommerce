import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { prisma } from '@/util/prisma';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).send('missing stripe signature');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send('webhooks error' + err);
  }

  // различные типы событий
  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntent = event.data.object;
      console.log('Payment intent was created ✅');
      break;
    case 'charge.succeeded':
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === 'string') {
        // if (charge.payment_intent) {
        const order = await prisma.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: { status: 'complete' },
        });
      }
      break;
    default:
      console.log('Unhandled event type:' + event.type);
  }
  res.json({ recived: true });
}
