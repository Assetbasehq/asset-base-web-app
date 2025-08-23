import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface OnboardingData {
  step1?: { email_address: string; password: string };
  step2?: { account_type: "individual" | "corporate" };
  step3?: {
    first_name: string;
    last_name: string;
    gender: "male" | "female";
    phone_number: string;
    date_of_birth: string;
  };
}

interface OnboardingState {
  onboardingData: OnboardingData;
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      onboardingData: {},
      setOnboardingData: (data) => {
        console.log({ ...data, ...get().onboardingData });

        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        }));
      },
      resetOnboarding: () => set({ onboardingData: {} }),
      getCurrentOnboardingStep: () => {
        const { onboardingData } = get();

        if (!onboardingData.step1?.email_address || !onboardingData.step1?.password) {
          return 1;
        }
        if (!onboardingData.step2?.account_type) {
          return 2;
        }
        if (
          !onboardingData.step3?.first_name ||
          !onboardingData.step3?.last_name ||
          !onboardingData.step3?.gender ||
          !onboardingData.step3?.phone_number ||
          !onboardingData.step3?.date_of_birth
        ) {
          return 3;
        }
        return 4; // beyond last step = complete
      },
    }),
    {
      name: "onboarding-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
