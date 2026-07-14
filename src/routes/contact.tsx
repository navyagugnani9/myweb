import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, UserCheck, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { submitFormNotification } from "@/lib/submit-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | AcadHire" },
      { name: "description", content: "Get in touch with AcadHire. Whether you're hiring or job-seeking in the education sector, we'd love to hear from you." },
      { property: "og:title", content: "Contact Us | AcadHire" },
      { property: "og:description", content: "Talk to our team about hiring or your next role in education." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  iAm: z.enum(["Employer", "Candidate", "Other"]),
  message: z.string().trim().min(10, "Please share a brief message").max(2000),
});
type FormValues = z.infer<typeof schema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await submitFormNotification({
        formType: 'Contact',
        fields: [
          { label: 'Name', value: values.name },
          { label: 'Email', value: values.email },
          { label: 'Phone', value: values.phone },
          { label: 'I am a', value: values.iAm },
          { label: 'Message', value: values.message },
        ],
      });
      setSubmitted(true);
      toast.success("Message sent. We'll get back to you shortly.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-hero-navy text-white py-20">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Contact</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Get in Touch</h1>
          <p className="mt-5 text-lg text-white/80">Whether you're hiring or job-seeking, we'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-prose grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reach Us Directly</h2>
            <p className="mt-3 text-body">Prefer email? Use any of the channels below.</p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "recruitment@acadhire.co.in" },
                { icon: Phone, label: "Phone", value: "+91 89505 04713", href: "tel:+918950504713" },
                { icon: MapPin, label: "City", value: "New Delhi, India" },
                { icon: Clock, label: "Office Hours", value: "Monday – Saturday · 9 AM – 6 PM IST" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/company/acadhirerecruitments", href: "https://www.linkedin.com/company/acadhirerecruitments/" },
              ].map((it) => (
                <div key={it.label} className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{it.label}</p>
                    {it.href ? (
                      <a href={it.href} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-teal hover:underline">
                        {it.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{it.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-cta/20 text-amber-cta">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-foreground">Message received</h3>
                <p className="mt-3 text-body">Thanks for reaching out. We'll get back to you shortly.</p>
                <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Send another message</Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <Field label="Name" error={form.formState.errors.name?.message}>
                  <Input {...form.register("name")} placeholder="Your full name" />
                </Field>
                <Field label="Email" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="you@email.com" />
                </Field>
                <Field label="Phone" error={form.formState.errors.phone?.message}>
                  <Input type="tel" {...form.register("phone")} placeholder="+91 9876543210" />
                </Field>
                <Field label="I am a" error={form.formState.errors.iAm?.message}>
                  <RadioGroup
                    className="flex flex-wrap gap-4 pt-1"
                    onValueChange={(v) => form.setValue("iAm", v as FormValues["iAm"], { shouldValidate: true })}
                  >
                    {["Employer", "Candidate", "Other"].map((o) => (
                      <label key={o} className="flex items-center gap-2 cursor-pointer text-sm text-body">
                        <RadioGroupItem value={o} /> {o}
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
                <Field label="Message" error={form.formState.errors.message?.message}>
                  <Textarea rows={5} {...form.register("message")} placeholder="Tell us a little about what you need." />
                </Field>
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg">
                  {form.formState.isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
