"use client";

import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { trackMetaLead } from "@/lib/metaPixel";
import { buildSignupUrl } from "@/lib/forwardParams";
import { CTA_LABEL, SIGNUP_URL } from "@/lib/links";

type LpCTAProps = {
  /** Position pour l'analytics : "lp-cav-hero", "lp-cav-steps"… */
  position: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  /** Libellé court (barre de navigation). Par défaut : le libellé commun. */
  label?: string;
  /** Version compacte, sans les ajustements de taille du grand bouton. */
  compact?: boolean;
};

/**
 * Le TrialCTA de la landing : même libellé, même couleur, même destination
 * que sur getcomeback.fr, avec en plus les UTM et le fbclid de la pub
 * transmis à l'inscription (plan=free toujours conservé).
 */
export function LpCTA({ position, size = "xl", className = "", label = CTA_LABEL, compact = false }: LpCTAProps) {
  const [href, setHref] = useState(SIGNUP_URL);

  useEffect(() => {
    setHref(buildSignupUrl(window.location.search));
  }, []);

  return (
    <a
      href={href}
      className={buttonClasses(
        "primary",
        size,
        compact
          ? `whitespace-nowrap ${className}`
          : `lp-cta min-h-11 whitespace-nowrap max-[400px]:px-5 max-[400px]:text-base max-[340px]:px-4 max-[340px]:text-[0.9rem] ${className}`,
      )}
      onClick={() => {
        trackEvent("cta_click", { position });
        trackMetaLead(position);
      }}
    >
      {label}
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 shrink-0">
        <path
          d="M3 10h13m-5-5 5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
