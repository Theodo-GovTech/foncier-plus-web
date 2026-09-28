import Image from "next/image";
import iconExternalLink from "@/assets/icon-external-link.svg";
import logoFoncierPlusW from "@/assets/logo-foncier-plus-white.svg";
import { sections } from "./Header";

type FooterLink = { label: string; href?: string; external?: boolean };

const COPYRIGHT_DATE = 2026;
const EXTERNAL_LINK_ICON = `url(${iconExternalLink.src})`;

const linkGroups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Plan du site",
    links: sections.map(({ id, label }) => ({ label, href: `#${id}` })),
  },
  {
    title: "Nous contacter",
    links: [
      { label: "72, avenue Pierre Mendès-France 75013 PARIS" },
      {
        label: "contact.servicefoncier@caissedesdepots.fr",
        href: "mailto:contact.servicefoncier@caissedesdepots.fr",
      },
    ],
  },
  {
    title: "Partenaires",
    links: [
      {
        label: "Banque des Territoires",
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
              <h2 className="text-2xl font-bold">{title}</h2>
              <ul className="mt-6 flex flex-col gap-3 lg:text-[15px] font-semibold">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 transition-colors hover:text-white-hover"
                    >
                      {label}
                      {/* If link is external, put EXTERNAL_LINK_ICON next to it
                          Icon match the text and hover */}
                      {external && (
                        <span
                          role="img"
                          aria-label="Nouvel onglet"
                          className="size-[15px] shrink-0 bg-current mask-contain mask-center mask-no-repeat"
                          style={{
                            WebkitMaskImage: EXTERNAL_LINK_ICON,
                            maskImage: EXTERNAL_LINK_ICON,
                          }}
                        />
                      )}
                    </a>
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
