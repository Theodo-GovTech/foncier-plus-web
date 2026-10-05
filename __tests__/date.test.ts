import { describe, expect, it } from "vitest";
import { readDate } from "@/helper/date";

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
