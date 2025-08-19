import type { UserOnboardingInfo } from "./user.interface";

export interface OnboardingProps {
  userInfo: Partial<UserOnboardingInfo>;
  totalSteps: number;
  currentStep: number;
  goTo: (index: number) => void;
  next: (data: Partial<UserOnboardingInfo>) => void;
  prev: () => void;
}
