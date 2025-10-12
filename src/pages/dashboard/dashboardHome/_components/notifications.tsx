import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetNotifications } from "@/hooks/use-notifications";
import { convertToRelativeTime } from "@/lib/utils";
import { Link } from "react-router";

export default function Notifications() {
  const { data, isLoading } = useGetNotifications({ limit: 5, offset: "0" });

  return (
    <Card className="flex-col gap-4 text-start p-4 rounded-3xl hidden lg:flex w-full border-none shadow-none bg-custom-card">
      <div>
        <p className="text-lg font-semibold">Notifications</p>
        <p className="text-sm text-custom-grey">Catch up on notifications</p>
      </div>
      <NotificationsList isLoading={isLoading} notifications={data || []} />
    </Card>
  );
}

function NotificationsList({
  notifications,
  isLoading,
}: {
  notifications: any[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <NotificationsSkeleton />;
  }

  if (notifications.length === 0) {
    return <p>No notifications</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {notifications
        .slice()
        .sort(
          (a: any, b: any) =>
            new Date(b.asset.created_at).getTime() -
            new Date(a.asset.created_at).getTime()
        )
        .map((notification: any, index: number) => {
          return (
            <div>
              {/* {index === 0 && <Separator className="my-2" />} */}
              <div key={index} className="flex items-center gap-2 w-full">
                <img
                  src={notification?.asset?.image_urls[0]}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm text-custom-white">
                    {notification?.asset?.asset_name} just listed on Assetbase
                  </p>
                  <p className="text-xs text-custom-grey">
                    {convertToRelativeTime(notification?.asset.created_at)}
                  </p>
                </div>

                <Link
                  to={`/dashboard/assets/${notification?.asset?.id}`}
                  className="text-xs text-custom-whit ml-auto"
                >
                  <Button variant={"link"} className="text-xs cursor-pointer">
                    View Asset
                  </Button>
                </Link>
              </div>
              {index !== notifications.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          );
        })}
    </div>
  );
}

function NotificationsSkeleton() {
  return (
    <div className="flex flex-col gap-4 text-start rounded-3xl">
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1 ">
            <Skeleton className="h-8 w-full bg-gray-200" /> {/* main line */}
            {/* <Skeleton className="h-3 w-36" /> sub line */}
          </div>
        ))}
      </div>
    </div>
  );
}
