import { Product } from "./";

export default function ProductsGrid({ items }) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-4 mx-auto">
      {items.map((product) => (
        <Product key={product.id} product={product} />
      ))}

      <img className="col-span-full ml-4" src="/images/ads/ad-1.jpg" alt="" />

      <div className="md:col-span-2 xl:col-span-2">
        {items.slice(4, 5).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {items.slice(5, items.length).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
