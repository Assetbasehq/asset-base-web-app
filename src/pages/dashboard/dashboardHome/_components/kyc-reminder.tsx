import { AlertCircle, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { useUserVerificationStatus } from "@/hooks/useVerification";
import { Skeleton } from "@/components/ui/skeleton";
import CircularProgress from "@/components/custom/circular-progress";

const totalSteps = 2;

export default function KYCReminder() {
  const { data, isLoading, isError } = useUserVerificationStatus();

  // total possible steps

  // calculate completed steps
  const completedSteps = isError
    ? 0
    : (data?.email_status === "verified" ? 1 : 0) +
      (data?.id_status === "verified" ? 1 : 0);

  // progress percentage
  const progress = (completedSteps / totalSteps) * 100;

  // if (isLoading) return <KYCReminderSkeleton />;
  // if (isError) return <KYCReminderError />;

  if (completedSteps === totalSteps) return null;

  return (
    <Link to="/dashboard/account/kyc">
      <Card className="p-0 bg-custom-orange-10 rounded-3xl min-w-[350px] lg:w-full md:w-full border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-4 text-start text-custom-white p-2 px-4 md:p-4">
            <div className="flex flex-row-reverse lg:flex-row justify-between lg:justify-start items-center gap-4 w-full">
              <CircularProgress
                value={progress || 0} // percentage
                size={50}
                strokeWidth={6}
                color="stroke-custom-orange"
                backgroundColor="stroke-fixed-orange-10"
                completedSteps={completedSteps || 0}
                totalSteps={totalSteps || 2}
                className="transition-all duration-500 ease-out [&>div]:transition-all [&>div]:duration-500"
              />

              <div className=" flex flex-col text-custom-white">
                <h2 className="text-lg font-light">Complete KYC</h2>
                <p className="text-custom-grey text-xs font-light">
                  Finish setting up your account
                </p>
              </div>
            </div>
            <Play className="hidden lg:block" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function KYCReminderSkeleton() {
  return (
    <Card className="bg-custom-orange-10 text-white rounded-3xl min-w-[400px] lg:min-w-full md:w-full">
      <CardContent>
        <div className="flex items-center justify-between gap-4 text-start">
          <div className="flex items-center gap-4">
            {/* Circle skeleton */}
            <Skeleton className="h-16 w-16 rounded-full" />

            {/* Text skeletons */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function KYCReminderError() {
  return (
    <Card className="bg-custom-orange-10 text-white rounded-3xl min-w-[400px] lg:min-w-full md:w-full">
      <CardContent>
        <div className="flex items-center justify-between gap-4 text-start">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-red-500">
              <AlertCircle size={28} />
            </div>
            <div>
              <h2 className="text-custom-black-text">Error loading KYC</h2>
              <p className="text-muted-foreground">
                Please refresh and try again
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
