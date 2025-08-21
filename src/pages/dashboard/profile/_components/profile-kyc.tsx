import { Badge } from "@/components/ui/badge";
import { ChevronRight, Mail, User } from "lucide-react";

export default function ProfileKYC() {
  const emailVerificationStatus = "completed";
  const IDVerificationStatus = "pending";

  return (
    <div className="flex flex-col text-start p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">KYC</h2>
        <p>The SEC requires that we verify a valid means of ID</p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <Mail />
            <div className="flex gap-4">
              <p className="font-semibold">Email Verification</p>
              <Badge className="text-green-800 bg-green-100 rounded-full capitalize px-3">
                {emailVerificationStatus}
              </Badge>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </div>

        <div className="border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <User />
            <div className="flex gap-4">
              <p className="font-semibold">ID Verification</p>
              <Badge className="text-yellow-500 bg-yellow-100 rounded-full capitalize px-3">
                {IDVerificationStatus}
              </Badge>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
