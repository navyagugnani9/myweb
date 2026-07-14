import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { LogoMark, LogoWordmark } from "@/components/Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/for-employers", label: "For Employers" },
  { to: "/for-candidates", label: "For Candidates" },
  { to: "/openings", label: "Current Openings" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground/90 mt-20">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2.5 rounded-lg bg-white px-3 py-2">
            <LogoMark className="h-8 w-8" variant="light" />
            <LogoWordmark className="text-2xl" variant="light" />
          </Link>
          <p className="mt-4 text-sm text-white/70">
            Specialist recruitment for the education sector
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/75 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>recruitment@acadhire.co.in</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><a href="tel:+918950504713" className="hover:text-white transition-colors">+91 89505 04713</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>New Delhi, India</span></li>
            <li className="flex items-center gap-2"><Linkedin className="h-4 w-4" /><a href="https://www.linkedin.com/company/acadhirerecruitments/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>

        <div>
          <p className="mt-6 text-xs text-white/60">Specialist Recruitment for the Education Sector</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-prose py-5 text-xs text-white/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 AcadHire. All rights reserved.</span>
          <span></span>
        </div>
      </div>
    </footer>
  );
}
