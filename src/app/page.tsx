import { AmbitionsSection } from "@/components/AmbitionsSection";
import { SearchSection } from "@/components/SearchSection";

export default function Home() {
  return (
    <main className="flex-1">
      <SearchSection />
      <AmbitionsSection />
      {/* TEMP: scroll filler to check the header shadow, don't commit. */}
      <div className="h-[200vh]" />
    </main>
  );
}
