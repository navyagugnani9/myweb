import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/openings")({
  head: () => ({
    meta: [
      { title: "Current Openings in Education | AcadHire" },
      { name: "description", content: "Browse current openings across schools, EdTech companies, and education organizations — academic, leadership, sales, and operations roles." },
      { property: "og:title", content: "Current Openings | AcadHire" },
      { property: "og:description", content: "Browse active roles across the education sector." },
      { property: "og:url", content: "/openings" },
    ],
    links: [{ rel: "canonical", href: "/openings" }],
  }),
  component: OpeningsPage,
});

function OpeningsPage() {
  return (
    <>
      <section className="bg-hero-navy text-white py-20">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Openings</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Current Openings</h1>
          <p className="mt-5 text-lg text-white/80">Browse active roles across schools, EdTech companies, and education organizations.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-prose">
          <div className="text-center py-12">
            <div className="text-lg text-body max-w-xl mx-auto space-y-4">
              <p>
                We don't list roles unless we're actively working on them. At the moment, there are no open positions on our board.
              </p>
              <p>
                If you'd like to be considered for future opportunities across schools, EdTech companies, and education organizations, register your profile with us. When a role that matches your experience comes up, we'll reach out directly.
              </p>
            </div>
            <Button asChild className="mt-8 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg">
              <Link to="/for-candidates">Submit Your Resume</Link>
            </Button>
          </div>

        </div>
      </section>
    </>
  );
}
