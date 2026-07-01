import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CTAStrip() {
  return (
    <section className="bg-hero-navy text-white">
      <div className="container-prose py-16 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl p-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Looking to Hire?</h3>
          <p className="mt-3 text-white/80">Submit your requirement and get shortlisted profiles in 5–7 days.</p>
          <Button asChild className="mt-6 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
            <Link to="/for-employers">Hire Talent Now</Link>
          </Button>
        </div>
        <div className="rounded-2xl p-2 md:border-l md:border-white/10 md:pl-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Looking for a Job?</h3>
          <p className="mt-3 text-white/80">Register with us and get matched to top education employers.</p>
          <Button asChild variant="outline" className="mt-6 border-white hover:bg-white hover:text-navy text-slate-800">
            <Link to="/for-candidates">Register as Candidate</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
