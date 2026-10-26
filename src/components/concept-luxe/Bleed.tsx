import Image from "next/image";

// Concept C building block: a photo that bleeds to one edge of the screen on
// desktop (half the section's width, full height) and sits as a bounded block
// above/below the copy on mobile. Place inside a `relative` section.
export function BleedImage({
  src,
  alt,
  side,
  position = "center",
  preload = false,
  mobileAspect = "portrait",
}: {
  src: string;
  alt: string;
  side: "left" | "right";
  position?: string;
  preload?: boolean;
  mobileAspect?: "portrait" | "landscape";
}) {
  return (
    <div
      className={`relative ${mobileAspect === "landscape" ? "aspect-[5/4] max-h-[28rem]" : "aspect-[4/5] max-h-[30rem]"} sm:max-h-[36rem] md:absolute md:inset-y-0 md:aspect-auto md:max-h-none md:w-1/2 ${
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
