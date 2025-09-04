import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  variant?: "card" | "card-detailed" | "compact";
}
export default function AssetCardSkeleton({ variant = "card" }: Props) {
  if (variant === "compact") {
    return (
      <div className=" bg-custom-light-bg text-custom-white flex items-center justify-between rounded-xl p-4 shadow-md gap-4 min-w-[300px]">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-28 rounded" />
        </div>
      </div>
    );
  }

  if (variant === "card-detailed") {
    return (
      <div className="bg-custom-light-bg text-custom-white flex flex-col gap-4 items-start rounded-2xl p-2 sm:min-w-96 shadow-lg">
        <div className="relative overflow-hidden flex flex-col gap-6 items-start text-start w-full p-4 rounded-lg bg-[#93939417]">
          <img
            src={assetBaseLogo}
            alt=""
            className="absolute w-35 top-0 -right-5 opacity-10"
          />
          <div className="flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-3 w-28 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start w-full pb-1">
          <Skeleton className="h-2 w-full rounded" />
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className="bg-custom-light-bg text-custom-white flex flex-col gap-4 items-start rounded-2xl p-2 sm:min-w-96 shadow-lg">
      <div className="relative overflow-hidden flex flex-col gap-6 items-start text-start w-full p-4 rounded-lg bg-[#93939417]">
        <img
          src={assetBaseLogo}
          alt=""
          className="absolute w-35 top-0 -right-5 opacity-10"
        />
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start w-full pb-1">
        <Skeleton className="h-2 w-full rounded" />
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
