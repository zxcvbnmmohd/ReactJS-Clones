import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <header className="sticky top-0 z-50">
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
          <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
            <Image
              onClick={() => router.push("/")}
              src="/images/logo-white.png"
              width={150}
              height={40}
              objectFit="contain"
              className="cursor-pointer"
            />
          </div>
        </div>
      </header>

      <main className=""></main>

      <footer className=""></footer>
    </div>
  );
}
