
interface CircularProgressProps {
  value: number; // progress percentage
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  color?: string;
  backgroundColor?: string;
  completedSteps?: number;
  totalSteps?: number;
}

export default function CircularProgress({
  value = 0,
  size = 50,
  strokeWidth = 8,
  className = "",
  showValue = true,
  color = "stroke-blue-500",
  backgroundColor = "stroke-gray-200",
  completedSteps = 0,
  totalSteps = 0,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center p-1.5 bg-white rounded-full ${className}`}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`fill-white ${backgroundColor}`}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`fill-none ${color} transition-all duration-500 ease-out`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Center text */}
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-custom-grey">
            {completedSteps}/{totalSteps}
          </span>
        </div>
      )}
    </div>
  );
}
