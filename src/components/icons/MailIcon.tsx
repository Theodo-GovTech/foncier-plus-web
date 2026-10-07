import type { SVGProps } from "react";

export const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3.5 6.5L12 13L20.5 6.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
