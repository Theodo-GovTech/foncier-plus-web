import { getTranslations } from "next-intl/server";
import { HomeLink } from "@/components/HomeLink";
import { CaretDownIcon } from "@/components/icons/CaretDownIcon";

type BreadcrumbProps = { currentPage: string };

export const Breadcrumb = async ({ currentPage }: BreadcrumbProps) => {
  const t = await getTranslations("Breadcrumb");

  return (
    <nav
      aria-label={t("ariaLabel")}
      className="mx-auto max-w-page px-4 py-7 lg:px-[114px]"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <HomeLink className="text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            {t("home")}
          </HomeLink>
        </li>
        <li
          aria-current="page"
          className="flex items-center gap-2 font-semibold text-brand"
        >
          <CaretDownIcon
            aria-hidden="true"
            className="size-3.5 -rotate-90 text-muted/70"
          />
          {currentPage}
        </li>
      </ol>
    </nav>
  );
};
