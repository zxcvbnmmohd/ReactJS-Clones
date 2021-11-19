import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

export default function SearchBar({ searchFor }) {
  const [item, setItem] = useState("");

  return (
    <form
      className="flex flex-grow items-center mx-3 h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
      onSubmit={(e) => {
        e.preventDefault();
        if (item.trim() !== "") searchFor(item.toLowerCase().trim());
        setItem("");
      }}
    >
      <input
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
        type="text"
        onChange={(e) =>
          item.trim() !== ""
            ? searchFor(e.target.value.toLowerCase().trim())
            : null
        }
      />
      <input className="invisible w-0" type="submit" />
      <SearchIcon className="h-12 p-3" />
    </form>
  );
}
