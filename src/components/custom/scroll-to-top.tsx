import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const isPortfolio = (path: string) =>
      path.startsWith("/dashboard/portfolio");

    const wasPortfolio = isPortfolio(prevPath.current);
    const nowPortfolio = isPortfolio(pathname);

    // ✅ Scroll to top ONLY when first entering portfolio
    // Example: /dashboard → /dashboard/portfolio
    if (!wasPortfolio && nowPortfolio) {
      window.scrollTo(0, 0);
    }

    // ✅ Scroll normally for all other non-portfolio pages
    else if (!nowPortfolio) {
      window.scrollTo(0, 0);
    }

    // Update previous path
    prevPath.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
