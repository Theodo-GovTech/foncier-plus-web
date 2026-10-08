import { describe, expect, it } from "vitest";
import { buildMailtoUrl } from "@/lib/contact";

describe("buildMailtoUrl", () => {
  it("builds a mailto URL with the subject and body as query params", () => {
    expect(buildMailtoUrl("contact@example.com", "Hello", "A body")).toBe(
      "mailto:contact@example.com?subject=Hello&body=A%20body",
    );
  });

  it("encodes accented characters", () => {
    expect(buildMailtoUrl("c@e.fr", "Prise de contact", "Société Théodo")).toBe(
      "mailto:c@e.fr?subject=Prise%20de%20contact&body=Soci%C3%A9t%C3%A9%20Th%C3%A9odo",
    );
  });

  it("encodes line breaks in the body", () => {
    expect(buildMailtoUrl("c@e.fr", "Sujet", "Bonjour,\nCordialement")).toBe(
      "mailto:c@e.fr?subject=Sujet&body=Bonjour%2C%0ACordialement",
    );
  });

  it.each(["&", "?", "=", "#"])(
    "encodes %s so it cannot break the query string",
    (character) => {
      const url = buildMailtoUrl("c@e.fr", "Sujet", `a${character}b`);

      expect(url).toBe(
        `mailto:c@e.fr?subject=Sujet&body=a${encodeURIComponent(character)}b`,
      );
    },
  );
});
