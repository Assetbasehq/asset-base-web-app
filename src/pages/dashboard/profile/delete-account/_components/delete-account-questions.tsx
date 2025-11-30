import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface FormValues {
  reason: string;
  other_reason: string;
  improvement: string;
  recommendation: string;
  delete_type: string;
  agree: boolean;
}

export default function DeleteAccountQuestions({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (data: any) => void;
}) {
  const form = useForm({
    defaultValues: {
      reason: "",
      other_reason: "",
      improvement: "",
      recommendation: "",
      delete_type: "",
      agree: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
      delete_type: values.delete_type, // hard or soft
      metadata: {
        reason: values.reason,
        other_reason:
          values.reason === "Other" ? values.other_reason : undefined,
        recommendation:
          values.improvement === "Yes" ? values.recommendation : null,
      },
    };
    onNext(payload); // Pass up to parent
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>

        <h2 className="text-lg md:text-2xl font-semibold">
          Let us know what went wrong
        </h2>

        {/* QUESTION 1 ------------------------------- */}
        <FormField
          control={form.control}
          name="reason"
          rules={{
            required: { value: true, message: "Please select an option" },
          }}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label>
                What is your primary reason for closing your account?
              </Label>

              <FormControl>
                <div>
                  <RadioGroup
                    className="space-y-2"
                    value={field.value}
                    onValueChange={field.onChange}
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
                </div>
              </FormControl>

              {/* If OTHER is selected */}
              {form.watch("reason") === "Other" && (
                <FormField
                  control={form.control}
                  name="other_reason"
                  rules={{
                    validate: (value) =>
                      value?.trim().length > 0 || "Please provide a reason",
                  }}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormControl>
                        <Textarea
                          placeholder="Please tell us more..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* QUESTION 2 ------------------------------- */}
        <FormField
          control={form.control}
          name="improvement"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                Is there anything we could have done better?
              </FormLabel>

              <FormControl>
                <RadioGroup
                  className="space-y-2"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className=" cursor-pointer"
                      value="Yes"
                      id="yes"
                    />
                    <FormLabel htmlFor="yes">Yes</FormLabel>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className=" cursor-pointer"
                      value="No"
                      id="no"
                    />
                    <FormLabel htmlFor="no">No</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>

              {/* IF YES → Show textarea */}
              {form.watch("improvement") === "Yes" && (
                <FormField
                  control={form.control}
                  name="recommendation"
                  rules={{
                    validate: (value) =>
                      value?.trim().length > 0 ||
                      "Please tell us what we could do better",
                  }}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormControl>
                        <Textarea
                          placeholder="Please tell us what we could do better..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* QUESTION 3 ------------------------------- */}
        <FormField
          control={form.control}
          name="delete_type"
          rules={{
            required: { value: true, message: "Please select an option" },
          }}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label>How would you like us to handle your data?</Label>

              <FormControl>
                <RadioGroup
                  className="space-y-2"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className=" cursor-pointer"
                      value="hard"
                      id="delete"
                    />
                    <Label htmlFor="delete">
                      Delete all my data (except what we're legally required to
                      keep)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className=" cursor-pointer"
                      value="soft"
                      id="retain"
                    />
                    <Label htmlFor="retain">
                      Retain my data in case I return
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* CHECKBOX ------------------------------- */}
        <FormField
          control={form.control}
          name="agree"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex space-x-2 items-start">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormLabel className="text-sm">
                I understand that closing my account will terminate all services
                and this action cannot be undone.
              </FormLabel>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT ------------------------------- */}
        <Button type="submit" className="btn-primary rounded-full py-5 w-full">
          Submit & Close Account
        </Button>
      </form>
    </Form>
  );
}
