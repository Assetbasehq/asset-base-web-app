import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  CircleCheckBig,
  Info,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export type AlertVariant =
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
  destructive: "bg-custom-orange-10 border-custom-orange-10 text-custom-grey",
  default: "bg-blue-50 border-blue-300 text-blue-700",
  success: "bg-green-50 border-green-300 text-green-700",
  info: "bg-slate-50 border-slate-300 text-slate-700",
  warning: "bg-custom-orange-10 border-custom-orange-10 text-custom-grey",
};

const iconStyles: Record<AlertVariant, string> = {
  // destructive: "bg-rose-50 border-rose-300 text-rose-700",
  destructive: "bg-custom-card text-custom-orange",
  default: "bg-blue-50 border-blue-300 text-blue-700",
  success: "bg-green-50 border-green-300 text-green-700",
  info: "bg-slate-50 border-slate-300 text-slate-700",
  warning: "bg-custom-card text-custom-orange",
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
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
        "rounded flex items-center w-full py-2 gap-1",
        className,
        variantStyles[variant]
      )}
    >
      <div
        className={cn(
          "p-1 rounded-full flex items-center justify-center",
          iconStyles[variant]
        )}
      >
        <Icon className="!h-3 !w-3" />
      </div>

      <div className="flex flex-col">
        <AlertTitle className="text-xs font-medium tracking-wide">
          {message}
        </AlertTitle>
        {description && (
          <AlertDescription
            className={cn(`text-xs opacity-90`, variantStyles[variant])}
          >
            {description}
          </AlertDescription>
        )}
      </div>
    </Alert>
  );
}
