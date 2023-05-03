import { prisma } from "@/lib/prisma";
import { stripe } from "@/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { stripeProductId } = req.body;

    const user = await prisma.customer.findUnique({
      where: {
        email: "rafaelsantospereira03@gmail.com",
      },
    });

    let customerId = user?.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: "rafaelsantospereira03@gmail.com",
        // metadata
      });

      await prisma.customer.update({
        where: {
          id: user?.id,
        },
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      });

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: stripeProductId as string,
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: `${process.env.BASE_URL}/finished`,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
