import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Resolv AI",
    version: "1.0.0",
  },
});
