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
import { useQuery } from "@tanstack/react-query";
import { walletService } from "@/api/wallet.api";
import SearchInput from "./_components/search-input";
import type { SelectOption } from "@/components/custom/custom-select";
import CustomSelect from "@/components/custom/custom-select";
import { RiFileList3Line } from "react-icons/ri";

const categories: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "Crypto", value: "crypto" },
  { label: "Stocks", value: "stocks" },
  { label: "Real Estate", value: "real-estate" },
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
  const category = searchParams.get("category") || "all";

  const { data, isLoading, isError } = useGetAssets();
  const [isGrid, setIsGrid] = useState(true);

  const { data: balance } = useQuery({
    queryKey: ["testing"],
    queryFn: async () => walletService.getNewWalletBalance(),
  });
  console.log({ balance });

  const navigate = useNavigate();

  console.log({ data });

  const handleParamsChange = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
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

        {/* Toggle Tabs */}
        {/* <div className="relative flex bg-custom-light-bg px-2 py-2 rounded-lg gap-2">
          <RiLayoutGridFill
            onClick={() => setIsGrid(true)}
            className={cn("w-6 h-6 z-10 cursor-pointer", {
              "text-white": isGrid,
              "text-custom-white-text": !isGrid,
            })}
          />

          <RiMenuLine
            onClick={() => setIsGrid(false)}
            className={cn(
              "w-6 h-6 z-10 pr-1",
              !isGrid ? "text-white" : "text-custom-white-text"
            )}
          />

          <motion.div
            layoutId="activeTab"
            className="absolute top-1 bottom-2 w-8 h-8 rounded-md bg-orange-500"
            initial={false}
            animate={{ left: isGrid ? 5 : 35 }} 
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div> */}
      </div>

      <div className="flex flex-col items-start gap-2 mt-4">
        <p className="text-custom-white-text text-2xl font-semibold">
          Launchpad
        </p>
        <p className="text-custom-grey text-sm">
          A curated list of securities available for funding
        </p>
      </div>

      <div className="lg:flex items-center">
        <div>
          <ul className="flex gap-2 text-custom-white text-sm mt-6 cursor-pointer bg-custom-card py-2 px-2 rounded-sm w-full">
            <li
              onClick={() => handleParamsChange("type", "all")}
              className={cn(
                `text-custom-grey px-1 sm:px-2 md:px-6 py-1 rounded-sm w-1/3`,
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
                `text-custom-grey px-1 sm:px-2 md:px-6 py-1 rounded-sm w-1/3`,
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
                `text-custom-grey px-1 sm:px-2 md:px-6 py-1 rounded-sm w-1/3`,
                {
                  "text-custom-white bg-custom-base": type === "newlyAdded",
                }
              )}
            >
              Newly Added
            </li>
          </ul>
        </div>

        <div className="flex gap-2 items-center justify-between mt-4">
          <SearchInput />
          <div className="flex gap-2 items-center ">
            <RiListOrdered
              onClick={() => setIsGrid(false)}
              className={cn(
                `w-10 h-10 p-2 border rounded text-custom-white cursor-pointer`,
                {
                  "border-custom-orange": !isGrid,
                }
              )}
            />
            <RiLayoutGridLine
              onClick={() => setIsGrid(true)}
              className={cn(
                `w-10 h-10 p-2 border rounded text-custom-white cursor-pointer`,
                {
                  "border-custom-orange": isGrid,
                }
              )}
            />
          </div>
          <div className="flex gap-2">
            <CustomSelect
              icon={<RiFileList3Line />}
              className="w-fit"
              options={categories}
              placeholder="Category"
              defaultValue={category ? category : undefined}
              onChange={(value) => handleParamsChange("category", value)}
            />
            <CustomSelect
              icon={<RiMapPin2Line />}
              className="w-fit"
              options={locations}
              placeholder="Location"
              defaultValue={location ? location : undefined}
              onChange={(value) => handleParamsChange("location", value)}
            />
          </div>
        </div>
      </div>

      <AssetGrid items={data || []} isGrid={isGrid} isLoading={isLoading} />
    </div>
  );
}
