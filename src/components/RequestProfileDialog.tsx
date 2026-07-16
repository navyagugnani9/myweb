import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { submitTalentCardRequest } from "@/lib/submit-talent-card-request";
import type { TalentCardData } from "@/lib/talent-cards";

const ORG_TYPES = ["School", "EdTech Company", "Education Company", "University / Higher Education", "Training Institute", "Education Consultancy", "Other"] as const;
const TIMELINES = ["Immediate", "Within 30 Days", "Within 60 Days", "Within 90 Days", "Flexible"] as const;

const schema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  organizationName: z.string().trim().min(2, "Organisation name is required").max(150),
  designation: z.string().trim().max(120).optional().or(z.literal("")),
  workEmail: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  organizationType: z.enum(ORG_TYPES, { errorMap: () => ({ message: "Select organisation type" }) }),
  roleConsidered: z.string().trim().min(2, "Role being considered is required").max(150),
  hiringLocation: z.string().trim().max(120).optional().or(z.literal("")),
  salaryRange: z.string().trim().max(120).optional().or(z.literal("")),
  joiningTimeline: z.enum(TIMELINES).optional(),
  requirementDetails: z.string().trim().min(10, "Please share a few details about your requirement").max(3000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm to continue" }) }),
  website: z.string().max(0).optional(),
});
type FormValues = z.infer<typeof schema>;

interface Props {
  card: TalentCardData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestProfileDialog({ card, open, onOpenChange }: Props) {
  const renderedAtRef = useRef(Date.now());
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { website: "" } as Partial<FormValues> as FormValues,
  });

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (next) renderedAtRef.current = Date.now();
    if (!next) {
      setTimeout(() => {
        form.reset({ website: "" } as Partial<FormValues> as FormValues);
      }, 200);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!card) return;
    try {
      await submitTalentCardRequest({
        candidateId: card.candidateId,
        fullName: values.fullName,
        organizationName: values.organizationName,
        designation: values.designation,
        workEmail: values.workEmail,
        phone: values.phone,
        organizationType: values.organizationType,
        roleConsidered: values.roleConsidered,
        hiringLocation: values.hiringLocation,
        salaryRange: values.salaryRange,
        joiningTimeline: values.joiningTimeline,
        requirementDetails: values.requirementDetails,
        consent: values.consent,
        website: values.website,
        formRenderedAt: renderedAtRef.current,
      });
      handleOpenChange(false);
      toast.success(
        "Thank you for your interest. Your request has been received. Our team will review your requirement, obtain the candidate's consent and get in touch with you shortly.",
      );
    } catch {
      form.setError("root", { message: "Something went wrong. Please try again." });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request the Complete Profile</DialogTitle>
          <DialogDescription>
            Tell us about your organisation and hiring requirement. AcadHire will review your request, confirm the candidate's interest and coordinate the introduction.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              {/* Honeypot — hidden from real users, catches basic bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
                {...form.register("website")}
              />

              <Field label="Candidate ID">
                <Input value={card?.candidateId ?? ""} readOnly disabled className="bg-surface" />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" error={form.formState.errors.fullName?.message}>
                  <Input {...form.register("fullName")} placeholder="Your full name" />
                </Field>
                <Field label="Organisation Name" error={form.formState.errors.organizationName?.message}>
                  <Input {...form.register("organizationName")} placeholder="e.g. Orchid International School" />
                </Field>
                <Field label="Designation" error={form.formState.errors.designation?.message}>
                  <Input {...form.register("designation")} placeholder="e.g. HR Head" />
                </Field>
                <Field label="Official Work Email" error={form.formState.errors.workEmail?.message}>
                  <Input type="email" {...form.register("workEmail")} placeholder="you@organization.com" />
                </Field>
                <Field label="Phone Number" error={form.formState.errors.phone?.message}>
                  <Input type="tel" {...form.register("phone")} placeholder="+91 9876543210" />
                </Field>
                <Field label="Organisation Type" error={form.formState.errors.organizationType?.message}>
                  <Select onValueChange={(v) => form.setValue("organizationType", v as FormValues["organizationType"], { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {ORG_TYPES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Role Being Considered" error={form.formState.errors.roleConsidered?.message}>
                  <Input {...form.register("roleConsidered")} placeholder="e.g. Admissions Manager" />
                </Field>
                <Field label="Hiring Location" error={form.formState.errors.hiringLocation?.message}>
                  <Input {...form.register("hiringLocation")} placeholder="e.g. Pune" />
                </Field>
                <Field label="Salary Range for the Role" error={form.formState.errors.salaryRange?.message}>
                  <Input {...form.register("salaryRange")} placeholder="e.g. ₹10–14 LPA" />
                </Field>
                <Field label="Expected Joining Timeline" error={form.formState.errors.joiningTimeline?.message}>
                  <Select onValueChange={(v) => form.setValue("joiningTimeline", v as FormValues["joiningTimeline"], { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                    <SelectContent>
                      {TIMELINES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field label="Requirement Details" error={form.formState.errors.requirementDetails?.message}>
                <Textarea rows={4} {...form.register("requirementDetails")} placeholder="Tell us about the role, team, and what makes this candidate a potential fit." />
              </Field>

              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="consent"
                  className="mt-0.5"
                  onCheckedChange={(v) => form.setValue("consent", v === true as true, { shouldValidate: true })}
                />
                <Label htmlFor="consent" className="text-sm font-normal leading-snug text-body cursor-pointer">
                  I confirm that the information provided is accurate and that I am authorised to discuss hiring requirements on behalf of this organisation.
                </Label>
              </div>
              {form.formState.errors.consent && (
                <p className="-mt-2 text-xs text-destructive">{form.formState.errors.consent.message}</p>
              )}

              {form.formState.errors.root && (
                <p className="text-xs text-destructive">{form.formState.errors.root.message}</p>
              )}

              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground" size="lg">
                {form.formState.isSubmitting ? "Submitting…" : "Submit Request"}
              </Button>
        </form>
      </DialogContent>
    </Dialog>
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
