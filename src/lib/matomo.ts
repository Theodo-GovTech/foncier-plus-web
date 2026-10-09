// Also loaded by next.config.ts (through securityHeaders.ts), outside the bundler: do not import
// with the `@/` alias here.
export const MATOMO_URL =
  "https://foncierpluss3websitefrparscwcloud.matomo.cloud";

// The CDN serves the containers of every Matomo Cloud customer, so the CSP only allows this folder.
export const MATOMO_CONTAINER_BASE_URL =
  "https://cdn.matomo.cloud/foncierpluss3websitefrparscwcloud.matomo.cloud/";

export const MATOMO_CONTAINER_URL = `${MATOMO_CONTAINER_BASE_URL}container_t2LCTS8k.js`;
