import { getTranslations } from "next-intl/server";
import Image from "next/image";
import boxIconCompass from "@/assets/box_icon_compass.svg";
import searchSectionBg from "@/assets/search-section-bg.png";

export const searchSectionId = "recherche";

const highlights = [
  "Offres qualifiées",
  "Accompagnement dans la recherche de foncier et l'implantation",
];

export const SearchSection = async () => {
  const t = await getTranslations("SearchSection");

  return (
    <section
      id={searchSectionId}
      className="bg-brand bg-cover bg-position-[center_10%]"
      style={{ backgroundImage: `url(${searchSectionBg.src})` }}
    >
      <div className="mx-auto max-w-page px-4 pt-15 pb-12 text-white lg:px-[114px]">
        <h1 className="max-w-[860px] text-4xl font-extrabold lg:text-[66px] lg:leading-[78px]">
          {t("title")}
        </h1>
        <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2 text-base font-bold lg:text-xl"
            >
              <Image src={boxIconCompass} alt="" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
