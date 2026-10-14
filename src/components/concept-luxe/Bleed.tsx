import Image from "next/image";

// Concept C building block: a photo that bleeds to one edge of the screen on
// desktop (half the section's width, full height) and sits as a tall block
// above/below the copy on mobile. Place inside a `relative` section.
export function BleedImage({
  src,
  alt,
  side,
  position = "center",
  preload = false,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
  position?: string;
  preload?: boolean;
}) {
  return (
    <div
      className={`relative h-[70svh] max-h-[40rem] md:absolute md:inset-y-0 md:h-auto md:max-h-none md:w-1/2 ${
        side === "right" ? "md:right-0" : "md:left-0"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        preload={preload}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/** Small gold caps label used above headings in concept C. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-medium uppercase tracking-[0.35em] text-accent ${className}`}>{children}</p>
  );
}
