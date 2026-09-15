import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

const typeColor = {
  'Freelance / Project': 'bg-cyan/10 text-cyanBright border-cyan/20',
  Academic: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  Organizational: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
}

export default function Experience() {
  const { experiences } = useContent()
  return (
    <section id="experience" className="py-24 bg-charcoal/40 border-y border-edge">
      <div className="container-x">
        <SectionHeading index="05" label="Experience" title="Experience & Organization" />
        <div className="relative pl-6 sm:pl-8 border-l border-edge space-y-10">
          {experiences.map((e, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative">
                <span className="absolute -left-6 sm:-left-8 top-1.5 w-3 h-3 rounded-full bg-cyan ring-4 ring-cyan/20 -translate-x-1/2" />
                <div className="rounded-2xl border border-edge bg-ink p-6 hover:border-cyan/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-offwhite">{e.role}</h3>
                      <p className="text-sm text-cyanBright mt-0.5">{e.org}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-heading ${typeColor[e.type] || 'bg-white/5 text-muted border-edge'}`}>
                        {e.type}
                      </span>
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Icon name="calendar" size={13} /> {e.period}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
