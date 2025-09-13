import DataTable from "@/components/custom/data-table";
import manWithSpeaker from "@/assets/images/man-with-speaker.svg";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import env from "@/config";
import noReferralImage from "@/assets/images/no-referral-image.png";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/api/user.api";

type IReferral = {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
};

const columns = [
  {
    header: "#",
    render: (row: IReferral, rowIndex?: number) => {
      return (
        <div className="flex items-center gap-2">
          <span>{typeof rowIndex === "number" ? rowIndex + 1 : "-"}</span>
        </div>
      );
    },
  },
  {
    header: "First Name",
    render: (row: IReferral) => (
      <div className="flex items-center gap-2">
        {/* <img
          src={row.user.image}
          alt={row.user.name}
          className="w-10 h-10 rounded-full border border-gray-200"
        /> */}
        <div className="flex flex-col">
          <span className="font-semibold">{row.first_name}</span>
          {/* <small>{row.user.email}</small> */}
        </div>
      </div>
    ),
  },
  {
    header: "Last Name",
    render: (row: IReferral) => (
      <div className="flex items-center gap-2">
        {/* <img
          src={row.user.image}
          alt={row.user.name}
          className="w-10 h-10 rounded-full border border-gray-200"
        /> */}
        <div className="flex flex-col">
          <span className="font-semibold">{row.last_name}</span>
          {/* <small>{row.user.email}</small> */}
        </div>
      </div>
    ),
  },
  // {
  //   header: "Points",
  //   render: (row: IReferral) => <span className="">{row.points}</span>,
  // },
  // {
  //   header: "Joined",
  //   render: (row: IReferral) => <span className="">{row.joined}</span>,
  // },
];

export default function ProfileReferrals() {
  const [copied, setCopied] = useState(false);
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["referrals"],
    queryFn: () => userService.getUserReferrals(),
  });

  console.log({ data });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${user?.referral_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <div className="flex flex-col text-start p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">Referrals</h2>
        <p className="text-muted-foreground">
          Share your referral link to earn rewards. Earn 5 points when friend
          purchases an assets
        </p>
      </div>

      <div className=" bg-custom-light-bg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6 bg-custom-card-foreground rounded-2xl px-4">
        <div className="flex flex-col gap-2 md:w-1/2 py-6">
          <p className="text-muted-foreground">Here's your referral code</p>
          <div className="flex items-center gap-4 w-full">
            <p className="uppercase text-2xl font-semibold">
              {user?.referral_code}
            </p>
            <span className="bg-custom-black text-white border border-muted-foreground rounded-full p-2 cursor-pointer">
              {copied ? (
                <>
                  <RiCheckLine
                    onClick={handleCopy}
                    className="w-4 h-4 cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <RiFileCopyLine className="w-4 h-4" onClick={handleCopy} />
                </>
              )}
            </span>
          </div>
          <p className="text-custom-orange">
            {`${env.CLIENT_BASE_DOMAIN}`}/register?ref=
            <span className="uppercase">{user?.referral_code}</span>{" "}
          </p>
        </div>
        <div className="hidden md:flex justify-end items-end ">
          <img src={manWithSpeaker} alt="" className="h-full" />
        </div>
      </div>

      <div>
        <h2 className="text-sm md:text-xl font-semibold">Your Referrals</h2>
        <ReferralsTable data={data || []} isLoading={isLoading} />
      </div>
    </div>
  );
}

function ReferralsTable({
  data,
  isLoading,
}: {
  data: IReferral[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <DataTable columns={columns} data={data} isLoading />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col gap-8 my-16 items-center justify-center h-full">
        <img src={noReferralImage} alt="No referrals" />
        <div className="text-center">
          <h2 className="text-lg md:text-xl text-custom-white">
            You have no referrals
          </h2>
          <p className="text-sm text-muted-foreground">
            Share your referral link to earn rewards.
          </p>
        </div>
      </div>
    );
  }

  return <DataTable columns={columns} data={data || []} isLoading={false} />;
}
