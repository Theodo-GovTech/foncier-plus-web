import { getTranslations } from "next-intl/server";
import Image from "next/image";
import logoFoncierPlus from "@/assets/logo-foncier-plus.svg";
import { HomeLink } from "@/components/HomeLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavButton } from "@/components/NavButton";
import { searchSectionId } from "@/components/SearchSection";
import { businessSectorsPathSectionId } from "@/components/BusinessSectorsPathSection";
import { SectionNav } from "@/components/SectionNav";

export const getSections = async () => {
  const t = await getTranslations("Header");
  return [
    { id: searchSectionId, label: t("searchNavLabel") },
    {
      id: businessSectorsPathSectionId,
      label: t("businessSectorsPathNavLabel"),
    },
  ];
};

export const Header = async () => {
  const t = await getTranslations("Header");
  const sectionNavTranslations = await getTranslations("SectionNav");
  const sections = await getSections();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_12px] shadow-brand/15">
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
          <NavButton href="/contact" variant="accent">
            {t("contact")}
          </NavButton>
          <LanguageSwitcher />
        </nav>
      </div>
      <SectionNav
        sections={sections}
        ariaLabel={sectionNavTranslations("ariaLabel")}
      />
    </header>
  );
};
