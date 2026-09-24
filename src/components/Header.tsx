import { getTranslations } from "next-intl/server";
import Image from "next/image";
import logoFoncierPlus from "@/assets/logo-foncier-plus.svg";
import { HomeLink } from "@/components/HomeLink";
import { NavButton } from "@/components/NavButton";
import { searchSectionId } from "@/components/SearchSection";
import { SectionNav } from "@/components/SectionNav";

export const Header = async () => {
  const t = await getTranslations("Header");
  const sectionNavTranslations = await getTranslations("SectionNav");
  const sections = [{ id: searchSectionId, label: t("searchNavLabel") }];

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex min-h-16 max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-4 py-3 lg:px-[114px]">
        <HomeLink>
          <Image
            src={logoFoncierPlus}
            alt="Foncier +"
            loading="eager"
            className="h-8 w-auto select-none"
          />
        </HomeLink>
        <nav
          aria-label={t("navAriaLabel")}
          className="flex flex-wrap items-center gap-2"
        >
          <NavButton href="/" variant="solid" aria-current="page">
            {t("business")}
          </NavButton>
          <NavButton
            href="https://www.banquedesterritoires.fr/produits-services/services-digitaux/france-foncier"
            external
            variant="outline"
          >
            {t("localAuthority")}
          </NavButton>
          <NavButton variant="accent">{t("contact")}</NavButton>
        </nav>
      </div>
      <SectionNav sections={sections} ariaLabel={sectionNavTranslations("ariaLabel")} />
    </header>
  );
};
