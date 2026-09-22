import Image from "next/image";
import Link from "next/link";
import logoFoncierPlus from "@/assets/logo-foncier-plus.svg";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-16 max-w-page items-center px-4">
        <Link href="/">
          <Image
            src={logoFoncierPlus}
            alt="Foncier +"
            loading="eager"
            className="h-9 w-auto"
          />
        </Link>
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto h-px w-rule bg-line" />
      </div>
    </header>
  );
}
