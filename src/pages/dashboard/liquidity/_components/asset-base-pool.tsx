import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AssetBasePool() {
  return (
    <div className="">
      <form action="" className="w-full flex flex-col gap-4">
        <div className="space-y-1">
          <Label className="text-muted-foreground text-sm w-full ">
            Amount
          </Label>
          <Input className="py-6" placeholder="Amount to add" />
        </div>
        {/* <div className="space-y-1">
          <Label className="text-muted-foreground text-sm">
            Select Company
          </Label>
          <Input className="w-full py-6" />
        </div> */}

        <div className="flex items-center justify-between bg-custom-light-bg p-4 rounded-lg">
          <div>
            <img src="" alt="" />
            <p>Expected returns</p>
          </div>
          <p>12.5% APY</p>
        </div>
        <Button className="btn-primary py-6 rounded-full">ADD LIQUIDITY</Button>
      </form>
    </div>
  );
}
