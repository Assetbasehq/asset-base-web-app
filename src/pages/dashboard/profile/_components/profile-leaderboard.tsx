import DataTable from "@/components/custom/data-table";
import { Skeleton } from "@/components/ui/skeleton";

type ILeaderboard = {
  id: number;
  user: {
    name: string;
    image: string;
    email: string;
  };
  points: number;
  joined: string;
};

const columns = [
  {
    header: "#",
    render: (row: ILeaderboard) => (
      <div className="flex items-center gap-2">
        <span>{row.id}</span>
      </div>
    ),
  },
  {
    header: "User",
    render: (row: ILeaderboard) => (
      <div className="flex items-center gap-2">
        <img
          src={row.user.image}
          alt={row.user.name}
          className="w-10 h-10 rounded-full border border-gray-200"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{row.user.name}</span>
          <small>{row.user.email}</small>
        </div>
      </div>
    ),
  },
  {
    header: "Points",
    render: (row: ILeaderboard) => <span className="">{row.points}</span>,
  },
  {
    header: "Joined",
    render: (row: ILeaderboard) => <span className="">{row.joined}</span>,
  },
];

const leaderboardData = [
  {
    id: 1,
    user: {
      name: "Alice Johnson",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      email: "alice.johnson@example.com",
    },
    points: 1200,
    joined: "2024-03-15",
  },
  {
    id: 2,
    user: {
      name: "Michael Smith",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      email: "michael.smith@example.com",
    },
    points: 950,
    joined: "2024-05-10",
  },
  {
    id: 3,
    user: {
      name: "Sophia Williams",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "sophia.williams@example.com",
    },
    points: 875,
    joined: "2024-06-22",
  },
  {
    id: 4,
    user: {
      name: "David Brown",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "david.brown@example.com",
    },
    points: 730,
    joined: "2024-07-01",
  },
  {
    id: 5,
    user: {
      name: "Emily Davis",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "emily.davis@example.com",
    },
    points: 680,
    joined: "2024-08-12",
  },
];

export default function ProfileLeaderboard() {
  return (
    <div className="flex flex-col gap-6 text-start p-8">
      <Tasks />
      <YourPerformance />
      <div>
        <h2 className="text-sm md:text-xl font-semibold">Leaderboard</h2>
        <DataTable columns={columns} data={leaderboardData} isLoading />
      </div>
    </div>
  );
}

function Tasks() {
  const isLoading = true;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-lg md:text-2xl font-semibold">Tasks</h2>
        <div className="flex flex-wrap gap-4">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg md:text-2xl font-semibold">Tasks</h2>
        <div className="flex flex-wrap gap-4">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    </div>
  );
}

function YourPerformance() {
  const isLoading = true;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-sm md:text-xl font-semibold">Your Performance</h2>
        <div className="flex flex-wrap gap-4">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h2 className="text-sm md:text-xl font-semibold">Your Performance</h2>
        <div className="flex flex-wrap gap-4">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div>
      <div className="flex items-center gap-4 bg-custom-base rounded-3xl p-4">
        <Skeleton className="h-10 w-10 rounded-none" />
        <div className="flex-1 space-y-3 pt-1 pr-8">
          <Skeleton className="h-2 w-54 rounded-none bg-white" />
          <Skeleton className="h-2 w-44 rounded-none bg-white" />
          <Skeleton className="h-2 w-32 rounded-none bg-white" />
        </div>
      </div>
    </div>
  );
}
