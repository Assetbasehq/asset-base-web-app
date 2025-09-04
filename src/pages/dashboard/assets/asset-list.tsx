import { Button } from "@/components/ui/button";
import { useGetAssets } from "@/hooks/useAssets";
import { RiArrowLeftLine, RiLayoutGridFill, RiMenuLine } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router";
import AssetGrid from "./_components/asset-grid";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { walletService } from "@/api/wallet.api";

export default function Assets() {
  const [search, setSearchParam] = useSearchParams();

  const type = search.get("type") || "all";

  const { data, isLoading, isError } = useGetAssets();
  const [isGrid, setIsGrid] = useState(true);

  const { data: balance } = useQuery({
    queryKey: ["testing"],
    queryFn: async () => walletService.getNewWalletBalance(),
  });
  console.log({ balance });

  const navigate = useNavigate();

  console.log({ data });

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

      <div>
        <div>
          <ul className="flex gap-6 text-custom-white text-sm mt-6 cursor-pointer bg-custom-card py-2 px-2 rounded-sm w-fit">
            <li
              onClick={() => setSearchParam({ type: "all" })}
              className={cn(`text-custom-grey px-8 py-1 rounded-sm`, {
                "text-custom-white bg-custom-base": type === "all",
              })}
            >
              All
            </li>
            <li
              onClick={() => setSearchParam({ type: "all" })}
              className={cn(`text-custom-grey px-8 py-1 rounded-sm`, {
                "text-custom-white bg-custom-base": type === "all",
              })}
            >
              Ending Soon
            </li>
            <li
              onClick={() => setSearchParam({ type: "all" })}
              className={cn(`text-custom-grey px-8 py-1 rounded-sm`, {
                "text-custom-white bg-custom-base": type === "all",
              })}
            >
              Newly Added
            </li>
          </ul>
        </div>
      </div>

      {/* Grid/List Component */}
      {/* <motion.div
        key={isGrid ? "grid" : "list"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <AssetGrid items={data || []} isGrid={isGrid} />
      </motion.div> */}
      <AssetGrid items={data || []} isGrid={isGrid} isLoading={isLoading} />
    </div>
  );
}
