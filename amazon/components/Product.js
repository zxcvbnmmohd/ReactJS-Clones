import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { addToBasket } from "../redux/slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

export default function Product({ product }) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => dispatch(addToBasket(product));

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>

      <Image
        src={product.image}
        height={200}
        width={200}
        objectFit="contain"
        onClick={addItemToBasket}
      />

      <h4 className="my-3">{product.title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs mt-2 mb-2 line-clamp-2">{product.description}</p>

      <div className="mb-5">
        <Currency quantity={product.price} currency="CAD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5 mb-3">
          <img className="w-12" src="/images/ads/ad-1.jpg" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button
        className="mt-auto button bg-button rounded-md py-2"
        onClick={addItemToBasket}
      >
        Add to Cart
      </button>
    </div>
  );
}
