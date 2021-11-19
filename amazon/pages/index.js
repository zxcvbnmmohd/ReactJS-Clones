import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { Cart, HeaderLink, SearchBar } from "../components";

export default function Home() {
  const router = useRouter();

  useEffect(() => {});

  const searchFor = (item) => {
    setSearch(item)
  };
  
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <header className="sticky top-0 z-50">
        <div className="flex items-center bg-amazon_blue p-2 flex-grow py-3">
          <Image
            className="cursor-pointer"
            src="/images/logo-white.png"
            width={150}
            height={35}
            objectFit="contain"
            onClick={() => router.push("/")}
          />
          <HeaderLink
            icon={<LocationMarkerIcon className="h-6" />}
            topText={"Hello"}
            btmText={"Select your address"}
            showDropDownIcon={false}
          />
          <SearchBar search={searchFor} />
          <HeaderLink
            topText={"Hello, Sign in"}
            btmText={"Accounts & Lists"}
            showDropDownIcon={true}
          />
          <HeaderLink
            topText={"Returns"}
            btmText={"& Orders"}
            showDropDownIcon={false}
          />
          <Cart count={0} />
        </div>
      </header>

      <main className=""></main>

      <footer className=""></footer>
    </div>
  );
}
