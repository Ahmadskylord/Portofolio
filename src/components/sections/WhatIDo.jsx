import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function WhatIDo() {
  const { whatIdo } = useContent()
  return (
    <section id="whatido" className="py-24">
      <div className="container-x">
        <SectionHeading index="02" label="What I Do" title="How I Can Help" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whatIdo.map((w, i) => (
            <Reveal key={w.title} delay={i * 100}>
              <div className="group h-full p-6 rounded-2xl border border-edge bg-charcoal hover:border-cyan/40 hover:-translate-y-1 transition-all duration-300">
                <div className="p-3 rounded-xl bg-cyan/10 text-cyanBright w-fit group-hover:bg-cyan group-hover:text-ink transition-colors">
                  <Icon name={w.icon} size={22} />
                </div>
                <h3 className="mt-5 font-heading font-semibold text-lg text-offwhite">{w.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
