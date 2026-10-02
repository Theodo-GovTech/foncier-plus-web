import { describe, expect, it } from "vitest";
import { convertFileIntoArticleMd } from "@/helper/read_news_md";

const testArticle = (name: string) => `__tests__/test_articles/${name}`;

describe("convertFileIntoArticleMd", () => {
  it("returns the article metadata and its trimmed content", () => {
    expect(
      convertFileIntoArticleMd(testArticle("complete-article.md")),
    ).toEqual({
      type: "article",
      title: "Article title",
      description: "Article description",
      metaDescription: "Article meta description",
      coverImgPath: "cover.png",
      slug: "article",
      body: "# Article heading\n\nArticle body.",
    });
  });

  it("returns undefined for optional metadata that is NA, empty or missing", () => {
    const article = convertFileIntoArticleMd(
      testArticle("empty-optional-metadata.md"),
    );

    expect(article.description).toBeUndefined();
    expect(article.metaDescription).toBeUndefined();
    expect(article.coverImgPath).toBeUndefined();
  });

  it("throws when the type is missing", () => {
    expect(() =>
      convertFileIntoArticleMd(testArticle("missing-type.md")),
    ).toThrow('Missing metadata "type"');
  });

  it("throws when the title is missing", () => {
    expect(() =>
      convertFileIntoArticleMd(testArticle("missing-title.md")),
    ).toThrow('Missing metadata "title"');
  });

  it("throws when the title only contains spaces", () => {
    expect(() =>
      convertFileIntoArticleMd(testArticle("blank-title.md")),
    ).toThrow('Missing metadata "title"');
  });

  it("throws when the slug of an article is missing", () => {
    expect(() =>
      convertFileIntoArticleMd(testArticle("missing-slug.md")),
    ).toThrow('Missing metadata "slug"');
  });

  it.each(["pdf", "url"])("does not require a slug for a %s", (type) => {
    expect(
      convertFileIntoArticleMd(testArticle(`${type}-without-slug.md`)).slug,
    ).toBeUndefined();
  });

  it("returns the slug of a non-article when it is provided", () => {
    expect(convertFileIntoArticleMd(testArticle("pdf-with-slug.md")).slug).toBe(
      "/pdf",
    );
  });

  it("accepts an article type written in uppercase", () => {
    expect(
      convertFileIntoArticleMd(testArticle("uppercase-article.md")),
    ).toMatchObject({ type: "article", slug: "article" });
  });

  it("throws when the type is not supported", () => {
    expect(() =>
      convertFileIntoArticleMd(testArticle("invalid-type.md")),
    ).toThrow('Invalid article type "video"');
  });
});
