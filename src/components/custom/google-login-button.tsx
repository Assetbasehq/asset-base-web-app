import { Button } from "../ui/button";
import googleLogo from "@/assets/images/google-logo.svg";

export default function GoogleLoginButton() {
  return (
    <Button
      variant="outline"
      className="w-full py-6 cursor-pointer font-medium border-2 dark:border-white text-black dark:text-white dark:bg-custom-card"
    >
      <img src={googleLogo} alt="" /> Sign in with Google
    </Button>
  );
}
