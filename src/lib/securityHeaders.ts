// Loaded by next.config.ts, outside the bundler: relative `.ts` imports, no `@/` alias.
import { MATOMO_CONTAINER_BASE_URL, MATOMO_URL } from "./matomo.ts";

// Inline scripts and styles need 'unsafe-inline': a nonce would make every page dynamic.
export const buildContentSecurityPolicy = (isDev: boolean) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${MATOMO_CONTAINER_BASE_URL}`,
    "style-src 'self' 'unsafe-inline'",
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
  // `next dev --experimental-https` would force HTTPS on localhost for two years
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
  { key: "X-XSS-Protection", value: "0" },
];
