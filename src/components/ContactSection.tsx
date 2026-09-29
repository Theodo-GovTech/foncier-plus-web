import { getTranslations } from "next-intl/server";
import Image from "next/image";
import iconLock from "@/assets/icon-lock.svg";
import { NavButton } from "@/components/NavButton";

export const ContactSection = async () => {
  const t = await getTranslations("ContactSection");

  return (
    <section className="bg-linear-to-b from-brand/2 to-white">
      <div className="mx-auto max-w-page px-4 py-10 lg:px-[114px]">
        <div className="bg-white p-5">
          <h2 className="text-4xl text-brand lg:text-[40px] lg:leading-[46px]">
            {t.rich("title", {
              bold: (chunks) => <span className="font-bold">{chunks}</span>,
              line: (chunks) => <span className="block">{chunks}</span>,
            })}
          </h2>
          <p className="mt-6 text-brand">{t("description")}</p>
          <div className="mt-10">
            <NavButton href="/contact" variant="accent" size="lg">
              {t("cta")}
            </NavButton>
          </div>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[15px] text-brand">
          <Image src={iconLock} alt="" />
          {t("reassurance")}
        </p>
      </div>
    </section>
  );
};
