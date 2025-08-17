import AllAssets from "./_components/all-assets";
import HotAssets from "./_components/hot-assets";
import HottestLaunchpad from "./_components/hottest-launchpad";
import TrendingAssets from "./_components/trending-assets";

export default function Markets() {
  return (
    <div className="">
      <h2 className="text-3xl font-semibold text-left mb-4">Markets</h2>
      <HotAssets />
      <div className="bg-custom-card-background text-white rounded-lg px-6 py-8 mt-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <TrendingAssets />
          <HottestLaunchpad />
        </div>
        <AllAssets />
      </div>
    </div>
  );
}
