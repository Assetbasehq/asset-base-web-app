import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function KYCReminder() {
  const userProgress = 4;
  const progress = (userProgress / 6) * 100;

  return (
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
                1/6
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
  );
}
