import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/Breadcrumb";

const ContactPage = async () => {
  const t = await getTranslations("ContactPage");

  return (
    <main className="flex-1 bg-linear-to-b from-brand/2 to-white">
      <Breadcrumb currentPage={t("title")} />
      <div className="mx-auto max-w-page px-4 py-10 lg:px-[114px]">
        <div className="bg-white p-5">
          <h1 className="text-4xl text-brand lg:text-[40px] lg:leading-[46px]">
            {t.rich("heading", {
              bold: (chunks) => <span className="font-bold">{chunks}</span>,
              line: (chunks) => <span className="block">{chunks}</span>,
            })}
          </h1>
          <p className="mt-6 text-brand">{t("subHeading")}</p>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
