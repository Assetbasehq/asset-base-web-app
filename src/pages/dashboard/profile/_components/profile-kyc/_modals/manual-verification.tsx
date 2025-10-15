import { verificationService } from "@/api/verification.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonLoader from "@/components/custom/button-loader";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useState } from "react";
import { identification_types } from "@/constants/identification-types";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import CapturePhoto from "../_components/capture-photo";
import UploadDocument from "../_components/upload-document";

const tempCountries = [
  { name: "Nigeria", code: "NG", flag: "🇳🇬" },
  { name: "Kenya", code: "KE", flag: "🇰🇪" },
  { name: "Ghana", code: "GH", flag: "🇬🇭" },
  { name: "Uganda", code: "UG", flag: "🇺🇬" },
];

interface ManualVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  country: string;
  identification_type: string;
  identification_number: string;
}

export default function ManualVerification({
  isOpen,
  onClose,
  onSuccess,
}: ManualVerificationProps) {
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      country: "",
      identification_type: "",
      identification_number: "",
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verificationService.initiateSystemVerification,
    onSuccess: (data) => {
      // console.log({ data });
      // onSuccess();
      setStep(2);
    },
    onError: (error) => {
      // console.log({ error });
      setError(error.message);

      setTimeout(() => {
        setError(null);
      }, 2000);
    },
  });

  const uploadFilesMutation = useMutation({
    mutationFn: verificationService.uploadVerificationAttachments,
    onSuccess: (data) => {
      // console.log({ data });
      console.log(`Upload successful, verification initiated`);

      const payload: Record<string, any> = {
        request_type: "identity",
        provider: "system",
        user_data: {
          id_type: form.getValues("identification_type"),
          id_number: form.getValues("identification_number"),
        },
      };

      if (form.getValues("identification_type") !== "bvn") {
        payload.image_urls = [];
      }

      mutateAsync(payload as any);
    },
    onError: (error) => {
      // console.log({ error });
      setError(error.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    // console.log({ data });
    setStep(2);
  };

  const dataURLtoFile = (dataurl: string, mimeType: string) => {
    const dataURLArr = dataurl.split(",");
    /* decode the encoded base64 string for the image into a character string for each byte of data */
    const decodedBinaryStr = atob(dataURLArr[1]);
    let n = decodedBinaryStr.length;
    /* Create a Uint8array based on the length of the decoded base64 string  */
    const u8arr = new Uint8Array(n);

    while (n--) {
      /* Loop through the entire decodedBinaryString and assign each character to the UintArray to create a byte array */
      u8arr[n] = decodedBinaryStr.charCodeAt(n);
    }

    return new File([u8arr], "image", { type: mimeType });
  };

  const handleFinishVerification = async () => {
    setError(null);
    if (!photo && !file) {
      setError("Please provide a photo or upload a document.");
      return;
    }

    const newPhoto = dataURLtoFile(photo!, "image/png");

    uploadFilesMutation.mutate([newPhoto, file] as File[]);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg rounded-2xl p-6 md:p-8 text-start"
      >
        <DialogHeader className="flex flex-col items-start justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-start">
            Manual Verification
          </DialogTitle>
          <DialogDescription className="text-start">
            {step === 1
              ? "Provide the details required to complete your verification"
              : "Capture or upload your identification image"}{" "}
          </DialogDescription>
        </DialogHeader>

        {/* 🔄 Animated Step Container */}
        <div className="relative w-full overflow-hidden h-full">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col w-full gap-6 text-start"
                  >
                    {/* Country */}
                    <FormField
                      control={form.control}
                      name="country"
                      // rules={{ required: "Country is required" }}
                      render={({ field }) => {
                        const error = form.formState.errors.country;
                        return (
                          <FormItem>
                            <Label>Country Of Residence</Label>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger
                                  className={cn(
                                    "w-full py-6 cursor-pointer capitalize",
                                    error && "border-red-500 text-red-500"
                                  )}
                                >
                                  <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {tempCountries.map((country) => (
                                    <SelectItem
                                      key={country.name}
                                      value={country.name}
                                      className="capitalize"
                                    >
                                      {country.flag} {country.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    {/* Identification Type */}
                    <FormField
                      control={form.control}
                      name="identification_type"
                      // rules={{
                      //   required: "Identification Type is required",
                      // }}
                      render={({ field }) => {
                        const error = form.formState.errors.identification_type;
                        return (
                          <FormItem>
                            <Label>Identification Type</Label>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger
                                  className={cn(
                                    "w-full py-6 cursor-pointer",
                                    error && "border-red-500 text-red-500"
                                  )}
                                >
                                  <SelectValue placeholder="Select Identification Type" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {identification_types.map((idType) => (
                                    <SelectItem
                                      key={idType.shortCode}
                                      value={idType.shortCode.toLowerCase()}
                                      className="capitalize"
                                    >
                                      {idType.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    {/* Identification Number */}
                    <FormField
                      control={form.control}
                      name="identification_number"
                      // rules={{
                      //   required: "Identification Number is required",
                      //   minLength: {
                      //     value: 11,
                      //     message: "Must be exactly 11 digits",
                      //   },
                      //   maxLength: {
                      //     value: 11,
                      //     message: "Must be exactly 11 digits",
                      //   },
                      // }}
                      render={({ field }) => (
                        <FormItem>
                          <Label>Identification Number</Label>
                          <FormControl>
                            <Input
                              className="py-6"
                              placeholder="Enter ID number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {error && (
                      <CustomAlert variant="destructive" message={error} />
                    )}

                    <ButtonLoader
                      // disabled={isPending || !form.formState.isValid}

                      type="submit"
                      className="w-full btn-secondary rounded-full mt-2 py-6"
                    >
                      CLICK HERE TO PROCEED
                    </ButtonLoader>
                  </form>
                </Form>
              </motion.div>
            ) : step === 2 ? (
              // ✅ Step 2 — Upload/Capture
              <CapturePhoto
                photo={photo}
                setPhoto={setPhoto}
                onSelect={() => setStep(3)}
                goBack={() => setStep(1)}
              />
            ) : (
              <UploadDocument
                error={error}
                file={file}
                setFile={setFile}
                onSelect={handleFinishVerification}
                isLoading={isPending || uploadFilesMutation.isPending}
                goBack={() => setStep(2)}
              />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
