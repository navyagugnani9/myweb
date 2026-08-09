import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ClipboardList, Search, UserCheck, FileCheck, Handshake, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { submitFormNotification } from "@/lib/submit-form";

export const Route = createFileRoute("/for-employers")({
  head: () => ({
    meta: [
      { title: "Hire Education Talent | Submit a Requirement | AcadHire" },
      { name: "description", content: "Submit your hiring requirement and AcadHire will assess it before beginning a targeted search across academic, leadership, admissions, and operations talent." },
      { property: "og:title", content: "Hire Education Talent | AcadHire" },
      { property: "og:description", content: "Tell us what you're hiring for. AcadHire will assess the requirement before beginning the search." },
      { property: "og:url", content: "/for-employers" },
    ],
    links: [{ rel: "canonical", href: "/for-employers" }],
  }),
  component: ForEmployersPage,
});

const ENGAGEMENT_STEPS = [
  { icon: MessageSquare, title: "Requirement Discussion", desc: "We understand the position, candidate profile, compensation, location, timelines and non negotiable requirements." },
  { icon: Search, title: "Search Commencement", desc: "The search begins through relevant databases, market mapping and direct outreach." },
  { icon: FileCheck, title: "Screening and Shortlisting", desc: "Candidates are reviewed against the agreed requirement before presentation." },
  { icon: UserCheck, title: "Employer Interviews", desc: "AcadHire coordinates interviews and feedback between the employer and candidates." },
  { icon: Handshake, title: "Offer and Joining", desc: "We support communication through the offer and joining process." },
];

const schema = z.object({
  contactName: z.string().trim().min(2, "Name is required").max(120),
  organizationName: z.string().trim().min(2, "Organisation is required").max(150),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  role: z.string().trim().min(2, "Role or hiring requirement is required").max(150),
  location: z.string().trim().min(2, "Location is required").max(120),
  organizationType: z.enum(["School", "EdTech Company", "Education Company", "Other"], { errorMap: () => ({ message: "Select organization type" }) }),
  organizationTypeOther: z.string().trim().max(150).optional().or(z.literal("")),
  designation: z.string().trim().min(2, "Designation is required").max(120),
  positions: z.coerce.number().int().min(1, "At least 1 position").max(500),
  timeline: z.enum(["Immediate", "Within 30 Days", "Within 60 Days", "Within 90 Days", "Flexible"], { errorMap: () => ({ message: "Select expected timeline" }) }),
  budget: z.string().trim().min(1, "Budget / salary range is required").max(120),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
}).refine(
  (d) => d.organizationType !== "Other" || (d.organizationTypeOther && d.organizationTypeOther.trim().length >= 2),
  { message: "Please specify your organization type", path: ["organizationTypeOther"] },
);
type FormValues = z.infer<typeof schema>;

function ForEmployersPage() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { positions: 1, notes: "" } as Partial<FormValues> as FormValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await submitFormNotification({
        formType: 'Employer Requirement',
        fields: [
          { label: 'Contact Name', value: values.contactName },
          { label: 'Organization', value: values.organizationName },
          { label: 'Email', value: values.email },
          { label: 'Phone', value: values.phone },
          { label: 'Role / Hiring Requirement', value: values.role },
          { label: 'Location', value: values.location },
          { label: 'Organization Type', value: values.organizationType === 'Other' ? `Other — ${values.organizationTypeOther}` : values.organizationType },
          { label: 'Designation', value: values.designation },
          { label: 'Positions', value: values.positions },
          { label: 'Timeline', value: values.timeline },
          { label: 'Budget', value: values.budget },
          { label: 'Additional Details', value: values.notes },
        ],
      });
      setSubmitted(true);
      toast.success("Requirement submitted. We'll be in touch within 24 hours.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-hero-navy text-white section-y">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">For Employers</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Hire Talent for Your Education Organisation</h1>
          <p className="mt-5 text-lg text-white/80">Submit your requirement and our team will assess it before beginning the search.</p>
          <Button className="mt-8 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg" onClick={() => document.getElementById('requirement-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Submit a Hiring Requirement
          </Button>
        </div>
      </section>

      {/* PREFER TO TALK FIRST */}
      <section className="py-10 bg-surface border-b border-border">
        <div className="container-prose flex flex-col items-center gap-2 text-center">
          <h2 className="text-lg font-semibold text-foreground">Prefer to discuss the requirement first?</h2>
          <p className="text-sm text-body">Speak with AcadHire before submitting a detailed mandate.</p>
          <Button asChild variant="outline" className="mt-2">
            <Link to="/contact">Schedule a Hiring Discussion</Link>
          </Button>
        </div>
      </section>

      {/* HOW AN ENGAGEMENT WORKS */}
      <section className="section-y">
        <div className="container-prose">
          <SectionHeading eyebrow="How it works" title="How an Engagement Works" />
          <div className="mt-16 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {ENGAGEMENT_STEPS.map((s, i) => (
              <Card key={s.title} className="p-6">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">{i + 1}</div>
                <s.icon className="mt-4 h-6 w-6 text-teal" />
                <h3 className="mt-3 font-bold text-foreground text-sm">{s.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="requirement-form" className="section-y bg-surface scroll-mt-20">
        <div className="container-prose max-w-3xl">
          <SectionHeading eyebrow="Submit a requirement" title="Tell Us About the Role" subtitle="We'll respond within 24 hours with next steps. The form takes under a minute." />

          <Card className="mt-10 p-6 md:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-cta/20 text-amber-cta">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-foreground">Thank you!</h3>
                <p className="mt-3 text-body">We've received your requirement and will be in touch within 24 hours.</p>
                <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Submit another requirement</Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
                <Field label="Name" error={form.formState.errors.contactName?.message}>
                  <Input {...form.register("contactName")} placeholder="Your full name" />
                </Field>
                <Field label="Organisation" error={form.formState.errors.organizationName?.message}>
                  <Input {...form.register("organizationName")} placeholder="e.g. Orchid International School" />
                </Field>
                <Field label="Work Email" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="you@organization.com" />
                </Field>
                <Field label="Phone" error={form.formState.errors.phone?.message}>
                  <Input type="tel" {...form.register("phone")} placeholder="+91 9876543210" />
                </Field>
                <Field label="Role or Hiring Requirement" error={form.formState.errors.role?.message}>
                  <Input {...form.register("role")} placeholder="e.g. Academic Head" />
                </Field>
                <Field label="Location" error={form.formState.errors.location?.message}>
                  <Input {...form.register("location")} placeholder="e.g. Bengaluru" />
                </Field>
                <Field label="Type of Organization" error={form.formState.errors.organizationType?.message}>
                  <Select onValueChange={(v) => form.setValue("organizationType", v as FormValues["organizationType"], { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {["School", "EdTech Company", "Education Company", "Other"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                {form.watch("organizationType") === "Other" && (
                  <Field label="Please specify" error={form.formState.errors.organizationTypeOther?.message} className="md:col-span-2">
                    <Input {...form.register("organizationTypeOther")} placeholder="Describe your organization type" />
                  </Field>
                )}
                <Field label="Your Designation" error={form.formState.errors.designation?.message}>
                  <Input {...form.register("designation")} placeholder="e.g. HR Head" />
                </Field>
                <Field label="Number of Positions" error={form.formState.errors.positions?.message}>
                  <Input type="number" min={1} {...form.register("positions")} />
                </Field>
                <Field label="Expected Timeline" error={form.formState.errors.timeline?.message}>
                  <Select onValueChange={(v) => form.setValue("timeline", v as FormValues["timeline"], { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                    <SelectContent>
                      {["Immediate", "Within 30 Days", "Within 60 Days", "Within 90 Days", "Flexible"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Budget / Salary Range" error={form.formState.errors.budget?.message}>
                  <Input {...form.register("budget")} placeholder="e.g. ₹12–18 LPA" />
                </Field>

                <Field label="Additional Details (Optional)" error={form.formState.errors.notes?.message} className="md:col-span-2">
                  <Textarea rows={4} {...form.register("notes")} placeholder="Share any context — required experience, must-haves, etc." />
                </Field>

                <div className="md:col-span-2">
                  <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg">
                    {form.formState.isSubmitting ? "Submitting…" : "Submit Hiring Requirement"}
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                    Commercial terms, search scope and replacement provisions are agreed before commencement of each mandate, so both parties have clarity on the engagement from the outset.
                  </p>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-prose">
          <SectionHeading eyebrow="Why AcadHire" title="Why Employers Work With Us" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ClipboardList, title: "Sector specialists", desc: "Education only. No generalist guesswork." },
              { icon: Search, title: "Active search", desc: "Database sourcing, market mapping and direct outreach beyond job portals." },
              { icon: FileCheck, title: "Assessed shortlists", desc: "Profiles reviewed against your requirement before you see them." },
              { icon: Handshake, title: "Support through joining", desc: "Interview coordination, feedback and offer support included." },
            ].map((b) => (
              <Card key={b.title} className="p-6">
                <b.icon className="h-6 w-6 text-teal" />
                <h3 className="mt-4 font-bold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-body">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
