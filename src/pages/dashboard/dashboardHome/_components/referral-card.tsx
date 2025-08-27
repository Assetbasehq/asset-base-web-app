import gift from "@/assets/images/gift.svg";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import referralSpeaker from "@/assets/images/referral-speaker.png";

export default function ReferralCard() {
  return (
    <Link to="/dashboard/profile/referrals">
      <Card className="bg-custom-blue-shade p-0 rounded-3xl min-w-[400px] lg:min-w-full md:w-full border-none">
        <CardContent className="p-0">
          <div className="flex lg:flex-col gap-2 text-start p-6">
            <img src={gift} className="w-30 lg:hidden" alt="" />
            <p className="text-start">
              Invite 5x friends and get gains on multiple things in the future
              with our referral programme.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={referralSpeaker}
              className="w-60 hidden lg:block"
              alt=""
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
