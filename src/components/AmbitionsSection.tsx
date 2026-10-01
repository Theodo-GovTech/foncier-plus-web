import { getTranslations } from "next-intl/server";
import Image from "next/image";
import iconFolder from "@/assets/icon-folder.svg";
import iconGauge from "@/assets/icon-gauge.svg";
import iconHammer from "@/assets/icon-hammer.svg";
import iconLightbulb from "@/assets/icon-lightbulb.svg";
import iconPlusNW from "@/assets/icon-plus-NW.svg";

export const AmbitionsSection = async () => {
  const t = await getTranslations("AmbitionsSection");

  const ambitions = [
    {
      icon: iconHammer,
      title: t("ambitionsList.section1.title"),
      description: t("ambitionsList.section1.description"),
    },
    {
      icon: iconLightbulb,
      title: t("ambitionsList.section2.title"),
      description: t("ambitionsList.section2.description"),
    },
    {
      icon: iconGauge,
      title: t("ambitionsList.section3.title"),
      description: t("ambitionsList.section3.description"),
    },
    {
      icon: iconFolder,
      title: t("ambitionsList.section4.title"),
      description: t("ambitionsList.section4.description"),
    },
  ];

  return (
    <section className="mx-auto max-w-page px-4 py-10.5 lg:px-[114px]">
      <div className="pl-[34px] lg:pl-0">
        <Image src={iconPlusNW} alt="" className="mb-1 -ml-[34px]" />
        <h2 className="text-[36px] leading-[46px] font-semibold text-brand">
          {t("title")}
        </h2>
      </div>
      <p className="mt-6 max-w-[860px] text-brand">{t("description")}</p>
      <ul className="mt-10.5 grid gap-x-11 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {ambitions.map(({ icon, title, description }) => (
          <li key={title}>
            <Image src={icon} alt="" className="size-12 object-scale-down" />
            <h3 className="mt-4 text-xl font-semibold text-brand">{title}</h3>
            <p className="mt-1.5 text-muted">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
