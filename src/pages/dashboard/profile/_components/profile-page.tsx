import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ImagePlus, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import assestBaseLogo from "@/assets/images/asset-base-logo.svg";
import gridLine from "@/assets/images/gradient-lines.svg";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/api/user.api";
import { useState } from "react";
import { CustomAlert } from "@/components/custom/custom-alert";
import PersonalInformation from "./personal-information";
import NextOfKin from "./next-of-kin";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const uploadProfilePhotoMutation = useMutation({
    mutationFn: userService.uploadProfilePhoto,
    onSuccess: (data) => {
      console.log({ data });
      setError(null);
      setTimeout(() => setSuccess(data.message), 3000);
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
      setSuccess(null);
    },
  });

  const btnText = uploadProfilePhotoMutation.isPending ? (
    <span className="flex items-center">
      <Loader className="mr-2 h-4 w-4 animate-spin" />
      Please wait...
    </span>
  ) : (
    "Continue"
  );

  return (
    <div className="text-start">
      <div className="relative bg-custom-light-bg px-6 py-8 text-start overflow-hidden">
        <h2 className="text-lg md:text-2xl font-semibold">
          Hi, <span className="capitalize">{user?.first_name || "..."}</span>
        </h2>
        <p className="text-muted-foreground">
          Manage your account details below
        </p>
        <img
          src={assestBaseLogo}
          alt="asset base logo"
          className="absolute -top-15 -right-35 opacity-20 h-full hidden lg:block"
        />
        <img
          src={gridLine}
          alt="gridLines"
          className="absolute -top-20 right-0 opacity-40 w-150 hidden lg:block"
        />

        <div className="flex gap-4 mt-6 relative z-30">
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
        </div>
      </div>
      <div className="bg-custom-card rounded-b-lg px-6 py-8 flex flex-col gap-16">
        <div className="flex flex-col lg:flex-row gap-4 text-start">
          <div className="text-start flex flex-col lg:w-2/5">
            <h2 className="font-semibold">Profile photo</h2>
            <p className="text-muted-foreground">
              This image will be displayed on your profile
            </p>

            {error && (
              <CustomAlert
                variant="destructive"
                message={error}
                className="w-fit"
              />
            )}

            {success && (
              <CustomAlert
                variant="success"
                message={success}
                className="w-fit"
              />
            )}

            <Button
              disabled={uploadProfilePhotoMutation.isPending}
              variant={"outline"}
              className="relative flex items-center gap-2 border p-2 rounded-sm w-fit border-primary text-primary mt-6 cursor-pointer"
            >
              <ImagePlus className="cursor-pointer" />
              <p>Change Photo</p>
              <Input
                onChange={(e) =>
                  uploadProfilePhotoMutation.mutate(e.target.files![0])
                }
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
            </Button>
          </div>

          <img
            src={user?.profile_photo_url || "https://github.com/shadcn.png"}
            alt="profile image"
            className="w-30 h-30 rounded-full"
          />
        </div>

        <PersonalInformation />
        <NextOfKin />
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-2 p-4 bg-custom-base rounded-3xl">
      <Skeleton className="h-11 w-11 rounded-none" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-56 rounded-none" />
        <Skeleton className="h-3 w-46 rounded-none" />
        <Skeleton className="h-3 w-22 rounded-none" />
      </div>
    </div>
  );
}
