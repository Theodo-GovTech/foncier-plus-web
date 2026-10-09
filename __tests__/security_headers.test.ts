import { describe, expect, it } from "vitest";
import { MATOMO_CONTAINER_URL } from "@/lib/matomo";
import {
  buildContentSecurityPolicy,
  buildSecurityHeaders,
} from "@/lib/securityHeaders";

describe("buildContentSecurityPolicy", () => {
  it("builds the production policy", () => {
    expect(buildContentSecurityPolicy(false)).toBe(
      "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.matomo.cloud/foncierpluss3websitefrparscwcloud.matomo.cloud/; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https://foncierpluss3websitefrparscwcloud.matomo.cloud; " +
        "connect-src 'self' https://foncierpluss3websitefrparscwcloud.matomo.cloud; " +
        "font-src 'self'; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self'; " +
        "frame-ancestors 'none'; " +
        "upgrade-insecure-requests",
    );
  });

  it("allows eval and skips the HTTPS upgrade in development", () => {
    const policy = buildContentSecurityPolicy(true);

    expect(policy).toContain(
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' ",
    );
    expect(policy).not.toContain("upgrade-insecure-requests");
  });

  it("allows the Matomo container loaded by the layout", () => {
    const scriptSources = buildContentSecurityPolicy(false)
      .split("; ")
      .find((directive) => directive.startsWith("script-src "))
      ?.split(" ");

    expect(
      scriptSources?.some((source) => MATOMO_CONTAINER_URL.startsWith(source)),
    ).toBe(true);
  });
});

describe("buildSecurityHeaders", () => {
  it("returns the production security headers", () => {
    expect(buildSecurityHeaders(false)).toEqual([
      {
        key: "Content-Security-Policy",
        value: buildContentSecurityPolicy(false),
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=(), browsing-topics=()",
      },
      { key: "X-XSS-Protection", value: "0" },
    ]);
  });

  it("does not send HSTS in development", () => {
    const keys = buildSecurityHeaders(true).map(({ key }) => key);

    expect(keys).not.toContain("Strict-Transport-Security");
    expect(keys).toContain("Content-Security-Policy");
  });
});
