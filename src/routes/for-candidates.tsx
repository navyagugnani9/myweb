import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Sparkles, BadgeCheck, MessageSquare, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { submitFormNotification } from "@/lib/submit-form";

export const Route = createFileRoute("/for-candidates")({
  head: () => ({
    meta: [
      { title: "Find Education Jobs | Register as a Candidate | AcadHire" },
      { name: "description", content: "Register with AcadHire and get matched to leading schools, EdTech platforms, and education companies. Free for candidates." },
      { property: "og:title", content: "Find Education Jobs | AcadHire" },
      { property: "og:description", content: "Register as a candidate. Free, confidential, and matched to real openings." },
      { property: "og:url", content: "/for-candidates" },
    ],
    links: [{ rel: "canonical", href: "/for-candidates" }],
  }),
  component: ForCandidatesPage,
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const schema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  currentTitle: z.string().trim().min(2, "Current role is required").max(150),
  currentOrg: z.string().trim().min(2, "Current organization is required").max(150),
  experience: z.enum(["0–1", "1–3", "3–5", "5–10", "10+"]),
  expertise: z.enum(["Academic", "Leadership", "Sales & Admissions", "Operations & Success", "Other"]),
  location: z.string().trim().min(2, "Location is required").max(120),
  currentSalary: z.string().trim().min(1, "Current salary is required").max(120),
  expectedSalary: z.string().trim().min(1, "Expected salary is required").max(120),
  activelyLooking: z.enum(["Yes", "Open to Opportunities", "Not Currently"]),
  featureAsTalentCard: z.enum(["Yes", "No"], { errorMap: () => ({ message: "Please select an option" }) }),
  resume: z.any().refine((files: FileList | undefined) => files && files.length > 0, "Please upload your resume")
    .refine((files: FileList) => !files?.[0] || files[0].size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine((files: FileList) => !files?.[0] || /\.(pdf|docx?|DOCX?|PDF)$/.test(files[0].name), "PDF or DOC only"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

function ForCandidatesPage() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { message: "" } as Partial<FormValues> as FormValues });

  const onSubmit = async (values: FormValues) => {
    try {
      const resumeFile = (values.resume as FileList)?.[0] ?? null;
      await submitFormNotification({
        formType: 'Candidate Registration',
        fields: [
          { label: 'Full Name', value: values.fullName },
          { label: 'Email', value: values.email },
          { label: 'Phone', value: values.phone },
          { label: 'Current Title', value: values.currentTitle },
          { label: 'Current Organization', value: values.currentOrg },
          { label: 'Experience', value: values.experience },
          { label: 'Expertise', value: values.expertise },
          { label: 'Preferred Location', value: values.location },
          { label: 'Current Salary', value: values.currentSalary },
          { label: 'Expected Salary', value: values.expectedSalary },
          { label: 'Actively Looking', value: values.activelyLooking },
          { label: 'Feature as Anonymous Talent Card', value: values.featureAsTalentCard },
          { label: 'Resume', value: resumeFile ? resumeFile.name : '—' },
          { label: 'Message', value: values.message },
        ],
        attachment: resumeFile,
      });
      setSubmitted(true);
      toast.success("Thanks! We'll review your profile and reach out if there's a match.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-hero-navy text-white py-20">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">For Candidates</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Find Your Next Role in Education</h1>
          <p className="mt-5 text-lg text-white/80">Register with AcadHire and get matched to leading schools, EdTech platforms, and education companies.</p>
          <Button className="mt-8 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg" onClick={() => document.getElementById('candidate-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Register Now
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container-prose">
          <SectionHeading eyebrow="What you get" title="What We Offer Candidates" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Sparkles, title: "Curated Opportunities", desc: "Roles aligned to your experience, expertise, and location, not a generic job blast." },
              { icon: BadgeCheck, title: "No Cost to Candidates", desc: "AcadHire never charges candidates. Free registration, free placement, always." },
              { icon: MessageSquare, title: "Expert Guidance", desc: "Honest feedback on your profile, the role, and the organization before you interview." },
            ].map((b) => (
              <Card key={b.title} className="p-7">
                <b.icon className="h-7 w-7 text-teal" />
                <h3 className="mt-4 font-bold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-body">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="candidate-form" className="py-20 bg-surface scroll-mt-20">
        <div className="container-prose max-w-3xl">
          <SectionHeading eyebrow="Register" title="Register Your Profile" subtitle="Share your details and resume. Our team will reach out only when there's a relevant match." />

          <Card className="mt-10 p-6 md:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-cta/20 text-amber-cta">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-foreground">Thank you for registering!</h3>
                <p className="mt-3 text-body">Our team will review your profile and reach out if there's a suitable match.</p>
                <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Submit another profile</Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name" error={form.formState.errors.fullName?.message}>
                  <Input {...form.register("fullName")} placeholder="Your full name" />
                </Field>
                <Field label="Email Address" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="you@email.com" />
                </Field>
                <Field label="Phone Number" error={form.formState.errors.phone?.message}>
                  <Input type="tel" {...form.register("phone")} placeholder="+91 9876543210" />
                </Field>
                <Field label="Current Job Title / Role" error={form.formState.errors.currentTitle?.message}>
                  <Input {...form.register("currentTitle")} placeholder="e.g. Senior Physics Teacher" />
                </Field>
                <Field label="Current Organization" error={form.formState.errors.currentOrg?.message}>
                  <Input {...form.register("currentOrg")} placeholder="e.g. ABC International School" />
                </Field>
                <Field label="Years of Experience" error={form.formState.errors.experience?.message}>
                  <Select onValueChange={(v) => form.setValue("experience", v as FormValues["experience"], { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                    <SelectContent>
                      {["0–1", "1–3", "3–5", "5–10", "10+"].map((o) => <SelectItem key={o} value={o}>{o} years</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Area of Expertise" error={form.formState.errors.expertise?.message}>
                  <Select onValueChange={(v) => form.setValue("expertise", v as FormValues["expertise"], { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select expertise" /></SelectTrigger>
                    <SelectContent>
                      {["Academic", "Leadership", "Sales & Admissions", "Operations & Success", "Other"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Preferred Work Location" error={form.formState.errors.location?.message}>
                  <Input {...form.register("location")} placeholder="e.g. Bengaluru / Remote" />
                </Field>
                <Field label="Current Salary (CTC)" error={form.formState.errors.currentSalary?.message}>
                  <Input {...form.register("currentSalary")} placeholder="e.g. ₹8 LPA" />
                </Field>
                <Field label="Expected Salary (CTC)" error={form.formState.errors.expectedSalary?.message}>
                  <Input {...form.register("expectedSalary")} placeholder="e.g. ₹12 LPA" />
                </Field>


                <Field label="Are you actively looking?" error={form.formState.errors.activelyLooking?.message} className="md:col-span-2">
                  <RadioGroup
                    className="flex flex-wrap gap-4 pt-1"
                    onValueChange={(v) => form.setValue("activelyLooking", v as FormValues["activelyLooking"], { shouldValidate: true })}
                  >
                    {["Yes", "Open to Opportunities", "Not Currently"].map((o) => (
                      <label key={o} className="flex items-center gap-2 cursor-pointer text-sm text-body">
                        <RadioGroupItem value={o} /> {o}
                      </label>
                    ))}
                  </RadioGroup>
                </Field>

                <Field label="Resume (PDF or DOC, max 5MB)" error={form.formState.errors.resume?.message as string | undefined} className="md:col-span-2">
                  <Input type="file" accept=".pdf,.doc,.docx" {...form.register("resume")} />
                </Field>

                <Field label="Message / Additional Information" error={form.formState.errors.message?.message} className="md:col-span-2">
                  <Textarea rows={4} {...form.register("message")} placeholder="Share anything else we should know — notice period, expectations, etc." />
                </Field>

                <Field
                  label="Would you like AcadHire to feature your profile as an anonymous Talent Card?"
                  error={form.formState.errors.featureAsTalentCard?.message}
                  className="md:col-span-2"
                >
                  <RadioGroup
                    className="flex flex-wrap gap-4 pt-1"
                    onValueChange={(v) => form.setValue("featureAsTalentCard", v as FormValues["featureAsTalentCard"], { shouldValidate: true })}
                  >
                    {["Yes", "No"].map((o) => (
                      <label key={o} className="flex items-center gap-2 cursor-pointer text-sm text-body">
                        <RadioGroupItem value={o} /> {o}
                      </label>
                    ))}
                  </RadioGroup>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    Selected candidates may be featured anonymously on the AcadHire Talent Cards page and introduced to relevant employers. Your name, contact details and complete profile will never be shared publicly.
                  </p>
                  <Link to="/talent-cards" className="mt-2 inline-block text-xs font-semibold text-teal hover:text-navy">
                    Learn more about AcadHire Talent Cards
                  </Link>
                </Field>

                <div className="md:col-span-2">
                  <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg">
                    {form.formState.isSubmitting ? "Submitting…" : "Submit My Profile"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="container-prose">
          <SectionHeading eyebrow="Next steps" title="What Happens After You Register" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { step: 1, title: "Profile review", desc: "Our team reviews your profile against current and upcoming mandates." },
              { step: 2, title: "Conversation", desc: "If there's a fit, a consultant reaches out for a quick screening call." },
              { step: 3, title: "Interviews & Offer", desc: "We brief you, prep you, and support you through to offer and joining." },
            ].map((s) => (
              <Card key={s.step} className="p-7">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">{s.step}</div>
                <h3 className="mt-4 font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-body">{s.desc}</p>
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
