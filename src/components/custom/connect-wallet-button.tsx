import { Button } from "../ui/button";

export default function ConnectWalletButton() {
  return (
    <Button
      variant="default"
      className="w-full font-semibold py-6 border text-white bg-custom-black hover:bg-custom-black/90 dark:bg-custom-card-foreground dark:hover:bg-primary/10 dark:text-primary dark:border-primary  cursor-pointer transition-all ease-in-out duration-300"
    >
      Connect Wallet
    </Button>
  );
}
