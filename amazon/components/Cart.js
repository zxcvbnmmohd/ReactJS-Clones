import Image from "next/image";

export default function Cart({ count }) {
  return (
    <div
      onClick={() => router.push("/checkout")}
      className="relative mx-2 flex items-center cursor-pointer link text-white"
    >
      <span className="absolute -top-3 right-0 md:right-11 h-3 w-3 text-yellow-400 text-xl text-center font-bold">
        {count}
      </span>
      <Image
        onClick={() => router.push("/")}
        src="/images/cart.png"
        width={30}
        height={30}
        objectFit="contain"
        className="h-10"
      />
      <p className="hidden md:inline font-extrabold md:text-sm mt-2">Cart</p>
    </div>
  );
}
