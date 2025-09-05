import ButtonLoader from "@/components/custom/button-loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RiCheckLine, RiFileCopyLine, RiMailLine } from "react-icons/ri";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProfileContactUs() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("hello@assetbase.capital");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <div className="flex flex-col  text-start p-8">
      <div className="flex flex-col gap-8">
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">Send use a message directly</p>
        </div>

        <div>
          <Button
            // disabled={isPending || data?.email_status === "verified" || isError}
            // disabled={isPending || data?.email_status === "verified"}
            // onClick={() => mutateAsync()}
            variant="outline"
            className="border rounded-3xl flex items-center justify-between cursor-pointer h-full w-full"
          >
            <div className="flex items-center gap-4 w-full p-2">
              <RiMailLine className="!w-10 !h-10 p-2 rounded-full border-2 border-wh bg-custom-base" />
              <div className="flex items-center justify-between gap-4 w-full">
                <p className="font-medium text-lg">hello@assetbase.capital</p>

                <div
                  onClick={handleCopy}
                  className={cn(
                    `flex items-center gap-2 px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out bg-custom-orange/40 text-custom-orange`
                  )}
                >
                  <p className="text-lg font-medium">COPY</p>
                  {copied ? (
                    <RiCheckLine className="w-5 h-5" />
                  ) : (
                    <RiFileCopyLine className="w-5 h-5" />
                  )}

                  {/* {copied ? (
                    <>
                      <p className="font-light text-lg">COPIED</p>
                      <RiCheckLine className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <p className=" font-light text-lg">COPY</p>
                      <RiFileCopyLine className="w-5 h-5" />
                    </>
                  )} */}
                </div>
              </div>
            </div>
          </Button>
        </div>

        <form action="">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm">Enquiry</p>
            <Textarea className="min-h-[150px] shadow-none" />
          </div>
          <ButtonLoader
            isLoading={true}
            loadingText="SEND MESSAGE"
            // onClick={() => setError("Hellow")}
            className="w-full rounded-full mt-4 py-5 btn-primary"
          >
            SEND MESSAGE
          </ButtonLoader>
        </form>
      </div>
    </div>
  );
}
