import { prisma } from "@/lib/prisma";
import { stripe } from "@/services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const userRef: any = await prisma.customer.findUnique({
    where: {
      stripe_customer_id: customerId,
    },
  });

  const subscription: any = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await prisma.subscription.create({
      data: subscriptionData,
    });
  } else {
    await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: subscriptionData,
    });
  }
}
