import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Header } from "../components/";

export default function Order({ orders }) {
  const router = useRouter();
  const [session] = useSession();

  return (
    <div id="top" className="bg-background">
      <Head>
        <title>
          Amazon | Success | Next.JS, TailwindCSS, Firebase, Webhooks, Stripe
        </title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
      <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            item has shipped, if you would like to check the status of your
            order(s) please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="mt-5 button bg-button rounded-md py-2"
          >
            Go to my orders
          </button>
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
