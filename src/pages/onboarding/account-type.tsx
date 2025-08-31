import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/onboarding-store";
import { BriefcaseBusiness, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AccountType() {
  const [selectedAccountType, setSelectedAccountType] =
    useState<string>("personal");

  const { setOnboardingData } = useOnboardingStore();
  const navigate = useNavigate();

  const accountTypes = [
    {
      id: 1,
      name: "Personal Account",
      code: "personal",
      value: "individual",
      description:
        "Get started to build your asset portfolio across various asset",
      icon: (
        <UserRound
          size={50}
          className={cn(
            `px-4 rounded-full bg-custom-black/10 transition duration-300 ease-in-out`,
            {
              "bg-custom-orange/20 text-custom-orange":
                selectedAccountType === "personal",
            }
          )}
        />
      ),
    },
    {
      id: 2,
      name: "Business Account",
      code: "business",
      value: "corporate",
      description:
        "Get started to build your asset portfolio across various asset",
      icon: (
        <BriefcaseBusiness
          size={50}
          className={cn(
            `px-4 rounded-full bg-custom-black/10 transition duration-300 ease-in-out`,
            {
              "bg-custom-orange/20 text-custom-orange":
                selectedAccountType === "business",
            }
          )}
        />
      ),
    },
  ];

  const handleSelectAccountType = (value: "individual" | "corporate") => {
    setSelectedAccountType(value === "individual" ? "personal" : "business");
  };

  const handleContinue = () => {
    setOnboardingData({
      step2: {
        account_type:
          selectedAccountType === "personal" ? "individual" : "corporate",
      },
    });
    navigate("/onboarding/personal-details");
  };

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-18 font-neue bg-gradient-to-tr from-white via-white to-pink-100 dark:from-black dark:via-black dark:to-black">
      <Card className="w-full max-w-lg shadow-none text-black bg-white dark:bg-custom-card dark:text-white dark:border-custom-card">
        <CardHeader className="text-start flex flex-col gap-1">
          <CardTitle className="text-lg text-bold">
            Choose an account type
          </CardTitle>
          <CardDescription className="font-neue">
            Let us know how you want to use Assetbase
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {accountTypes.map((accountType) => (
              <div
                key={accountType.id}
                onClick={() =>
                  handleSelectAccountType(
                    accountType.value as "individual" | "corporate"
                  )
                }
                className={cn(
                  "flex items-center gap-2 border rounded-lg p-4 transition duration-300 ease-in-out cursor-pointer",
                  {
                    "border-custom-orange":
                      selectedAccountType === accountType.code,
                  }
                )}
              >
                {accountType.icon}
                <div className="text-left">
                  <p className="font-semibold">{accountType.name}</p>
                  <p className="text-muted-foreground">
                    {accountType.description}
                  </p>
                </div>
              </div>
            ))}
            <Button
              onClick={handleContinue}
              className="bg-black text-white dark:bg-white dark:text-black font-semibold cursor-pointer hover:bg-custom-black py-6"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* <KYCModal
        isOpen={isKYCModalOpen}
        onClose={closeKYCModal}
        accountType={selectedAccountType}
      /> */}
    </div>
  );
}
