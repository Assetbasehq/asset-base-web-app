import PersonalDetails from "./steps/personal-details";
import VerifyIdentity from "./steps/verify-identity";

interface MultiStepFormProps {
  totalSteps: number;
  currentStep: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

export default function MultiStepForm(props: MultiStepFormProps) {
  const { currentStep } = props;
  if (currentStep === 0) {
    return <PersonalDetails {...props} />;
  }
  if (currentStep === 1) {
    return <PersonalDetails {...props} />;
  }
  if (currentStep === 2) {
    return <VerifyIdentity {...props} />;
  }

  return <div className="w-full">Ooooops! Something went wrong</div>;
}
