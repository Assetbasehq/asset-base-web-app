import { useState } from "react";

export default function KYCReminder() {
  const userProgress = 4;
  const [progress, _] = useState((userProgress / 6) * 100);

  return (
    <div className="bg-card rounded-3xl p-4 lg:p-8 min-w-[400px] lg:min-w-full md:w-full">
      <div className="flex items-center gap-4 text-start">
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
          <p className="font-semibold">Complete KYC</p>
          <p className="text-muted-foreground">
            Finish setting up your account
          </p>
        </div>
      </div>
    </div>
  );
}
