import { useAuthStore } from "@/store/auth-store";
import AccountSummary from "./_components/account-summary";
import KYCReminder from "./_components/kyc-reminder";
import LaunchPad from "./_components/launch-pad";
import Notifications from "./_components/notifications";
import ReferralCard from "./_components/referral-card";
import TrendingSecurities from "./_components/trending-securities";

export default function DashboardHome() {
  const { user } = useAuthStore();

  const getTimeBasedGreeting = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good Morning,";
    } else if (hours < 17) {
      return "Good Afternoon,";
    } else {
      return "Good Evening,";
    }
  };

  return (
    <div className="flex flex-col gap-2 text-custom-white-text">
      <p className="text-2xl md:text-2xl font-semibold text-start font-geist">
        {getTimeBasedGreeting()}
        <span className="capitalize"> {user?.first_name || "..."}</span>
      </p>
      <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
        {/* Left Column */}
        <div className="w-full lg:w-3/5 flex flex-col space-y-4 ">
          <LaunchPad />
          <AccountSummary />
          <TrendingSecurities />
        </div>

        {/* Right Column */}
        <div className="lg:flex items-center lg:flex-col gap-4 overflow-x-scroll no-scrollbar lg:overflow-visible lg:w-2/5">
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
