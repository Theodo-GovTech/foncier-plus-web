import { AmbitionsSection } from "@/components/AmbitionsSection";
import { SearchSection } from "@/components/SearchSection";

export default function Home() {
  return (
    <main className="flex-1">
      <SearchSection />
      <AmbitionsSection />
      {/* TEMP: scroll filler for test */}
      <div className="h-[200vh]" />
    </main>
  );
}
