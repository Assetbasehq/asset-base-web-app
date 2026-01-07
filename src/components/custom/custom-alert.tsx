import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  CircleCheckBig,
  Info,
  XCircle,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

export type AlertVariant =
  | "error"
  | "destructive"
  | "default"
  | "success"
  | "info"
  | "warning";

// export interface AlertMessage {
//   message: string; // Optional heading
//   description: string; // Main alert message
//   type: AlertVariant; // Determines styling
// }

interface CustomAlertProps {
  variant?: AlertVariant;
  message: string | React.ReactNode;
  description?: string;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  // destructive: "bg-rose-50 border-rose-300 text-rose-700",
  error: "bg-custom-orange-10 border-custom-orange-10 text-custom-grey",
  destructive: "bg-custom-orange-10 border-custom-orange-10 text-custom-grey",
  default: "bg-blue-50 border-blue-300 text-blue-700",
  success: "bg-green-50 border-green-300 text-green-700",
  info: "bg-slate-50 border-slate-300 text-slate-700",
  warning: "bg-custom-orange-10 border-custom-orange-10 text-custom-grey",
};

const iconStyles: Record<AlertVariant, string> = {
  // destructive: "bg-rose-50 border-rose-300 text-rose-700",
  error: "bg-custom-card text-custom-orange",
  destructive: "bg-custom-card text-custom-orange",
  default: "bg-blue-50 border-blue-300 text-blue-700",
  success: "bg-green-50 border-green-300 text-green-700",
  info: "bg-slate-50 border-slate-300 text-slate-700",
  warning: "bg-custom-card text-custom-orange",
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  error: AlertCircle,
  destructive: AlertTriangle,
  default: Info,
  success: CircleCheckBig,
  info: XCircle,
  warning: AlertTriangle,
};

export function CustomAlert({
  variant = "default",
  message,
  description,
  className,
}: CustomAlertProps) {
  const Icon = variantIcons[variant];

  return (
    <Alert
      className={cn(
        "rounded flex items-start w-full py-2 gap-2 max-w-full overflow-hidden",
        className,
        variantStyles[variant]
      )}
    >
      <div
        className={cn(
          "p-1 rounded-full flex items-center justify-center shrink-0",
          iconStyles[variant]
        )}
      >
        <Icon className="!h-3 !w-3" />
      </div>

      <div className="flex flex-col min-w-0 w-full">
        <AlertTitle className="text-xs font-medium tracking-wide whitespace-normal break-all wrap-anywhere max-w-full">
          {message}
        </AlertTitle>

        {description && (
          <AlertDescription className="text-xs opacity-9 whitespace-normal break-all wrap-anywhere max-w-full">
            {description}
          </AlertDescription>
        )}
      </div>
    </Alert>
  );
}
