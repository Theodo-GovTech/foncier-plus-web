import { getLocale, getTranslations } from "next-intl/server";
import { NewsCard } from "@/components/NewsCard";
import { NewsTimeline } from "@/components/NewsTimeline";
import { getNewsSectionItems } from "@/helper/news_section";

export const newsSectionId = "actualites";

export const NewsSection = async () => {
  const t = await getTranslations("NewsSection");
  const locale = await getLocale();
  const newsItems = getNewsSectionItems(locale);

  if (newsItems.length === 0) return null;

  return (
    <section
      id={newsSectionId}
      className="mx-auto max-w-page px-4 py-20 lg:px-[114px]"
    >
      <NewsTimeline
        title={t.rich("title", {
          bold: (chunks) => <span className="font-bold">{chunks}</span>,
          line: (chunks) => <span className="block">{chunks}</span>,
        })}
        previousLabel={t("previousLabel")}
        nextLabel={t("nextLabel")}
        cards={newsItems.map((news) => (
          <NewsCard key={news.linkToNews} news={news} />
        ))}
      />
    </section>
  );
};
