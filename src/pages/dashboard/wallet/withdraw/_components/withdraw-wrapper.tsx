import React from "react";
import { useLocation } from "react-router";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import WithdrawBreadCrumb from "./withdraw-bread-crumb";

interface WrapperProps {
  goBack?: () => void;
  children: React.ReactNode;
}

export default function WithdrawWrapper({ goBack, children }: WrapperProps) {
  const location = useLocation();

  return (
    <div>
      <WithdrawBreadCrumb goBack={goBack} />

      <AnimatedWrapper animationKey={location.pathname}>
        <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
          {children}
        </div>
      </AnimatedWrapper>
    </div>
  );
}
