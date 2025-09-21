import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Deposit404() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center p-6 border-none bg-custom-light-bg">
        <CardContent className="flex flex-col items-center gap-4">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground">
            Oops! Something Went Wrong
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            It looks like your deposit process encountered an issue. <br />
            Please restart the process to continue.
          </p>

          {/* Action */}
          <Button asChild className="mt-4 btn-primary w-full">
            <Link to="/dashboard/wallet/deposit">Start Afresh</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
