import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { about } from '../../data/portfolio'
import { useContent } from '../../context/ContentContext'

export default function About() {
  const { profile } = useContent()
  return (
    <section id="about" className="py-24 bg-charcoal/40 border-y border-edge">
      <div className="container-x">
        <SectionHeading index="01" label="Who I Am" title="About Me" />
        <div className="grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="space-y-5 text-muted leading-relaxed">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <blockquote className="pl-4 border-l-2 border-cyan text-offwhite font-heading text-lg">
                “{profile.statement}”
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-edge bg-charcoal p-6">
              <h3 className="font-heading font-semibold text-offwhite mb-5">Quick Info</h3>
              <dl className="divide-y divide-edge">
                {profile.quickInfo.map((q) => (
                  <div key={q.label} className="flex items-center justify-between py-3">
                    <dt className="text-sm text-muted flex items-center gap-2">
                      <Icon name="pin" size={15} className="text-cyan" />
                      {q.label}
                    </dt>
                    <dd className="text-sm text-offwhite font-medium text-right">{q.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Web Development', 'Full Stack', 'Information System', 'UI Implementation', 'Problem Solving'].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-xs text-cyanBright"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
