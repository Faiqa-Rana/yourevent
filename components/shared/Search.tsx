"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="relative flex items-center min-h-[54px] w-full rounded-full bg-white px-4 py-2 shadow-lg transition duration-300 focus-within:ring-2 focus-within:ring-purple-500">
      {/* Search Icon */}
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="opacity-70"
      />
      {/* Search Input */}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="ml-3 w-full border-0 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default Search;
