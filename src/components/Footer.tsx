import Image from "next/image";
import logoFoncierPlusW from "@/assets/logo-foncier-plus-white.svg";
import { sections } from "./Header";

type FooterLink = { label: string; href?: string; external?: boolean };

const COPYRIGHT_DATE = 2026

const linkGroups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Plan du site",
    links: sections.map(({ id, label }) => ({ label, href: `#${id}` })),
  },
  {
    title: "Nous contacter",
    links: [
      {
        label: "72, avenue Pierre Mendès-France 75013 PARIS",
        href: "",
        external: true,
      },
      {
        label: "contact.servicefoncier@caissedesdepots.fr",
        href: "mailto:contact.servicefoncier@caissedesdepots.fr",
        external: true,
      },
    ],
  },
  {
    title: "Partenaires",
    links: [
      {
        label: "Bpifrance",
        href: "https://www.banquedesterritoires.fr/",
        external: true,
      },
      { label: "SCET", href: "https://www.scet.fr/", external: true },
    ],
  },
  {
    title: "Mentions Légales",
    links: [],
  },
];

export const Footer = () => {
  return (
    <section className="bg-brand bg-cover bg-position-[center_10%]">
      <div className="mx-auto flex max-w-page flex-col gap-35 px-4 pt-25 pb-12 text-white lg:flex-row lg:px-[114px]">
        <div className="lg:flex-6">
          <Image
            src={logoFoncierPlusW}
            alt="Foncier +"
            loading="eager"
            className="h-8 w-auto select-none"
          />
          <p className="mt-8 font-semibold lg:text-[19px]">
            L&apos;association dédiée au pilotage foncier et à
            l&apos;accompagnement des entreprises pour une croissance
            territoriale durable.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:flex-5">
          {linkGroups.map(({ title, links }) => (
            <div key={title}>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <ul className="mt-6 flex flex-col gap-3 lg:text-[15px]">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="px-4 pt-13 pb-12 text-center text-[13px] font-semibold text-white">
        © {COPYRIGHT_DATE} Foncier +. Tous droits réservés.
      </p>
    </section>
  );
};
