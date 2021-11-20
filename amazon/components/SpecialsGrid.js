export default function SpecialsGrid({ items }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col m-5 bg-white z-30 p-4"
        >
          <h1 className="text-lg font-bold mb-1">{item.title}</h1>
          <img className="cursor-pointer" src={item.src} />
          <p className="text-xs text-blue-700 mt-4 mb-2 line-clamp-2 cursor-pointer">
            {item.buttonText}
          </p>
        </div>
      ))}
    </div>
  );
}
