import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Header, HeaderSlider } from "../components/";
import { carouselItems, specialsItems } from "../configs/data";

export default function Home() {
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
        <HeaderSlider items={carouselItems} />

        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
          {specialsItems.map((item) => (
            <div className="relative flex flex-col m-5 bg-white z-30 p-4">
              <h1 className="text-lg font-bold mb-1">{item.title}</h1>
              <img className="cursor-pointer" src={item.src} />
              <p className="text-xs text-blue-700 mt-4 mb-2 line-clamp-2 cursor-pointer">
                {item.buttonText}
              </p>
            </div>
          ))}
        </div>

        <div className="relative flex flex-col m-5 bg-white z-30 p-4">
          <div className="flex flex-row items-center">
            <p className="text-lg font-medium">Find the perfect gift</p>
            <p className="ml-5 text-sm font-light text-blue-700 cursor-pointer">Shop Holiday Gifts</p>
          </div>
          
          <div className="flex flex-row items-center">
          </div>
        </div>
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
