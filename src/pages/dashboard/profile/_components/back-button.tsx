import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router";

export default function BackButton() {
  return (
    <div className="flex justify-start items-start py-4 px-8 md:hidden ">
      <Button
        asChild
        className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-custom-light-bg text-custom-white-text rounded-full hover:bg-custom-light-bg/80 transition-all duration-300 ease-in-out"
      >
        <Link to="/dashboard/account">
          <RiArrowLeftLine />
          <p>Back </p>
        </Link>
      </Button>
    </div>
  );
}
