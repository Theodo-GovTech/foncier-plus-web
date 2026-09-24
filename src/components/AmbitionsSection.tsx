import Image from "next/image";
import iconFolder from "@/assets/icon-folder.svg";
import iconGauge from "@/assets/icon-gauge.svg";
import iconHammer from "@/assets/icon-hammer.svg";
import iconLightbulb from "@/assets/icon-lightbulb.svg";
import iconPlusNW from "@/assets/icon-plus-NW.svg";

const ambitions = [
  {
    icon: iconHammer,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
  {
    icon: iconLightbulb,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer",
  },
  {
    icon: iconGauge,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
  {
    icon: iconFolder,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
];

export const AmbitionsSection = () => {
  return (
    <section className="mx-auto max-w-page px-4 py-10.5 lg:px-[114px]">
      {/* The icon hangs top-left of the title's first letter at every width
          (30px wide + 4px gap). The left gutter hosts it on desktop, but is too
          narrow on mobile: the title is indented there to make room. */}
      <div className="pl-[34px] lg:pl-0">
        <Image src={iconPlusNW} alt="" className="mb-1 -ml-[34px]" />
        <h2 className="text-[40px] leading-[46px] font-semibold text-brand">
          Être le facilitateur public de vos projets
        </h2>
      </div>
      <p className="mt-6 max-w-[860px] text-brand">
        Foncier + est un regroupement ... Lorem ipsum sit amte, consectur
        adipiscing elit, sed eiusmod tempor incididunt ut alobre et dolore magna
        aliqua.
      </p>
      <ul className="mt-10.5 grid gap-x-11 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {/* Keyed by icon: the placeholder titles aren't unique yet. */}
        {ambitions.map(({ icon, title, description }) => (
          <li key={icon.src}>
            {/* Icons keep their own size, centered in a shared 48px box. */}
            <Image src={icon} alt="" className="size-12 object-scale-down" />
            <h3 className="mt-4 text-xl font-semibold text-brand">{title}</h3>
            <p className="mt-1.5 text-muted">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
