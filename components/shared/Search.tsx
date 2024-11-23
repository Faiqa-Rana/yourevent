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
    <div className="relative flex items-center border w-full rounded-md bg-white px-2 py-0 transition duration-300 focus-within:border focus-within:border-black">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="opacity-70"
      />

      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="ml-0 !ring-0 w-full !py-0 !shadow-none !border-none !outline-none bg-transparent text-gray-700 placeholder-gray-400 !focus:outline-none"
      />
    </div>
  );
};

export default Search;
