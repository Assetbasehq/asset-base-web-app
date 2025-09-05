import { Button } from "../ui/button";

export default function ConnectWalletButton() {
  return (
    <Button
      variant="default"
      className="w-full font-medium py-6 border-2 border-custom-black bg-custom-black text-white dark:bg-custom-card dark:border-custom-orange dark:text-custom-orange cursor-pointer transition-all ease-in-out duration-300"
    >
      Connect Wallet
    </Button>
  );
}
