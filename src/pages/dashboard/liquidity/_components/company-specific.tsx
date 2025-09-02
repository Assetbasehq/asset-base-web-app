import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function CompanySpecific() {
  return (
    <div>
      <form action="">
        <div>
          <Label className="text-muted-foreground text-lg">Amount</Label>
          <Input />
        </div>
        <div>
          <Label className="text-muted-foreground text-lg">
            Select Company
          </Label>
          <Input />
        </div>

        <div>here</div>

        <Button>ADD LIQUIDITY</Button>
      </form>
    </div>
  );
}
