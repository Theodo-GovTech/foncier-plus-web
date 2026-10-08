import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarkdownContent } from "@/components/MarkdownContent";

const render = (markdown: string) =>
  renderToStaticMarkup(<MarkdownContent>{markdown}</MarkdownContent>);

describe("MarkdownContent", () => {
  it.each(["/fr/contact/", "/a-propos/doc.pdf", "https://example.com"])(
    "keeps the link %s as written",
    (href) => {
      expect(render(`[link](${href})`)).toContain(`href="${href}"`);
    },
  );

  it("does not interpret raw HTML", () => {
    expect(render("<script>alert(1)</script>")).not.toContain("<script>");
  });
});
