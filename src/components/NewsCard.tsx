import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { CaretDownIcon } from "@/components/icons/CaretDownIcon";
import type { NewsSectionItem } from "@/helper/news_section";
import { NewsType } from "@/helper/read_news_md";
import { Link } from "@/i18n/navigation";

type NewsCardProps = { news: NewsSectionItem };

const linkClassName =
  "mt-auto inline-flex items-center gap-2 self-start pt-4 text-lg font-bold text-brand underline underline-offset-4 transition-colors hover:text-brand-accent";

export const NewsCard = async ({ news }: NewsCardProps) => {
  const t = await getTranslations("NewsSection");
  const { type, title, description, coverImgSrc, href } = news;

  const linkContent = (
    <>
      {t(`readLink.${type}`)}
      <CaretDownIcon aria-hidden="true" className="size-5 -rotate-90" />
    </>
  );

  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-video overflow-hidden bg-brand/5">
        {coverImgSrc !== undefined && (
          <Image src={coverImgSrc} alt="" fill className="object-cover" />
        )}
      </div>
      <h3 className="mt-4 text-xl leading-6 font-semibold text-brand">
        {title}
      </h3>
      {description !== undefined && (
        <p className="mt-3 text-muted">{description}</p>
      )}
      {type === NewsType.ARTICLE ? (
        <Link href={href} className={linkClassName}>
          {linkContent}
        </Link>
      ) : (
        // `<Link>` would add the locale before a file of public/
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {linkContent}
          <span className="sr-only"> ({t("newTabLabel")})</span>
        </a>
      )}
    </article>
  );
};
