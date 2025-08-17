import AccountSummary from "./_components/account-summary";
import KYCReminder from "./_components/kyc-reminder";
import LaunchPad from "./_components/launch-pad";
import Notifications from "./_components/notifications";
import ReferralCard from "./_components/referral-card";
import TrendingSecurities from "./_components/trending-securities";

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-4 text-white">
      <p className="text-3xl font-semibold text-start">Good Morning, Timi</p>
      <div className="flex flex-col-reverse lg:flex-row gap-6 w-full">
        {/* Left Column */}
        <div className="w-full lg:w-3/5 flex flex-col space-y-6 ">
          <AccountSummary />
          <TrendingSecurities />
          <LaunchPad />
        </div>

        {/* Right Column */}
        <div className="flex items-center lg:flex-col gap-6 overflow-x-scroll no-scrollbar lg:overflow-visible lg:w-2/5">
          <KYCReminder />
          <ReferralCard />
          <Notifications />
        </div>
      </div>
    </div>
  );
}
