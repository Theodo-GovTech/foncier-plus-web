import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getArticlePages, getArticleRedirects } from "@/helper/article_pages";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Static export: only the articles found at build time have a page
export const dynamicParams = false;

export function generateStaticParams({
  params: { locale },
}: {
  params: Awaited<LayoutProps<"/[locale]">["params"]>;
}) {
  if (!hasLocale(routing.locales, locale)) return [];

  return [...getArticlePages(locale), ...getArticleRedirects(locale)].map(
    ({ slug }) => ({ slug }),
  );
}

const getArticlePage = async (
  params: PageProps<"/[locale]/[slug]">["params"],
) => {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const articlePage = getArticlePages(locale).find(
    (articlePage) => articlePage.slug === slug,
  );

  if (articlePage !== undefined) return articlePage;

  // Slug d'une autre langue : redirige (voir getArticleRedirects)
  const articleRedirect = getArticleRedirects(locale).find(
    (articleRedirect) => articleRedirect.slug === slug,
  );

  if (articleRedirect !== undefined) {
    redirect(articleRedirect.destination);
  }

  notFound();
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[slug]">): Promise<Metadata> {
  const { title, metaDescription, description } = await getArticlePage(params);

  return { title, description: metaDescription ?? description };
}

export default async function ArticlePage({
  params,
}: PageProps<"/[locale]/[slug]">) {
  const { title, body } = await getArticlePage(params);

  return (
    <main className="flex-1 bg-linear-to-b from-brand/2 to-white">
      <Breadcrumb currentPage={title} />
      <MarkdownContent>{body}</MarkdownContent>
    </main>
  );
}
