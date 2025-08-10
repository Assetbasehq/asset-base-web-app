import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownToLine, ArrowRightLeft, Box, Plus } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

export default function AccountSummary() {
  // if (true) {
  //   return <AccountSummarySkeleton />;
  // }

  return (
    <div className="text-start flex flex-col gap-4">
      <div className="flex items-center justify-between bg-card rounded-lg px-6 py-8">
        <div className="flex flex-col gap-10 w-full">
          <Select defaultValue="usd">
            <SelectTrigger className="w-fit text-white">
              <SelectValue placeholder="USD" className="text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="cad">CAD</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-full flex flex-col items-start gap-6 md:flex-row md:items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold">$30,000.00</h2>
              <p className="text-green-400">+1,966 (2.4%)</p>
            </div>
            <div className="flex justify-between md:justify-end w-full gap-4">
              <div className="flex flex-col gap-1 text-primary items-center">
                <Button className="rounded-full cursor-pointer">
                  <Plus className=" cursor-pointer" />
                </Button>
                <span className="font-semibold text-xs">Deposit</span>
              </div>
              <div className="flex flex-col gap-1 text-primary items-center cursor-pointer">
                <Button className="rounded-full bg-primary/5 border border-primary hover:text-white hover:bg-primary/5 cursor-pointer">
                  <ArrowDownToLine className="text-primary hover:text-white " />
                </Button>
                <span className="font-semibold text-xs ">Withdraw</span>
              </div>
              <div className="flex flex-col gap-1 items-center cursor-pointer">
                <Button className="rounded-full bg-custom-gray cursor-pointer hover:bg-custom-gray">
                  <ArrowRightLeft />
                </Button>
                <span className="font-semibold text-xs">Convert</span>
              </div>
              <div className="flex flex-col gap-1 items-center cursor-pointer">
                <Button className="rounded-full cursor-pointer bg-custom-gray hover:bg-custom-gray">
                  <Box />
                </Button>
                <span className="font-semibold text-xs">Add Liquidity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function AccountSummarySkeleton() {
//   return (
//     <div className="text-start flex flex-col gap-4">
//       {/* Greeting */}
//       <Skeleton className="h-8 w-48" />

//       {/* Main Card */}
//       <div className="flex items-center justify-between bg-custom-gray-muted rounded-lg px-6 py-8">
//         <div className="flex flex-col gap-6 w-full">
//           {/* Currency Select */}
//           <Skeleton className="h-10 w-20 rounded-md" />

//           {/* Balance + Actions */}
//           <div className="w-full flex items-center justify-between">
//             {/* Balance Info */}
//             <div>
//               <Skeleton className="h-8 w-32" />
//               <Skeleton className="h-4 w-20 mt-2" />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="flex flex-col gap-2 items-center">
//                   <Skeleton className="h-12 w-12 rounded-full" />
//                   <Skeleton className="h-5 w-16" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
