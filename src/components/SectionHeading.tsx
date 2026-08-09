import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: Props) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-3xl", className)}>
      {eyebrow && (
        <div className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-teal mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{title}</h2>
      {subtitle && (
        <p className={cn("mt-5 max-w-[620px] text-base md:text-lg text-body leading-relaxed", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
