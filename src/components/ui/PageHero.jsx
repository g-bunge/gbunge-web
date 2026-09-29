import Lines from './Lines.jsx'

/**
 * Full-bleed photo header for sub-pages. `title` may be a string or an array of lines.
 * `focus` is the photo's object-position, for pictures whose subject isn't centred (e.g. '50% 75%').
 */
export default function PageHero({ eyebrow, title, lead, img, alt, focus }) {
  return (
    <header
      id="top"
      className="relative h-[clamp(480px,82vh,860px)] overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgb(0_0_0/0.55),transparent_65%),linear-gradient(rgb(0_0_0/0.25),transparent_30%,transparent_55%,var(--color-bg))] mobile:h-[78vh]"
    >
      {/* the gradient above darkens the left for the copy and fades the bottom into the page */}
      <img className="size-full animate-page-hero-zoom object-cover" style={{ objectPosition: focus }} src={img} alt={alt} />
      <div className="absolute inset-x-gutter bottom-18 z-1 max-w-190 animate-page-hero-rise mobile:bottom-12">
        {/* eyebrow with a short brand rule in front */}
        <p className="t-eyebrow mb-5 flex items-center gap-3 tracking-label before:h-0.5 before:w-8 before:bg-brand-gradient">{eyebrow}</p>
        <h1 className="font-display text-hero leading-none font-semibold tracking-tighter">
          <Lines lines={title} />
        </h1>
        {lead && <p className="mt-7 max-w-130 text-body text-fg-body break-keep mobile:mt-5">{lead}</p>}
      </div>
    </header>
  )
}
