import Image from "next/image";
import Link from "next/link";
import logoFoncierPlus from "@/assets/logo-foncier-plus.svg";
import { NavButton } from "@/components/NavButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex min-h-16 max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3">
        <Link href="/">
          <Image
            src={logoFoncierPlus}
            alt="Foncier +"
            loading="eager"
            className="h-9 w-auto"
          />
        </Link>
        <nav
          aria-label="Navigation principale"
          className="flex flex-wrap items-center gap-2"
        >
          <NavButton href="/" variant="solid" aria-current="page">
            Entreprise
          </NavButton>
          <NavButton
            href="https://www.banquedesterritoires.fr"
            external
            variant="outline"
          >
            Collectivité
          </NavButton>
          <NavButton variant="accent">Nous contacter</NavButton>
        </nav>
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto h-px w-rule bg-line" />
      </div>
    </header>
  );
}
