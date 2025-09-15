import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";

export default function WalletBreadCrumb({
  stage,
  goBack,
}: {
  stage?: number;
  goBack?: () => void;
}) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const naviagate = useNavigate();

  const formattedSegments = segments.map((seg) =>
    seg.toLowerCase() === "dashboard" ? "home" : seg
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-start items-start">
        <Button
          asChild
          className="flex items-center gap-2 text-xs cursor-pointer p-2 bg-custom-light-bg text-custom-white-text rounded-lg hover:bg-custom-light-bg/80 transition-all duration-300 ease-in-out"
        >
          <Button
            onClick={() => {
              if (stage === 1) return naviagate("/dashboard/wallet");
              if (!goBack) return naviagate("/dashboard/wallet");
              goBack?.();
            }}
          >
            <RiArrowLeftLine />
            <p>Back </p>
          </Button>
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center p-2 bg-custom-light-bg rounded-sm">
        {formattedSegments.map((seg, idx) => {
          const isLast = idx === formattedSegments.length - 1;
          const to = "/" + segments.slice(0, idx + 1).join("/");

          return (
            <div key={idx} className="flex items-center gap-2 ">
              <Link
                to={to}
                className={`capitalize px-1 py-1 rounded text-xs md:text-sm ${
                  isLast
                    ? "text-custom-orange font-medium"
                    : "text-muted-foreground hover:text-custom-white-text"
                }`}
              >
                {seg}
              </Link>
              {!isLast && <span className="text-muted-foreground">/</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
