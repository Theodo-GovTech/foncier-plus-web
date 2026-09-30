import { getTranslations } from "next-intl/server";
import Image from "next/image";
import businessSectorPathImage from "@/assets/business-sector-path-image.png";

export const businessSectorsPathSectionId = "parcourssecteur";

export const BusinessSectorsPathSection = async () => {
  const t = await getTranslations("BusinessSectorsPathSection");

  return (
    <section id={businessSectorsPathSectionId} className="mx-auto flex max-w-page flex-col gap-10 px-4 py-20 lg:flex-row lg:items-center lg:gap-20 lg:px-[114px]">
      <div className="lg:flex-7">
        <h2 className="text-4xl font-semibold text-brand lg:text-[40px] lg:leading-[46px]">
          {t.rich("title", {
            bold: (chunks) => <span className="font-bold">{chunks}</span>,
            line: (chunks) => <span className="block">{chunks}</span>,
          })}
        </h2>
        <p className="mt-6 text-brand">{t("description")}</p>
      </div>
      <div className="lg:flex-5">
        <Image src={businessSectorPathImage} alt="" />
      </div>
    </section>
  );
};
