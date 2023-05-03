import Image from "next/image";
import { GetStaticProps } from "next";

import { stripe } from "@/services/stripe";
import Head from "next/head";
import { useEffect } from "react";
import { PlanCard } from "@/components/PlanCard";
import { planOptions } from "@/utils/plan-options";

interface ProductProps {
  name: string;
  description: string;
  price: {
    id: string;
    amount: string;
  };
}

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  useEffect(() => {
    const userEmail = localStorage.getItem("@Stripe/app");

    if (!userEmail) {
      localStorage.setItem("@Stripe/app", "rafaelsantospereira03@gmail.com");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sistema de inscrições | Resolv.ai</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <section className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="flex flex-col items-center md:flex-row md:items-end gap-6 w-full max-w-5xl p-10 md:p-0">
          {products.map((product) => {
            return (
              <PlanCard
                name={product.name}
                amount={product.price.amount}
                stripeProductId={product.price.id}
                imageURL="/plan_image.svg"
                options={planOptions.silver}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const findProducts: any = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = findProducts.data.map((product: any) => {
    return {
      name: product.name,
      description: product.description,
      price: {
        id: product.default_price.id,
        amount: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.default_price.unit_amount / 100),
      },
    };
  });

  return {
    props: {
      products: products.reverse(),
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
