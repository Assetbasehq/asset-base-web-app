import { Button } from "@/components/ui/button";
import { useGetAssets } from "@/hooks/useAssets";
import {
  RiArrowLeftLine,
  RiLayoutGridLine,
  RiListOrdered,
  RiMapPin2Line,
} from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router";
import AssetGrid from "./_components/asset-grid";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SearchInput from "./_components/search-input";
import type { SelectOption } from "@/components/custom/custom-select";
import CustomSelect from "@/components/custom/custom-select";
import { RiFileList3Line } from "react-icons/ri";
import { SearchableSelect } from "@/components/custom/searchable-select";
import countries from "@/data/countries";

const categories: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "Art", value: "art" },
  { label: "Charity", value: "charity" },
  { label: "Commodities", value: "commodities" },
  { label: "Crypto", value: "crypto" },
  { label: "Debt/Bond", value: "debt" },
  { label: "Private Business", value: "private" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Startup", value: "startup" },
  { label: "Other", value: "other" },
];
const sortBy: SelectOption[] = [
  { label: "Newest First", value: "asc" },
  { label: "Oldest First", value: "desc" },
];

const locations: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "Nigeria", value: "nigeria" },
  { label: "United States", value: "united-states" },
  { label: "United Kingdom", value: "united-kingdom" },
];

export default function Assets() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") || "all";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  const { data, isLoading, isError } = useGetAssets();
  const [isGrid, setIsGrid] = useState(true);

  const navigate = useNavigate();

  console.log({ data });

  const handleParamsChange = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!value || value.toLowerCase() === "all") {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex justify-start items-start">
          <Button
            onClick={() => navigate(-1)}
            asChild
            className="flex items-center gap-2 cursor-pointer !px-4 py-2 bg-custom-light-bg text-custom-white-text rounded-lg hover:bg-custom-light-bg/80 transition-all duration-300 ease-in-out"
          >
            <span>
              <RiArrowLeftLine />
              <p>Back </p>
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 mt-4">
        <p className="text-custom-white-text text-2xl font-semibold">
          Launchpad
        </p>
        <p className="text-custom-grey text-sm">
          A curated list of securities available for funding
        </p>
      </div>

      <div className="lg:flex items-center justify-between w-full">
        <div className="lg:w-1/2 lg:max-w-sm">
          <ul className="flex gap-2 text-custom-white text-sm mt-6 cursor-pointer bg-custom-card py-2 px-2 rounded-sm w-full">
            <li
              onClick={() => handleParamsChange("type", "all")}
              className={cn(
                `text-custom-grey px-1 sm:px-2 md:px-2 py-1 rounded-sm w-1/3`,
                {
                  "text-custom-white bg-custom-base": type === "all",
                }
              )}
            >
              All
            </li>
            <li
              onClick={() => handleParamsChange("type", "upcoming")}
              className={cn(
                `text-custom-grey px-1 sm:px-2 md:px-2 py-1 rounded-sm w-1/3`,
                {
                  "text-custom-white bg-custom-base": type === "upcoming",
                }
              )}
            >
              Ending Soon
            </li>
            <li
              onClick={() => handleParamsChange("type", "newlyAdded")}
              className={cn(
                `text-custom-grey px-1 sm:px-2 md:px-2 py-1 rounded-sm w-1/3`,
                {
                  "text-custom-white bg-custom-base": type === "newlyAdded",
                }
              )}
            >
              Newly Added
            </li>
          </ul>
        </div>

        <div className="flex gap-2 items-center justify-between mt-4 lg:w-1/2 lg:max-w-lg">
          <SearchInput />
          <div className="flex gap-2 items-center ">
            <RiListOrdered
              onClick={() => setIsGrid(false)}
              className={cn(
                `w-9 h-9 p-2 border rounded text-custom-white cursor-pointer`,
                {
                  "border-custom-orange": !isGrid,
                }
              )}
            />
            <RiLayoutGridLine
              onClick={() => setIsGrid(true)}
              className={cn(
                `w-9 h-9 p-2 border rounded text-custom-white cursor-pointer`,
                {
                  "border-custom-orange": isGrid,
                }
              )}
            />
          </div>
          <div className="flex gap-2">
            <CustomSelect
              icon={<RiFileList3Line />}
              className="w-fit text-custom-white"
              options={categories}
              placeholder="Category"
              defaultValue={category || ""}
              onChange={(value) => {
                if (value === "all") {
                  return handleParamsChange("category", "");
                }
                handleParamsChange("category", value);
              }}
            />
            <SearchableSelect
              icon={<RiMapPin2Line />}
              options={countries.map((country) => ({
                label: `${country.flag} ${country.countryNameEn} `,
                value: country.countryNameEn.toLowerCase(),
              }))}
              placeholder="Select a country"
              value={location || ""}
              onChange={(value: string) => {
                handleParamsChange("location", value.toLowerCase());
              }}
            />
          </div>
        </div>
      </div>

      <AssetGrid
        assets={data || []}
        isGrid={isGrid}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
