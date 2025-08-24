import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

interface ButtonLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
}

export default function ButtonLoader({
  className,
  isLoading = false,
  loadingText = "Please wait...",
  children,
  ...props
}: ButtonLoaderProps) {
  return (
    <Button
      className={cn(isLoading && "cursor-not-allowed", className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
