// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// export interface OnboardingData {
//   step1?: { email: string; password: string };
//   step2?: { account_type: "individual" | "corporate" };
//   step3?: {
//     first_name: string;
//     last_name: string;
//     gender: "male" | "female";
//     phone_number: string;
//     date_of_birth: string;
//   };
// }

// export interface OnboardingState {
//   onboardingData: OnboardingData;
//   actions: {
//     setOnboardingData: (data: Partial<OnboardingData>) => void;
//     resetOnboarding: () => void;
//     hasOnboardingData: () => boolean;
//     isOnboardingComplete: () => boolean;
//     getCurrentOnboardingStep: () => number;
//   };
// }

// const actions = (
//   set: (
//     state:
//       | Partial<OnboardingState>
//       | ((state: OnboardingState) => Partial<OnboardingState>)
//   ) => void,
//   get: () => OnboardingState
// ): OnboardingState["actions"] => ({
//   setOnboardingData: (data: Partial<OnboardingData>) => {
//     console.log({ data });

//     set((state) => ({
//       onboardingData: { ...state.onboardingData, ...data },
//     }));
//   },
//   resetOnboarding: () => {
//     set({ onboardingData: {} });
//   },
//   hasOnboardingData: () => {
//     const { onboardingData } = get();
//     return Object.keys(onboardingData).length > 0;
//   },

//   isOnboardingComplete: () => {
//     const { onboardingData } = get();
//     return (
//       !!onboardingData.step3?.first_name &&
//       !!onboardingData.step3?.last_name &&
//       !!onboardingData.step3?.gender &&
//       !!onboardingData.step3?.phone_number &&
//       !!onboardingData.step3?.date_of_birth
//     );
//   },
//   getCurrentOnboardingStep: () => {
//     const { onboardingData } = get();

//     if (!onboardingData.step1?.email || !onboardingData.step1?.password) {
//       return 1;
//     }
//     if (!onboardingData.step2?.account_type) {
//       return 2;
//     }
//     if (
//       !onboardingData.step3?.first_name ||
//       !onboardingData.step3?.last_name ||
//       !onboardingData.step3?.gender ||
//       !onboardingData.step3?.phone_number ||
//       !onboardingData.step3?.date_of_birth
//     ) {
//       return 3;
//     }
//     return 4; // beyond last step = complete
//   },
// });

// export const useOnboardingStore = create<OnboardingState>()(
//   persist(
//     (set, get) => ({
//       onboardingData: {},
//       actions: {
//         ...actions(set, get),
//       },
//     }),
//     {
//       name: "onboarding-store",
//       storage: createJSONStorage(() => sessionStorage),
//       // partialize: (state) => ({ onboardingData: state.onboardingData }), // ✅ don't persist actions
//     }
//   )
// );

// export const useOnboardingActions = () => {
//   const store = useOnboardingStore();
//   console.log({ actions: store.actions });

//   return store.actions;
// };

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
