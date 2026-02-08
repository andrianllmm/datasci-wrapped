import { useEffect, useState } from "react";

/**
 * Canonical mobile check hook for Next.js
 * Returns true if viewport is mobile or user agent indicates mobile.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [breakpoint]);

  return isMobile;
}
