import { SearchSection } from "@/components/SearchSection";
import { AmbitionsSection } from "@/components/AmbitionsSection";

export default async function Home() {
  return (
    <main className="flex-1">
      <SearchSection />
      <AmbitionsSection />
      {/* TEMP: scroll filler for test */}
      <div className="h-[200vh]" />
    </main>
  );
}
