import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function Skills() {
  const { skills } = useContent()
  return (
    <section id="skills" className="py-24 bg-charcoal/40 border-y border-edge">
      <div className="container-x">
        <SectionHeading index="03" label="Tech Stack" title="Skills & Tools" />
        <div className="grid sm:grid-cols-2 gap-6">
          {skills.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 100}>
              <div className="p-6 rounded-2xl border border-edge bg-ink">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-offwhite">{group.category}</h3>
                  <span className="px-2 py-0.5 rounded bg-cyan/10 text-cyanBright text-xs font-heading">
                    {group.items.length}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg border border-edge bg-charcoal text-sm text-offwhite/80 hover:border-cyan/40 hover:text-cyanBright transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
