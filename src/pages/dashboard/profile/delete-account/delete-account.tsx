"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DeleteAccount() {
  const { user } = useAuthStore();
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <div className="flex flex-col text-start p-4">
      {!showQuestions ? (
        <DeleteAccountMain
          onContinue={() => setShowQuestions(true)}
          user={user}
        />
      ) : (
        <DeleteAccountQuestions onBack={() => setShowQuestions(false)} />
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   FIRST COMPONENT — INITIAL SCREEN
---------------------------------------------------------- */

function DeleteAccountMain({ onContinue, user }: any) {
  return (
    <div className="mb-4">
      <h2 className="text-lg md:text-2xl font-semibold">Delete Account</h2>
      <p className="text-muted-foreground">Delete your account</p>

      <div className="flex flex-col gap-2 justify-center items-center mt-8">
        <img
          src={user?.profile_photo_url || "https://github.com/shadcn.png"}
          alt="profile image"
          className="w-30 h-30 rounded-full"
        />

        <div className="flex flex-col justify-center items-center">
          <p className="capitalize font-medium">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="font-medium">{user?.email_address}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 py-4">
          <div>
            <h2 className="text-lg font-medium">
              This will delete your account
            </h2>
            <p className="text-sm text-muted-foreground">
              You're about to start the process of deactivating your Assetbase
              account. Your account, display name, email address, and profile
              photo will no longer be available on the Assetbase App.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">We're sorry to see you go</h2>
            <p className="text-sm text-muted-foreground">
              Please help us understand your decision and ensure a smooth
              account closure process.
            </p>
          </div>
        </div>

        <Button
          className="btn-primary rounded-full py-5 w-full mt-4"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   SECOND COMPONENT — QUESTIONS FORM
---------------------------------------------------------- */

function DeleteAccountQuestions({ onBack }: any) {
  const [reason, setReason] = useState("");
  const [otherText, setOtherText] = useState("");
  const [improvement, setImprovement] = useState("");
  const [dataOption, setDataOption] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        ← Back
      </Button>

      <h2 className="text-lg md:text-2xl font-semibold">
        Let us know what went wrong
      </h2>

      {/* QUESTION 1 */}
      <div>
        <h3 className="font-medium mb-2">
          What is your primary reason for closing your account?
        </h3>

        <RadioGroup
          value={reason}
          onValueChange={setReason}
          className="space-y-2"
        >
          {[
            "No longer need this service",
            "Moving to a different platform",
            "Unsatisfied with service",
            "Cost concerns",
            "Security concerns",
            "Other",
          ].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem
                className=" cursor-pointer"
                value={item}
                id={item}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>

        {reason === "Other" && (
          <Textarea
            className="mt-3 min-h-[80px]"
            placeholder="Please tell us more..."
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
          />
        )}
      </div>

      <Separator />

      {/* QUESTION 2 */}
      <div>
        <h3 className="font-medium mb-2">
          Is there anything we could have done better?
        </h3>

        <RadioGroup
          value={improvement}
          onValueChange={setImprovement}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem className=" cursor-pointer" value="Yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem className=" cursor-pointer" value="No" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* QUESTION 3 */}
      <div>
        <h3 className="font-medium mb-2">
          How would you like us to handle your data?
        </h3>

        <RadioGroup
          value={dataOption}
          onValueChange={setDataOption}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              className=" cursor-pointer"
              value="Delete all my data"
              id="delete"
            />
            <Label htmlFor="delete">
              Delete all my data (except what we're legally required to keep)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              className=" cursor-pointer"
              value="Retain my data"
              id="retain"
            />
            <Label htmlFor="retain">Retain my data in case I return</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* CHECKBOX */}
      <div className="flex items-start space-x-2">
        <Checkbox
          className="checkbox-orange cursor-pointer "
          checked={agree}
          onCheckedChange={(checked: boolean) => {
            setAgree(checked);
          }}
          id="agree"
        />
        <Label htmlFor="agree" className="text-sm">
          I understand that closing my account will terminate all services and
          this action cannot be undone.
        </Label>
      </div>

      {/* SUBMIT */}
      <Button
        className="btn-primary rounded-full py-5 w-full"
        disabled={
          !agree ||
          !reason ||
          !improvement ||
          !dataOption ||
          (reason === "Other" && !otherText)
        }
      >
        Submit & Close Account
      </Button>
    </div>
  );
}
