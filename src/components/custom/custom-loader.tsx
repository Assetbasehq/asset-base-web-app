import { Shield } from "lucide-react";
import React from "react";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";

interface LoaderProps {
  color?: string;
  isLoading?: boolean;
}

const Loader = ({ color = "black", isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`w-8 h-8 border-4 border-t-transparent animate-spin rounded-full`}
        style={{
          borderColor: `${color} transparent ${color} transparent`,
        }}
      ></div>
    </div>
  );
};

const AuthLoader = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-custom-card-background text-white z-50">
      {/* Rolling ring around shield */}
      <div className="relative flex items-center justify-center">
        {/* animated ring */}
        <div className="absolute w-32 h-32 border-4 border-t-transparent border-b-transparent border-custom-orange rounded-full animate-spin" />
        {/* shield icon */}
        <img
          src={assetBaseLogo}
          className="w-16 animate-pulse"
          alt="asset base"
        />
      </div>

      {/* text */}
      {/* <p className="mt-6 text-lg font-medium animate-pulse text-custom-orange/90">
        Please wait
      </p> */}
    </div>
  );
};

export default AuthLoader;

const Spinner: React.FC<LoaderProps> = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div
      className={`mr-2 w-4 h-4 border-2  border-t-transparent border-b-transparent border-custom-primary animate-spin rounded-full inline-block`}
    ></div>
  );
};

export { Loader, AuthLoader, Spinner };
