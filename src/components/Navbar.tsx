import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark, LogoWordmark } from "@/components/Logo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/for-employers", label: "For Employers" },
  { to: "/for-candidates", label: "For Candidates" },
  { to: "/talent-cards", label: "Talent Cards" },
  { to: "/openings", label: "Current Openings" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled ? "bg-background/95 backdrop-blur shadow-sm border-b border-border" : "bg-background border-b border-transparent",
      )}
    >
      <div className="container-prose flex h-16 items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LogoMark className="h-8 w-8" variant="light" />
          <LogoWordmark className="text-2xl" variant="light" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-navy transition-colors"
              activeProps={{ className: "text-navy font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="default" className="bg-navy hover:bg-navy/90 text-navy-foreground">
            <Link to="/for-employers">Hire Talent</Link>
          </Button>
          <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-navy-foreground">
            <Link to="/for-candidates">Find a Job</Link>
          </Button>
          <Link
            to="/pick-your-mood"
            className="ml-1 text-xs text-muted-foreground hover:text-teal transition-colors whitespace-nowrap"
          >
            🎭 Pick Your Mood
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-navy"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-prose flex flex-col py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-foreground/85 hover:text-navy"
                activeProps={{ className: "text-navy font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild className="bg-navy hover:bg-navy/90 text-navy-foreground">
                <Link to="/for-employers" onClick={() => setOpen(false)}>Hire Talent</Link>
              </Button>
              <Button asChild variant="outline" className="border-navy text-navy">
                <Link to="/for-candidates" onClick={() => setOpen(false)}>Find a Job</Link>
              </Button>
              <Link
                to="/pick-your-mood"
                onClick={() => setOpen(false)}
                className="text-center text-xs text-muted-foreground hover:text-teal transition-colors"
              >
                🎭 Pick Your Mood
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
