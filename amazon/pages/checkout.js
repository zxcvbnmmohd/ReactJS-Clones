import { useSelector } from "react-redux";
import { useSession, signIn } from "next-auth/client";
import Head from "next/head";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Currency from "react-currency-formatter";
import { selectItems, selectTotal } from "../redux/slices/basketSlice";
import { Header, CheckoutProduct } from "../components/";

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout() {
  const [session, loading] = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await await axios.post(
      "/api/create-checkout-session",
      {
        items,
        email: session.user.email,
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div id="top" className="bg-background">
      <Head>
        <title>
          Amazon | Checkout | Next.JS, TailwindCSS, Firebase, Webhooks, Stripe
        </title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          {items.length === 0 ? (
            <div className="flex flex-row p-5 space-y-10 bg-white">
              <img className="mr-5" src="images/empty-cart.svg" width={250} />
              <div>
                <h1 className="text-3xl font-bold">
                  Your Amazon Basket is empty.
                </h1>
                <h1 className="text-xl pb-5 text-blue-500">
                  Shop today's deals
                </h1>
                {session ? (
                  <button
                    onClick={signIn}
                    className="mt-auto button bg-button rounded-md py-2 px-10"
                  >
                    Sign in to your account
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex flex-col p-5 space-y-10 bg-white">
              {items.map((item, i) => (
                <CheckoutProduct key={i} product={item} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col bg-white shadow-sm p-10">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="CAD" />
                </span>
              </h2>
              <button
                disabled={!session}
                onClick={createCheckoutSession}
                role="link"
                className={`button mt-2 button bg-button rounded-md py-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
              </button>
            </>
          )}
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
