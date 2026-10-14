import Image from "next/image";

// Concept B signature shape: an image inside a tall arch (rounded top),
// echoing tropical doorways. Fills the width of its parent.
export function Arch({
  src,
  alt,
  sizes,
  position = "center",
  className = "",
  preload = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** CSS object-position, e.g. "80% 75%". */
  position?: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={`relative aspect-[3/4] overflow-hidden rounded-t-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
