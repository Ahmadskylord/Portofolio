import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function Education() {
  const { educations } = useContent()
  const edu = educations[0]
  return (
    <section id="education" className="py-24">
      <div className="container-x">
        <SectionHeading index="06" label="Education" title="Education" />
        <Reveal>
          <div className="rounded-2xl border border-edge bg-charcoal p-8 max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan/10 text-cyanBright hidden sm:block">
                <Icon name="grad" size={24} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-heading font-semibold text-xl text-offwhite">{edu.school}</h3>
                  <span className="px-2 py-0.5 rounded bg-cyan/10 text-cyanBright text-[11px] font-heading">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {edu.degree} — {edu.major}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted">
                    <span className="text-cyanBright font-heading font-medium">Fokus: </span>
                    {edu.focus}
                  </p>
                  <p className="text-sm text-muted">
                    <span className="text-cyanBright font-heading font-medium">Project Akademik: </span>
                    {edu.projects}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
