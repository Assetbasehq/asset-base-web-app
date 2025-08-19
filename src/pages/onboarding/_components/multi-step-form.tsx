import PersonalDetails from "./personal-details";
import VerifyIdentity from "./verify-identity";
import type { OnboardingProps } from "@/interfaces/onboarding.interface";

export default function MultiStepForm(props: OnboardingProps) {
  const { currentStep } = props;
  if (currentStep === 1) {
    return <PersonalDetails {...props} />;
  }

  if (currentStep === 2) {
    return <VerifyIdentity {...props} />;
  }

  return <div className="w-full">Ooooops! Something went wrong</div>;
}
