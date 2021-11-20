import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../redux/slices/basketSlice";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

export default function CheckoutProduct({ product }) {
  const dispatch = useDispatch();

  const addItemToBasket = () => dispatch(addToBasket(product));
  const removeItemFromBasket = () => dispatch(removeFromBasket({ product }));

  return (
    <div className="grid grid-cols-5">
      <Image src={product.image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <div className="flex">
          {Array(product.rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs mt-2 mb-2 line-clamp-3">{product.description}</p>
        <Currency quantity={product.price} currency="CAD" />

        {product.hasPrime && (
          <div className="flex items-center space-x-2">
            <img className="w-12" src="/images/ads/ad-1.jpg" alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add Another
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Delete
        </button>
      </div>
    </div>
  );
}
