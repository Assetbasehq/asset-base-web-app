import { Button } from "@/components/ui/button";

export default function Overview() {
  return (
    <div>
      <div>
        <Button className="btn-primary py-6 rounded-full">Overview</Button>
        <Button className="btn-primary py-6 rounded-full">Add Liquidity</Button>
        <Button className="btn-primary py-6 rounded-full">Reports</Button>
      </div>
    </div>
  );
}
