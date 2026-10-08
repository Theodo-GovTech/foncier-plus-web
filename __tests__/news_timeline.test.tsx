import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { NewsTimeline } from "@/components/NewsTimeline";

const render = (newsCount: number) =>
  renderToStaticMarkup(
    <NewsTimeline
      title="Actualités"
      previousLabel="Actualités précédentes"
      nextLabel="Actualités suivantes"
      cards={Array.from({ length: newsCount }, (_, index) => (
        <p key={index}>{`News ${index + 1}`}</p>
      ))}
    />,
  );

describe("NewsTimeline", () => {
  it("renders every news, only the first page being interactive", () => {
    const html = render(7);

    expect(html).toContain("News 7");
    expect(html.match(/inert=""/g)).toHaveLength(2);
  });

  it("disables the previous button on the first page", () => {
    expect(render(7)).toContain('aria-disabled="true"');
  });

  it("hides the buttons when every news fits in one page", () => {
    expect(render(3)).not.toContain("<button");
  });
});
