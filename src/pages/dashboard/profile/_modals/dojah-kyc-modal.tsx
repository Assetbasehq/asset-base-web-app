import env from "@/config";
import { formatDate } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useRef } from "react";
import Dojah from "react-dojah";

interface DojahKycModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: Record<string, any> | null;
}

export default function DojahKycModal({
  isOpen,
  onClose,
  userData,
}: DojahKycModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuthStore();
  console.log({ userData, user });

  const appID = env.DOJAH_APP_ID;
  const publicKey = env.DOJAH_PUBLIC_KEY;
  const widgetId = env.DOJAH_WIDGET_ID;

  const type = "custom";
  const config = {
    debug: true,
    webhook: true,
    // pages: [
    //   {
    //     page: "govrnement-data",
    //     config: {
    //       bvn: true,
    //       nin: true,
    //       dl: true,
    //       mobile: true,
    //       otp: true,
    //       selfie: true,
    //     },
    //   },
    // ],
    widget_id: widgetId,
  };

  const newUserData = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    dob: formatDate(user?.date_of_birth),
    residence_country: "NG", //Optional
    email: user?.email_address,
  };

  const govData = {
    nin: "",
    bvn: "",
    dl: "",
    mobile: "",
  };

  const metadata = {
    user_id: user?.account_id,
  };

  const response = (type: string, data: any) => {
    console.log(type, data);
    if (type === "success") {
    } else if (type === "error") {
      setTimeout(() => onClose(), 1000);
    } else if (type === "close") {
    } else if (type === "begin") {
    } else if (type === "loading") {
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dojah
      response={response}
      appID={appID}
      publicKey={publicKey}
      type={type}
      userData={newUserData}
      govData={govData}
      metadata={metadata}
      config={config}
    />
  );
}
