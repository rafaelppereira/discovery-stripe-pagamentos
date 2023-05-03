import Head from "next/head";

export default function Finished() {
  return (
    <>
      <Head>
        <title>Obrigado por fazer sua assinatura | Resolv AI</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>
      <section className="w-full min-h-screen text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl">Obrigado!</h1>
        <p className="max-w-sm mt-5 font-light text-white/80">
          Sua compra foi{" "}
          <span className="text-cyan-500">finalizada com sucesso</span>,
          aproveite <span className="text-cyan-500">nossos conteúdos</span>{" "}
          exclusívos.
        </p>
      </section>
    </>
  );
}
