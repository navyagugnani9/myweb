import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react";
import { LogoMark, LogoWordmark } from "@/components/Logo";

const WHATSAPP_URL = `https://wa.me/918950504713?text=${encodeURIComponent(
  "Hi AcadHire! I have an inquiry regarding your recruitment services and would like to discuss my hiring requirements. Could you please share more information about how AcadHire can support us?",
)}`;

const SERVICES = [
  { to: "/services", hash: "leadership", label: "Leadership and Senior Search" },
  { to: "/services", hash: "academic", label: "Academic and Teaching Recruitment" },
  { to: "/services", hash: "admissions", label: "Admissions, Counselling and Growth" },
  { to: "/services", hash: "operations", label: "Operations and Functional Recruitment" },
] as const;

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

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground/90 border-t border-white/10">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5 rounded-lg bg-white px-3 py-2">
            <LogoMark className="h-8 w-8" variant="light" />
            <LogoWordmark className="text-2xl" variant="light" />
          </Link>
          <p className="mt-5 text-sm text-white/70 max-w-[280px] leading-relaxed">
            Specialist recruitment for the education sector – helping schools and education organisations identify, assess and hire talent across India.
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-amber-cta">
            Specialist. Confidential. Sector-Focused.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.label}>
                <Link to={s.to} hash={s.hash} className="text-white/75 hover:text-white hover:underline underline-offset-4 transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/75 hover:text-white hover:underline underline-offset-4 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><a href="mailto:recruitment@acadhire.co.in" className="hover:text-white hover:underline underline-offset-4 transition-colors">recruitment@acadhire.co.in</a></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><a href="tel:+918950504713" className="hover:text-white hover:underline underline-offset-4 transition-colors">+91 89505 04713</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline underline-offset-4 transition-colors">+91 89505 04713</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>New Delhi, India</span></li>
            <li className="flex items-center gap-2"><Linkedin className="h-4 w-4" /><a href="https://www.linkedin.com/company/acadhirerecruitments/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline underline-offset-4 transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-prose py-5 text-xs text-white/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 AcadHire. All rights reserved.</span>
          <span>A division of SRInsights India Private Limited.</span>
        </div>
      </div>
    </footer>
  );
}
