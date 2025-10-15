import ButtonLoader from "@/components/custom/button-loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RiCheckLine, RiFileCopyLine, RiMailLine } from "react-icons/ri";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/api/user.api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  CustomAlert,
  type AlertVariant,
} from "@/components/custom/custom-alert";
import { Label } from "@/components/ui/label";

export interface AlertMessage {
  message: string; // Optional heading
  description: string; // Main alert message
  type: AlertVariant; // Determines styling
}

export default function ProfileContactUs() {
  const [copied, setCopied] = useState(false);
  const [alertData, setAlertData] = useState<AlertMessage | null>(null);

  const form = useForm<{ message: string }>({
    defaultValues: {
      message: "",
    },
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText("hello@assetbase.capital");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  const enquiryMutation = useMutation({
    mutationFn: userService.sendEnquiry,
    onSuccess: (data) => {
      setAlertData({
        message: "Your message has been sent successfully",
        description: `We will get back to you as soon as possible`,
        type: "success",
      });
      form.reset();
    },
    onError: (error) => {
      setAlertData({
        message: "Something went wrong",
        description: `Please try again later`,
        type: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    enquiryMutation.mutateAsync(data);
  };

  return (
    <div className="flex flex-col text-start p-4">
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">Send use a message directly</p>
        </div>

        <div>
          <Button
            variant="outline"
            className="border rounded-3xl flex items-center justify-between cursor-pointer h-full w-full"
          >
            <div className="flex items-center gap-4 w-full p-1 md:p-2">
              <RiMailLine className="!w-10 !h-10 p-2 rounded-full border-2 bg-custom-base" />
              <div className="flex items-center justify-between gap-4 w-full">
                <p className="font-medium text-xs sm:text-sm md:text-lg">
                  hello@assetbase.capital
                </p>

                <div
                  onClick={handleCopy}
                  className={cn(
                    `flex items-center gap-2 px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out bg-custom-orange/40 text-custom-orange`
                  )}
                >
                  <p className="text-sm py-1 font-medium">COPY</p>
                  {copied ? (
                    <RiCheckLine className="w-5 h-5" />
                  ) : (
                    <RiFileCopyLine className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="message"
              rules={{
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <Label>Enquiry</Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your message here..."
                      className={cn(
                        "min-h-[150px] shadow-none",
                        form.formState.errors.message &&
                          "border-red-500 focus:border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alert Message */}
            {alertData && (
              <CustomAlert
                message={alertData.message}
                variant={alertData.type}
                description={alertData.description}
              />
            )}

            {/* Submit Button */}
            <ButtonLoader
              type="submit"
              isLoading={enquiryMutation.isPending}
              loadingText="SEND MESSAGE"
              className="w-full rounded-full mt-2 py-5 btn-primary"
            >
              SEND MESSAGE
            </ButtonLoader>
          </form>
        </Form>
      </div>
    </div>
  );
}
