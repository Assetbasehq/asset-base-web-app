import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DeleteAccountMain({ onContinue, user }: any) {
  return (
    <div className="mb-4">
      <h2 className="text-lg md:text-2xl font-semibold">Delete Account</h2>
      <p className="text-muted-foreground">Delete your account</p>

      <div className="flex flex-col gap-2 justify-center items-center mt-8">
        <img
          src={user?.profile_photo_url || "https://github.com/shadcn.png"}
          alt="profile image"
          className="w-30 h-30 rounded-full"
        />

        <div className="flex flex-col justify-center items-center">
          <p className="capitalize font-medium">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="font-medium">{user?.email_address}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 py-4">
          <div>
            <h2 className="text-lg font-medium">
              This will delete your account
            </h2>
            <p className="text-sm text-muted-foreground">
              You're about to start the process of deactivating your Assetbase
              account. Your account, display name, email address, and profile
              photo will no longer be available on the Assetbase App.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">We're sorry to see you go</h2>
            <p className="text-sm text-muted-foreground">
              Please help us understand your decision and ensure a smooth
              account closure process.
            </p>
          </div>
        </div>

        <Button
          className="btn-primary rounded-full py-5 w-full mt-4"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
