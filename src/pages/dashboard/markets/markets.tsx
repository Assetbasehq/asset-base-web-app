import AllAssets from "./_components/all-assets";
import HotAssets from "./_components/hot-assets";
import HottestLaunchpad from "./_components/hottest-launchpad";
import TrendingAssets from "./_components/trending-assets";

export default function Markets() {

  return (
    <div className="text-custom-white-text">
      <h2 className="text-xl md:text-2xl text-left mb-2">Markets</h2>
      <HotAssets />
      <div className="bg-custom-card rounded-lg p-2 md:p-4 mt-4">
        <div className="flex flex-col gap-2 md:flex-row md:full">
          <TrendingAssets />
          <HottestLaunchpad />
        </div>
        <AllAssets />
      </div>
    </div>
  );
}
