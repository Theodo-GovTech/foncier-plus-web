import { getTranslations } from "next-intl/server";
import { RegionMap } from "./RegionMap";

export const RegionMapSection = async () => {
  const t = await getTranslations("RegionMapSection");

  return (
    <section className="mx-auto max-w-page px-4 py-4 lg:px-[114px] bg-linear-to-b from-gray-50 to-white gap-x-16 flex">
      <RegionMap className="w-140 shrink-0" />
      <div className="gap-y-6 flex flex-col">
        <h2 className="leading-[1.15] text-[28px] font-semibold text-brand lg:text-[40px]">
          {t("title")}
        </h2>
        <h3 className="text-brand font-medium">{t("subtitle")}</h3>
      </div>
    </section>
  );
};
