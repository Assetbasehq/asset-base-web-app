import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import riseLogo from "@/assets/images/rise-logo.svg";

export default function RiseLoginButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/login/rise");
      }}
      variant="outline"
      className="w-full flex gap-1 items-center py-6 cursor-pointer border-2 text-rise border-rise hover:bg-white hover:text-rise hover:border-rise dark:bg-white dark:border-rise dark:hover:bg-white transition-all ease-in-out duration-300"
    >
      <span className=" font-medium"> Sign in with</span>
      <img src={riseLogo} alt="rise logo" />
    </Button>
  );
}
