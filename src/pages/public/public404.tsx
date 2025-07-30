import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Public404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>Oopss</p>
      <p>Page not found in public</p>
      <Link to="/">
        <Button className="btn-primary mt-4">Go back home</Button>
      </Link>
    </div>
  );
}
