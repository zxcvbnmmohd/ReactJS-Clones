import { useRouter } from "next/router";
import Image from "next/image";
import { LocationMarkerIcon, MenuIcon } from "@heroicons/react/outline";
import { Cart, HeaderHyperLink, HeaderLink, SearchBar } from "./";

export default function Header() {
  const router = useRouter();

  const searchFor = (item) => {
    setSearch(item);
  };

  return (
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
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <HeaderHyperLink icon={<MenuIcon className="h-6 mr-1" />} text="All" />
        <HeaderHyperLink text="Best Sellers" onClick={() => {}} />
        <HeaderHyperLink text="Deals Store" onClick={() => {}} />
        <HeaderHyperLink text="New Releases" onClick={() => {}} />
        <HeaderHyperLink
          text="Prime"
          showDropDownIcon={true}
          onClick={() => {}}
        />
        <HeaderHyperLink text="Customer Service" onClick={() => {}} />
        <HeaderHyperLink text="Gift Ideas" onClick={() => {}} />
        <HeaderHyperLink text="Electronics" onClick={() => {}} />
        <HeaderHyperLink text="Fashion" onClick={() => {}} />
        <HeaderHyperLink text="Home" onClick={() => {}} />
        <HeaderHyperLink text="Books" onClick={() => {}} />
        <HeaderHyperLink text="Toys & Games" onClick={() => {}} />
        <HeaderHyperLink text="Computers" onClick={() => {}} />
      </div>
    </header>
  );
}
