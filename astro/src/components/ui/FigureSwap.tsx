type Props = {
  baseSrc: string;
  hoverSrc: string;
  alt: string;
  caption?: string;
};

export default function FigureSwap({ baseSrc, hoverSrc, alt, caption }: Props) {
  return (
    <figure className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
        <img src={baseSrc} alt={alt} className="h-full w-full object-cover" />
        <img
          src={hoverSrc}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-300 group-hover:opacity-100"
        />
        {caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-3 text-xs text-white opacity-0 transition duration-300 group-hover:opacity-100">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
