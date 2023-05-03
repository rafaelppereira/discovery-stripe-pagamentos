import { api } from "@/services/api";
import { getStripeJs } from "@/services/stripe/stripe-js";
import { CurrencyCircleDollar } from "phosphor-react";

export function SubscribeButton() {
  async function handleSubscribe() {
    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      title="Clique para realizar uma assinatura"
      className="bg-orange-500 flex items-center gap-3 px-7 py-4 rounded-full hover:brightness-90 hover:ring-4 hover:ring-orange-200 transition-all"
      onClick={handleSubscribe}
    >
      <CurrencyCircleDollar size={24} weight="light" />
      Realizar assinatura
    </button>
  );
}
