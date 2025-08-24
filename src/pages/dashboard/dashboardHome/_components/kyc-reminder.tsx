import { AlertCircle, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { useUserVerificationStatus } from "@/hooks/useVerification";
import { Skeleton } from "@/components/ui/skeleton";

export default function KYCReminder() {
  const { data, isLoading, isError } = useUserVerificationStatus();

  // total possible steps
  const totalSteps = 2;

  // calculate completed steps
  const completedSteps =
    (data?.email_status === "verified" ? 1 : 0) +
    (data?.id_status === "verified" ? 1 : 0);

  // progress percentage
  const progress = (completedSteps / totalSteps) * 100;

  if (isLoading) return <KYCReminderSkeleton />;
  if (isError) return <KYCReminderError />;

  return (
    <Link to="/dashboard/profile/kyc">
      <Card className="bg-custom-orange-10 text-white rounded-3xl min-w-[400px] lg:min-w-full md:w-full">
        <CardContent>
          <div className="flex items-center justify-between gap-4 text-start">
            <div className="flex items-center gap-4">
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white text-white font-bold"
                style={{
                  background: `conic-gradient(#f97316 ${progress}%, #1f2937 ${progress}%)`,
                }}
              >
                <span className="absolute inset-1 bg-white text-muted-foreground rounded-full flex items-center justify-center text-sm">
                  {completedSteps}/{totalSteps}
                </span>
              </div>

              <div>
                <h2 className="text-custom-black-text">Complete KYC</h2>
                <p className="text-muted-foreground">
                  Finish setting up your account
                </p>
              </div>
            </div>
            <Play />
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
