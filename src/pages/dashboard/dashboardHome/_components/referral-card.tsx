import gift from "@/assets/images/gift.svg";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import referralSpeaker from "@/assets/images/referral-speaker.png";

export default function ReferralCard() {
  return (
    <Link to="/dashboard/account/referrals">
      <Card className="p-0 bg-custom-blue-shade rounded-3xl min-w-[350px] max-w-[350px] lg:min-w-full border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex lg:flex-col gap-2 text-start p-2 px-4 md:p-4">
            <img src={gift} className="w-12 lg:hidden" alt="" />
            <p className="text-start text-sm">
              Invite 5x friends and get gains on multiple things in the future
              with our referral programme.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={referralSpeaker}
              className=" w-fit h-20 hidden lg:block"
              alt=""
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
