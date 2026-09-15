import Reveal from './Reveal'

export default function SectionHeading({ index, label, title, sub }) {
  return (
    <Reveal>
      <div className="mb-12">
        <p className="font-heading text-xs font-semibold text-cyanBright uppercase tracking-[0.25em]">
          {index} — {label}
        </p>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl text-offwhite">{title}</h2>
        {sub && <p className="mt-3 max-w-2xl text-muted">{sub}</p>}
      </div>
    </Reveal>
  )
}
