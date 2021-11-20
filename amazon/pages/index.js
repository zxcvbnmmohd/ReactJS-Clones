import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import {
  Header,
  HeaderSlider,
  SpecialsGrid,
  GiftsSlider,
  ProductsGrid,
} from "../components/";
import { carousels, specials, gifts } from "../configs/data";

export default function Home({ products }) {
  const [session, loading] = useSession();

  const router = useRouter();

  useEffect(() => {});

  return (
    <div id="top" className="bg-background">
      <Head>
        <title>Amazon | Next.JS, TailwindCSS, Firebase, Webhooks, Stripe</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <HeaderSlider items={carousels} />

        <SpecialsGrid items={specials} />

        <GiftsSlider items={gifts} />

        <ProductsGrid items={products} />
      </main>

      <footer className="">
        <div
          className="flex py-5 bg-amazon_blue-backToTop text-white self-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <p className="m-auto top-0 left-0 text-sm">Back to top</p>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );

  return {
    props: {
      session,
      products,
    },
  };
}
