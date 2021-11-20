import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import moment from "moment";
import firestore from "../firebase";
import { Header, Orders } from "../components/";

export default function Order({ orders }) {
  const router = useRouter();
  const [session] = useSession();

  return (
    <div id="top" className="bg-background">
      <Head>
        <title>
          Amazon | Orders | Next.JS, TailwindCSS, Firebase, Webhooks, Stripe
        </title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders?.length} orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Orders
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
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

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);

console.log('ORDERS')
  if (!session)
    return {
      props: {},
    };

  const stripeOrders = await firestore
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
