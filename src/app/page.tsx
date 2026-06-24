import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#faf8f3]">
        <Hero />
        <Features />
      </main>
    </>
  );
}
