import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";
import { convertToRelativeTime } from "@/lib/utils";
import { Link } from "react-router";

interface NotificationsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notifications?: [];
  isLoading?: boolean;
}

export default function Notifications({
  isOpen,
  onOpenChange,
  notifications = [],
  isLoading = false,
}: NotificationsProps) {
  console.log({ notifications });

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-md overflow-y-scroll z-100 p-0"
      >
        <SheetHeader className="flex items-start justify-between gap-4 px-4 pt-6">
          <div>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>Recent activity and updates.</SheetDescription>
          </div>
        </SheetHeader>
        <div>
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-8 w-full bg-gray-200" />{" "}
                  {/* main line */}
                  {/* <Skeleton className="h-3 w-36" /> sub line */}
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-gray-500">No new notifications</p>
            </div>
          ) : null}

          {!isLoading && notifications.length > 0 ? (
            <div className="flex flex-col gap-4 mt-4">
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
                      {index === 0 && <Separator className="my-2" />}
                      <div key={index} className="flex gap-2 px-4 py-2">
                        <img
                          src={notification?.asset?.image_urls[0]}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold text-custom-white">
                            {notification?.asset?.asset_name} just listed on
                            Assetbase
                          </p>
                          <p className="text-xs text-custom-grey">
                            {convertToRelativeTime(
                              notification?.asset.created_at
                            )}
                          </p>
                        </div>

                        <Link
                          className="ml-auto"
                          to={`/dashboard/assets/${notification?.asset?.id}`}
                          onClick={() => onOpenChange(false)}
                        >
                          <Button className="py-4 cursor-pointer">
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
          ) : null}
        </div>

        <Separator className="my-2" />
        <div className="px-4 mb-6">
          <div className="flex">
            <Button variant={"ghost"} className=" text-custom-orange">
              <CheckCircle />
              Mark all as read
            </Button>
            <Button disabled variant={"ghost"} className=" text-custom-orange">
              End of Notifications
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
