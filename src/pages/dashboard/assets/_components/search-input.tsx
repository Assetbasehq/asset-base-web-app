import { Input } from "@/components/ui/input";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

export default function SearchInput({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Update URL whenever the input changes
  const updateURL = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      newParams.set("search", value); // set search param
    } else {
      newParams.delete("search"); // remove if empty
    }

    setSearchParams(newParams, { replace: true }); // avoid stacking browser history
  };

  // Handle typing with debounce for performance
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      updateURL(searchValue);
    }, 600); // 400ms delay

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue("");
    updateURL(""); // instantly clear URL
  };

  return (
    <div className={cn(`relative max-w-sm`, className)}>
      {/* Search Icon */}
      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-grey text-lg" />

      {/* Input Field */}
      <Input
        type="text"
        placeholder=""
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10 pr-10 rounded focus-visible:ring-1 focus-visible:ring-primary border text-custom-white"
      />

      {/* Clear Button */}
      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-custom-grey transition-colors"
        >
          <RiCloseLine className="text-lg" />
        </button>
      )}
    </div>
  );
}
