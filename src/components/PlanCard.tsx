import Image from "next/image";

import { api } from "@/services/api";
import { getStripeJs } from "@/services/stripe/stripe-js";
import { CheckCircle } from "phosphor-react";

interface PlanOptions {
  id: number;
  name: string;
}

interface PlanCard {
  name: string;
  amount: string;
  stripeProductId: string;
  imageURL: string;
  options: PlanOptions[];
  active?: boolean;
}

export function PlanCard({
  name,
  amount,
  stripeProductId,
  imageURL,
  options,
  active = false,
}: PlanCard) {
  async function handleSubscribe() {
    try {
      const response = await api.post("/subscribe", {
        stripeProductId,
      });

      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div
      className={`${
        active && "ring-4 ring-orange-500"
      } flex-1 flex w-full flex-col items-center text-center bg-zinc-800 rounded-md px-7 py-10 text-gray-300`}
    >
      <Image src={imageURL} alt="" width={100} height={100} priority />
      <h1 className="text-2xl mt-7">{name}</h1>
      <span className="text-xl font-light text-white/70">{amount}</span>
      <ul className="flex flex-col gap-4 my-5">
        {options.map((option) => {
          return (
            <li key={option.id} className="flex items-center gap-2">
              <CheckCircle size={19} className="text-green-500" />
              {option.name}
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="mt-10 bg-orange-500 border-b-2 border-white text-white w-full py-2 rounded-full hover:brightness-75 transition-all"
        title="Clique para se inscrever"
        onClick={handleSubscribe}
      >
        Selecionar plano
      </button>
    </div>
  );
}
