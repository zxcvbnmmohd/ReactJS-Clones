import { ChevronDownIcon } from "@heroicons/react/solid";

export default function HeaderHyperLink({ icon, text, showDropDownIcon }) {
  return (
    <div className="flex-row cursor-pointer inline-flex">
      <p className="link flex items-center mx-3">
        {icon} {text}
      </p>
      {showDropDownIcon ? (
        <p className="text-white self-center">
          <ChevronDownIcon className="h-4 -ml-2" />
        </p>
      ) : null}
    </div>
  );
}
