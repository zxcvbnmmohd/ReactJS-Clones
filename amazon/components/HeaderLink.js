import { ChevronDownIcon } from "@heroicons/react/solid";

export default function HeaderLink({
  icon,
  topText,
  btmText,
  showDropDownIcon,
  onClick,
}) {
  return (
    <div className="flex flex-row mx-2 cursor-pointer" onClick={onClick}>
      {
        icon === null ? null : (<h1 className="text-white font-bold self-center">{icon}</h1>)
      }

      <div className="mx-1">
        <p className="text-white font-light text-xs m-0 p-0">{topText}</p>
        <h1 className="text-white font-bold text-sm -mt-1 p-0">{btmText}</h1>
      </div>

      {showDropDownIcon ? (
        <p className="text-white font-bold self-end">
          <ChevronDownIcon className="h-4 -ml-1 mb-1" />
        </p>
      ) : null}
    </div>
  );
}
