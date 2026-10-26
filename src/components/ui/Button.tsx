import Link from "next/link";

type Variant = "primary" | "outline" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-primary text-primary hover:bg-primary/5",
  /** Cream pill for use on the green brand background. */
  light: "bg-primary-foreground text-primary hover:opacity-90",
};

export const buttonClass = (variant: Variant = "primary") =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`;

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}
