import gift from "@/assets/images/gift.svg";
import { Link } from "react-router";

export default function ReferralCard() {
  return (
    <Link to="/dashboard/profile/referrals">
      <div className="flex lg:flex-col gap-2 text-start bg-custom-blue-shade text-custom-blue-text rounded-3xl p-4 lg:p-8 min-w-[400px] lg:min-w-full">
        <img src={gift} className="w-30" alt="" />
        <p>
          Invite 5x friends and get gains on multiple things in the future with
          our referral programme.
        </p>
      </div>
    </Link>
  );
}
