import { GetServerSideProps } from "next";

export default function Posts() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <h1 className="text-4xl">Área de membros</h1>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const session = {
    activeSubscription: null,
  };

  if (!session.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
