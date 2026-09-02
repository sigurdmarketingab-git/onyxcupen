"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    // Navigering till en ankarlänk från en annan sida (t.ex. menyn på startsidan
    // som pekar på /cupinfo/slug#klassindelning). Next scrollar inte alltid till
    // hash vid sidbyte, så vi gör det manuellt. scroll-margin-top på sektionerna
    // ger rätt offset under den sticky menyn.
    if (hash) {
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "start" });
          return;
        }
        if (tries++ < 10) requestAnimationFrame(tryScroll);
      };
      requestAnimationFrame(tryScroll);
      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, [pathname]);

  return null;
}
