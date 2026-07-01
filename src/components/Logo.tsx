type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

// Icon-only mortarboard mark from the AcadHire brand sheet.
// On light variant, the cap is navy; on dark variant, the cap is white.
// The tassel is always amber.
export function LogoMark({ className, variant = "light" }: LogoProps) {
  const capColor = variant === "dark" ? "#FFFFFF" : "#1B2B5E";
  return (
    <svg
      viewBox="0 0 48 56"
      className={className}
      role="img"
      aria-label="AcadHire"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="24,4 46,15 24,26 2,15" fill={capColor} />
      <rect x="9" y="22" width="30" height="13" rx="2.5" fill={capColor} />
      <line
        x1="42"
        y1="15"
        x2="42"
        y2="33"
        stroke="#F5A623"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="42" cy="36" r="3.2" fill="#F5A623" />
    </svg>
  );
}

export function LogoWordmark({
  className,
  variant = "light",
}: LogoProps) {
  const primary = variant === "dark" ? "#FFFFFF" : "#1B2B5E";
  const accent = variant === "dark" ? "#F5A623" : "#2A7FBA";
  return (
    <span
      className={className}
      style={{
        fontFamily: "Georgia, serif",
        fontWeight: 700,
        letterSpacing: "-0.5px",
        color: primary,
      }}
    >
      Acad<span style={{ color: accent }}>Hire</span>
    </span>
  );
}
