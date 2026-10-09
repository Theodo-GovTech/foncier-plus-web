// Loaded by next.config.ts, outside the bundler: import with relative `.ts` paths, not the `@/`
// alias.
import { MATOMO_CONTAINER_BASE_URL, MATOMO_URL } from "./matomo.ts";

// Next.js page data, the Matomo snippet, next/image and the search background are inline: without a
// nonce, which would make every page dynamic, they need 'unsafe-inline'.
export const buildContentSecurityPolicy = (isDev: boolean) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${MATOMO_CONTAINER_BASE_URL}`,
    "style-src 'self' 'unsafe-inline'",
    // data: is for the JPEG embedded in public/a-propos/ECO_454.svg. Matomo can send hits as images.
    `img-src 'self' data: ${MATOMO_URL}`,
    `connect-src 'self' ${MATOMO_URL}`,
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

export const buildSecurityHeaders = (isDev: boolean) => [
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy(isDev) },
  // With `next dev --experimental-https`, browsers would force HTTPS on localhost for two years.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]),
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=(), browsing-topics=()",
  },
  // 0 turns off the legacy XSS filter of old browsers, which created vulnerabilities itself.
  { key: "X-XSS-Protection", value: "0" },
];
