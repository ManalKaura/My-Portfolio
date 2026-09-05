"use client";

import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

export interface NavLinkItem {
  label: string;
  href?: string;
}

export interface RandomLetterSwapNavProps {
  items?: (string | NavLinkItem)[];
  className?: string;
}

const defaultLinks: (string | NavLinkItem)[] = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function RandomLetterSwapNav({
  items = defaultLinks,
  className = "",
}: RandomLetterSwapNavProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        {items.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          const href = typeof item === "string" ? `#${item.toLowerCase()}` : item.href;

          return (
            <RandomLetterSwap
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors"
              key={label}
              label={label}
              href={href}
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: "spring" }}
            />
          );
        })}
      </nav>
    </div>
  );
}
