import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import logoFoncierPlus from "@/assets/logo-foncier-plus.svg";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavButton } from "@/components/NavButton";
import { PageLink } from "@/components/PageLink";
import { searchSectionId } from "@/components/SearchSection";
import { newsSectionId } from "@/components/NewsSection";
import { businessSectorsPathSectionId } from "@/components/BusinessSectorsPathSection";
import { SectionNav } from "@/components/SectionNav";
import { ABOUT_US_DIRECTORY, getArticleHref } from "@/helper/article_pages";
import { getFranceFoncierUrl } from "@/lib/franceFoncierUrls";

export const getSections = async () => {
  const t = await getTranslations("Header");
  return [
    { id: searchSectionId, label: t("searchNavLabel") },
    { id: newsSectionId, label: t("newsNavLabel") },
    {
      id: businessSectorsPathSectionId,
      label: t("businessSectorsPathNavLabel"),
    },
  ];
};

export const getPageLinks = async () => {
  const t = await getTranslations("Header");
  const locale = await getLocale();
  return [
    {
      href: getArticleHref(locale, ABOUT_US_DIRECTORY),
      label: t("aboutUsNavLabel"),
    },
  ];
};

export const Header = async () => {
  const t = await getTranslations("Header");
  const sectionNavTranslations = await getTranslations("SectionNav");
  const sections = await getSections();
  const pageLinks = await getPageLinks();
  const locale = await getLocale();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_12px] shadow-brand/15">
      <div className="mx-auto flex min-h-16 max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-4 py-3 lg:px-[114px]">
        <PageLink href="/">
          <Image
            src={logoFoncierPlus}
            alt="Foncier +"
            loading="eager"
            className="h-8 w-auto select-none"
          />
        </PageLink>
        <nav
          aria-label={t("navAriaLabel")}
          className="flex flex-wrap items-center gap-2"
        >
          <NavButton href="/" variant="solid" aria-current="page">
            {t("business")}
          </NavButton>
          <NavButton
            href={getFranceFoncierUrl(locale)}
            external
            variant="outline"
          >
            {t("localAuthority")}
          </NavButton>
          <PageLink
            href="/contact"
            className="inline-flex h-[30px] items-center justify-center border border-brand-accent bg-brand-accent px-4 text-[16px] leading-none font-bold whitespace-nowrap text-white transition-colors hover:bg-brand-accent-hover"
          >
            {t("contact")}
          </PageLink>
          <LanguageSwitcher />
        </nav>
      </div>
      <SectionNav
        sections={sections}
        pageLinks={pageLinks}
        ariaLabel={sectionNavTranslations("ariaLabel")}
      />
    </header>
  );
};
