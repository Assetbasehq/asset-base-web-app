import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import riseLogo from "@/assets/images/rise-logo.svg";

export default function RiseLoginButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/onboarding/account-type");
      }}
      variant="outline"
      className="w-full flex gap-1 items-center py-6 cursor-pointer text-rise font-normal border-rise hover:bg-white hover:text-rise hover:border-rise "
    >
      <span className=" font-medium"> Sign in with</span>
      <img src={riseLogo} alt="rise logo" />
    </Button>
  );
}
