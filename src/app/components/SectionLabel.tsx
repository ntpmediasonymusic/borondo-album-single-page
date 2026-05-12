interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export function SectionLabel({ children, light = false, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`block text-base tracking-[0.25em] uppercase mb-4 ${
        light ? "text-white/75" : "text-[#3d3d3d]"
      } ${className}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  light?: boolean;
  align?: "left" | "center";
}

export function SectionHeader({ label, title, light = false, align = "left" }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : ""}`}>
      {label && <SectionLabel light={light}>{label}</SectionLabel>}
      <div className={`h-px w-full mb-8 ${light ? "bg-white/15" : "bg-black/10"}`} />
      <h2
        className={`${light ? "text-white" : "text-black"}`}
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h2>
    </div>
  );
}