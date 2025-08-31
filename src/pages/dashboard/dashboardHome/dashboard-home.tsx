import { useAuthStore } from "@/store/auth-store";
import AccountSummary from "./_components/account-summary";
import KYCReminder from "./_components/kyc-reminder";
import LaunchPad from "./_components/launch-pad";
import Notifications from "./_components/notifications";
import ReferralCard from "./_components/referral-card";
import TrendingSecurities from "./_components/trending-securities";

export default function DashboardHome() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-4 text-custom-white-text">
      <p className="text-3xl font-semibold text-start font-geis">
        Good Morning,
        <span className="capitalize"> {user?.first_name || "..."}</span>
      </p>
      <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
        {/* Left Column */}
        <div className="w-full lg:w-3/5 flex flex-col space-y-4 ">
          <LaunchPad />
          <TrendingSecurities />
          <AccountSummary />
        </div>

        {/* Right Column */}
        <div className="flex items-center lg:flex-col gap-4 overflow-x-scroll no-scrollbar lg:overflow-visible lg:w-2/5">
          <div className="w-full flex items-center gap-4 lg:flex-col lg:items-stretch">
            <KYCReminder />
            <ReferralCard />
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
}
