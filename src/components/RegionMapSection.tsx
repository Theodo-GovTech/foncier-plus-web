import { getTranslations } from "next-intl/server";
import { RegionMap } from "./RegionMap";

export const RegionMapSection = async () => {
  const t = await getTranslations("RegionMapSection");

  return (
    <section className="bg-linear-to-b from-gradient-start to-gradient-end">
      <div className="mx-auto flex max-w-page flex-col gap-10 px-4 py-16 lg:flex-row lg:gap-16 lg:px-[114px]">
        <RegionMap className="w-full max-w-140 self-center lg:w-140 lg:shrink-0 lg:self-auto" />
        <div className="gap-y-6 flex flex-col">
          <h2 className="leading-[1.15] text-[28px] text-brand lg:text-[40px]">
            {t.rich("title", {
              bold: (chunks) => <span className="font-bold">{chunks}</span>,
              line: (chunks) => <span className="block">{chunks}</span>,
            })}
          </h2>
          <h3 className="text-brand font-medium">{t("subtitle")}</h3>
          <p className="text-brand">{t("description")}</p>
        </div>
      </div>
    </section>
  );
};
