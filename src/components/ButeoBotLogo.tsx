import type React from 'react';

export function ButeoBotLogo({ size = 28, textClassName = "text-xl" }: { size?: number, textClassName?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
        width={size}
        height={size}
        aria-label="ButeoBot Logo"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
         <path d="M18 17l3 2v2H3v-2l3-2" transform="scale(0.5) translate(18, 18)"/>

      </svg>
      <span className={`font-headline font-semibold text-primary ${textClassName}`}>
        ButeoBot
      </span>
    </div>
  );
}
