import { AmbitionsSection } from "@/components/AmbitionsSection";
import { SearchSection } from "@/components/SearchSection";

export default function Home() {
  return (
    <main className="flex-1">
      <SearchSection />
      <AmbitionsSection />
    </main>
  );
}
