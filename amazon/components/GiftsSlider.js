import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function GiftsSlider({ items }) {
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-4">
      <div className="flex flex-row items-center mb-1 z-0">
        <p className="text-lg font-medium">Find the perfect gift</p>
        <p className="ml-5 text-sm font-light text-blue-700 cursor-pointer">
          Shop Holiday Gifts
        </p>
      </div>

      <div className="flex flex-row items-center overflow-hidden z-0">
        {items.map((item) => (
          <img key={item.id} className="mx-5 cursor-pointer" src={item.src} />
        ))}
      </div>

      <div className="absolute flex justify-between w-full pr-8 mt-20">
        <div className="px-6 flex drop-shadow-md align-center justify-center items-center rounded-md bg-white opacity-90 h-28 w-10">
          <h1 className="text-gray-200 font-bold self-center cursor-pointer">
            <ChevronLeftIcon className="h-12" />
          </h1>
        </div>

        <div className="px-6 flex drop-shadow-md justify-center place-self-end rounded-md bg-white opacity-90 h-28 w-10">
          <h1 className="text-gray-200 font-bold self-center cursor-pointer">
            <ChevronRightIcon className="h-12" />
          </h1>
        </div>
      </div>
    </div>
  );
}
