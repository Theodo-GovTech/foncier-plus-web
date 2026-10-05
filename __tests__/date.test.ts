import { afterEach, describe, expect, it, vi } from "vitest";
import { compareDates, formatDate, readDate } from "@/helper/date";

const NEWS = "news.md";

describe("readDate", () => {
  it.each([
    ["a quoted date", "2025-10-01"],
    ["a date with spaces", " 2025-10-01 "],
    ["an unquoted date, read as a Date by YAML", new Date("2025-10-01")],
  ])("reads %s", (_, date) => {
    expect(readDate({ date }, NEWS)).toBe("2025-10-01");
  });

  it.each([undefined, "", "  ", "NA"])(
    "returns undefined for the date %j",
    (date) => {
      expect(readDate({ date }, NEWS)).toBeUndefined();
    },
  );

  it.each(["01/10/2025", "2025-1-1", "2025-13-01", "2025-02-31", "demain"])(
    "throws for the invalid date %s",
    (date) => {
      expect(() => readDate({ date }, NEWS)).toThrow(
        `${NEWS} - Invalid date "${date}"`,
      );
    },
  );
});

describe("compareDates", () => {
  it("sorts the dates from the oldest", () => {
    expect(
      ["2026-01-01", "2024-05-12", "2025-10-01"].sort(compareDates),
    ).toEqual(["2024-05-12", "2025-10-01", "2026-01-01"]);
  });
});

describe("formatDate", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([
    ["fr", "15 septembre 2026"],
    ["en", "September 15, 2026"],
  ] as const)("writes the date in full in %s", (locale, formattedDate) => {
    expect(formatDate("2026-09-15", locale)).toBe(formattedDate);
  });

  it("keeps the same day whatever the time zone of the build", () => {
    vi.stubEnv("TZ", "America/New_York");

    expect(formatDate("2026-09-15", "en")).toBe("September 15, 2026");
  });
});
