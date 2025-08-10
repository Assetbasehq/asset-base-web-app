import { Link } from "react-router";

export default function Onboarding404() {
  return (
    <div>
      <p>Oopss</p>
      <p>Page not found</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
