import { Skeleton } from "@/components/ui/skeleton";

export default function Notifications() {
  return (
    <div className="flex-col gap-4 text-start p-8 bg-card rounded-3xl hidden lg:flex w-full">
      <div>
        <p className="text-2xl font-semibold">Notifications</p>
        <p className="text-">Catch up on notifications</p>
      </div>
      <NotificationsList />
    </div>
  );
}

function NotificationsList() {
  if (true) {
    return <NotificationsSkeleton />;
  }
  return (
    <div>
      <p>Notification 1</p>
      <p>Notification 2</p>
      <p>Notification 3</p>
      <p>Notification 4</p>
      <p>Notification 5</p>
      <p>Notification 6</p>
    </div>
  );
}

function NotificationsSkeleton() {
  return (
    <div className="flex flex-col gap-4 text-start bg-card rounded-3xl">
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Skeleton className="h-8 w-full" /> {/* main line */}
            {/* <Skeleton className="h-3 w-36" /> sub line */}
          </div>
        ))}
      </div>
    </div>
  );
}
