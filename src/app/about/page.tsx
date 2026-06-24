import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-olive text-sm font-medium">About</p>
          <h1 className="font-display text-ink mt-1 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            Learning is a path, not a list.
          </h1>
          <div className="text-ink/70 mt-8 space-y-6 text-lg leading-relaxed">
            <p>
              Most learning resources hand you a flat checklist. But knowledge
              isn’t flat — topics branch, depend on each other, and connect in
              ways a list can’t show.
            </p>
            <p>
              MapYourRoad turns any subject into a living map. Each topic is a
              node, each dependency an edge, laid out on an infinite canvas you
              can build, track, and share — whether you’re learning frontend,
              machine learning, system design, or charting your own research.
            </p>
            <p>
              Mark nodes as you master them and watch your road light up. The
              goal is simple: make the shape of what you’re learning visible.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="sb-border sb-shadow bg-olive text-cream hover:bg-olive-deep mt-10 rounded-xl"
          >
            <Link href="/register">Start your map</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
