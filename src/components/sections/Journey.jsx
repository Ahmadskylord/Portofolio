import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function Journey() {
  const { journey } = useContent()
  return (
    <section id="journey" className="py-24">
      <div className="container-x">
        <SectionHeading index="08" label="My Journey" title="From Learning to Building" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {journey.map((j, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative p-6 rounded-2xl border border-edge bg-charcoal h-full">
                <span className="font-display text-4xl text-cyan/50">{j.year}</span>
                <div className="absolute top-0 left-6 w-8 h-px bg-cyan/40" />
                <h3 className="mt-4 font-heading font-semibold text-offwhite">{j.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{j.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
