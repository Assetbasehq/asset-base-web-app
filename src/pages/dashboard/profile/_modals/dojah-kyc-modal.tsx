import { dojahAppID, dojahPublicKey } from "@/constants/dojah";
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

  console.log({ userData });

  const appID = dojahAppID;
  const publicKey = dojahPublicKey;

  const type = "custom";
  const config = {
    debug: true,
    webhook: true,
    pages: [
      {
        page: "govrnement-data",
        config: {
          bvn: true,
          nin: true,
          dl: true,
          mobile: true,
          otp: true,
          selfie: true,
        },
      },
    ],
  };

  const newUserData = {
    first_name: "", //Optional
    last_name: "", //Optional
    dob: "", //YYYY-MM-DD Optional
    residence_country: "NG", //Optional
    email: "", //optional
  };

  const govData = {
    nin: "",
    bvn: "",
    dl: "",
    mobile: "",
  };

  const metadata = {
    user_id: userData?.user_id,
  };

  const response = (type: string, data: any) => {
    console.log(type, data);
    if (type === "success") {
    } else if (type === "error") {
      setTimeout(() => onClose(), 2000);
    } else if (type === "close") {
    } else if (type === "begin") {
    } else if (type === "loading") {
    }
  };

  // useEffect(() => {
  //   // Cleanup DOM on unmount (make sure container is empty)
  //   return () => {
  //     if (containerRef.current) {
  //       containerRef.current.innerHTML = "";
  //     }
  //   };
  // }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={containerRef}>
      <Dojah
        response={response}
        appID={appID}
        publicKey={publicKey}
        type={type}
        userData={{ residence_country: "NG" }}
        govData={{}}
        metadata={metadata}
        config={config}
      />
    </div>
  );
}
