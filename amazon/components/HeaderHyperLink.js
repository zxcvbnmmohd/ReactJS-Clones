import { ChevronDownIcon } from "@heroicons/react/solid";

export default function HeaderHyperLink({ icon, text, showDropDownIcon }) {
  return (
    <div className="flex flex-row cursor-pointer">
      <p className="link flex items-center mx-3">
        {icon} {text}
      </p>
      {showDropDownIcon ? (
        <p className="text-white self-center">
          <ChevronDownIcon className="h-4 -ml-1" />
        </p>
      ) : null}
    </div>
  );
}
