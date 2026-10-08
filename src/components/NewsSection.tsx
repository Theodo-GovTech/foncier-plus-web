import { getLocale, getTranslations } from "next-intl/server";
import { NewsCard } from "@/components/NewsCard";
import { NewsTimeline } from "@/components/NewsTimeline";
import { getNewsSectionItems } from "@/helper/news_section";

export const NewsSection = async () => {
  const t = await getTranslations("NewsSection");
  const locale = await getLocale();
  const newsItems = getNewsSectionItems(locale);

  if (newsItems.length === 0) return null;

  return (
    <section className="mx-auto max-w-page px-4 py-20 lg:px-[114px]">
      <NewsTimeline
        title={t("title")}
        previousLabel={t("previousLabel")}
        nextLabel={t("nextLabel")}
        cards={newsItems.map((news) => (
          <NewsCard key={news.linkToNews} news={news} />
        ))}
      />
    </section>
  );
};
