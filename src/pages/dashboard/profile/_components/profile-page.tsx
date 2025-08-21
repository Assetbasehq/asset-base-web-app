import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import assestBaseLogo from "@/assets/images/asset-base-logo.svg";
import gridLine from "@/assets/images/gradient-lines.svg";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const { user } = useAuthStore();

  const personalInformationForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: "",
    },
  });

  const nextOfKinInformation = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      relationship: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log({ data });
  };

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

            <div className="relative flex items-center gap-2 border p-2 rounded-sm w-fit border-primary text-primary mt-6 cursor-pointer">
              <ImagePlus className=" cursor-pointer" />
              <p>Change Photo</p>
              <input
                title="Please select a file"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <img
            src="https://github.com/shadcn.png"
            alt="profile image"
            className="w-30 h-30 rounded-full"
          />
        </div>

        <Form {...personalInformationForm}>
          <form
            onSubmit={personalInformationForm.handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-4"
          >
            <div className="flex flex-col items-start lg:w-2/5">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <p className="text-muted-foreground">
                Update your personal details here
              </p>
              <Button className="mt-4 text-muted-foreground bg-custom-input-mute cursor-pointer">
                Save Chanages
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-3/5">
              <FormField
                control={personalInformationForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input className="py-6" placeholder="John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={personalInformationForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input className="py-6" placeholder="Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={personalInformationForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="+2345678901"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={personalInformationForm.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                      <Input className="py-6" placeholder="" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <Form {...nextOfKinInformation}>
          <form
            onSubmit={nextOfKinInformation.handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-4"
          >
            <div className="flex flex-col items-start lg:w-2/5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                Next Of Kin Information{" "}
                <small className="text-custom-orange bg-custom-orange/10 px-3 py-1 rounded-full">
                  Optional
                </small>
              </h2>
              <p className="text-muted-foreground">
                Update your personal details here
              </p>
              <Button className="mt-4 text-muted-foreground bg-custom-input-mute cursor-pointer">
                Save Chanages
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-3/5">
              <FormField
                control={nextOfKinInformation.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input className="py-6" placeholder="John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={nextOfKinInformation.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input className="py-6" placeholder="Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={nextOfKinInformation.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="+2345678901"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={nextOfKinInformation.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input className="py-6" placeholder="John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
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
