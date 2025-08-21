import { ChevronRight, Mail, User } from "lucide-react";

export default function ProfileSecurity() {
  return (
    <div className="flex flex-col text-start p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">Security</h2>
        <p>Manage your account security</p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <Mail />
            <div className="flex gap-4">
              <p className="font-semibold">Password Reset</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </div>

        <div className="border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <User />
            <div className="flex gap-4">
              <p className="font-semibold">Change PIN</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
