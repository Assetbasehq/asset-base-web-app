import React from "react";
import { useLocation } from "react-router";
import WalletBreadCrumb from "../../_components/wallet-bread-crumb";
import AnimatedWrapper from "@/components/animations/animated-wrapper";

interface WrapperProps {
  goBack?: () => void;
  children: React.ReactNode;
}

export default function DepositWrapper({ goBack, children }: WrapperProps) {
  const location = useLocation();

  return (
    <div>
      <WalletBreadCrumb goBack={goBack} />

      <AnimatedWrapper animationKey={location.pathname}>
        <div className="flex flex-col gap-8 text-start w-full max-w-md mx-auto">
          {children}
        </div>
      </AnimatedWrapper>
    </div>
  );
}
