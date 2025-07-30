import { Button } from "../ui/button";

export default function ConnectWalletButton() {
  return (
    <Button
      variant="default"
      className="w-full py-6 bg-custom-black hover:bg-custom-black/90 cursor-pointer transition-all ease-in-out duration-300"
    >
      Connect Wallet
    </Button>
  );
}
