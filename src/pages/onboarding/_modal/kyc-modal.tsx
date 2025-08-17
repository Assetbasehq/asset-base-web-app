import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import gradientLines from "@/assets/images/gradient-lines.svg";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import MultiStepForm from "../_components/multi-step-form";

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const totalSteps = 3;
const stepsInfo = [
  {
    id: "0",
    title: "Account Type",
    description: "Provide your KYC details and let us help you get started.",
  },
  {
    id: "1",
    title: "Personal Details",
    description: "Provide your KYC details and let us help you get started.",
  },
  {
    id: "2",
    title: "Verify Identity",
    description: "Provide your KYC details and let us help you get started.",
  },
];

export default function KYCModal({ isOpen, onClose }: KYCModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => setCurrentStep((s) => s + 1);
  const prev = () => setCurrentStep((s) => s - 1);
  const goTo = (index: number) => {
    if (index >= 0 && index < totalSteps) setCurrentStep(index);
  };

  // Pass step helpers to the current child
  const stepProps = {
    currentStep: currentStep,
    totalSteps: totalSteps,
    next,
    prev,
    goTo,
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-4xl min-h-[80vh] max-h-[90vh] flex gap-0 rounded-3xl p-0 border-none">
        <KYCSidebar currentStep={currentStep} />
        <div className="flex flex-col w-2/3 min-h-full px-10 pt-14 relative z-30 bg-white dark:bg-custom-card rounded-r-2xl">
          <DialogHeader>
            <DialogTitle>{stepsInfo[currentStep].title}</DialogTitle>
            <DialogDescription>
              {stepsInfo[currentStep].description}
            </DialogDescription>
          </DialogHeader>
          <MultiStepForm {...stepProps} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function KYCSidebar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-1/3 min-h-full bg-custom-gray text-white overflow-hidden rounded-l-3xl border-none">
      <img
        src={gradientLines}
        alt=""
        className="absolute h-full hidden lg:block z-0"
      />
      <div className=" flex flex-col gap-4 px-8 pt-42 pb-18 relative z-20 min-h-full">
        <h2 className="text-3xl max-w-sm mx-auto flex-1 font-semibold">
          Complete your account setup
        </h2>

        <div className="flex flex-col gap-4">
          {stepsInfo.map((step, index) => {
            const isLastStep = index === stepsInfo.length - 1;
            console.log({ index, currentStep });

            return (
              <div key={step.id} className="relative">
                <div
                  className={cn(
                    "flex items-start space-x-2 py-2",
                    currentStep >= index ? "font-bold" : "text-gray-400"
                  )}
                >
                  {index <= currentStep ? (
                    <CheckIcon className="w-8 bg-primary text-white p-1 px-1 mt-1 rounded-full" />
                  ) : (
                    <div className="w-8 bg-white text-gray-700 p-1 px-2.5 mt-1 rounded-full text-xs">
                      {index + 1}
                    </div>
                  )}
                  <div>
                    <p className="text-sm">{step.title}</p>
                    <small className="text-xs">{step.description}</small>
                  </div>
                </div>
                {!isLastStep && (
                  <Separator
                    orientation="vertical"
                    className={cn(
                      "absolute left-2.5 top-9 h-full",
                      index < currentStep ? "bg-white" : "bg-gray-500"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
