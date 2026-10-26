import Link from "next/link";

const tones = {
  light: "text-primary",
  dark: "text-primary-foreground",
};

/** Quiet text link: hairline underline that darkens + arrow that nudges on hover. */
export function TextLink({
  href,
  children,
  className = "",
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** "dark" for use on the green brand background. */
  tone?: keyof typeof tones;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 text-sm font-medium sm:min-h-0 ${tones[tone]} ${className}`}
    >
      <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">
        {children}
      </span>
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
