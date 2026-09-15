import { useState } from 'react'
import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function Certifications() {
  const { certifications } = useContent()
  const [preview, setPreview] = useState(null)

  return (
    <section id="certifications" className="py-24 bg-charcoal/40 border-y border-edge">
      <div className="container-x">
        <SectionHeading index="07" label="Credentials" title="Certifications" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <button
                onClick={() => setPreview(c)}
                className="group w-full text-left p-6 rounded-2xl border border-edge bg-ink hover:border-cyan/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-300">
                    <Icon name="award" size={22} />
                  </div>
                  <span className="text-xs text-muted font-heading">{c.year}</span>
                </div>
                <h3 className="mt-4 font-heading font-semibold text-offwhite leading-snug">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                <span className="mt-3 inline-block px-2.5 py-0.5 rounded-full bg-cyan/10 text-cyanBright text-[11px] font-heading">
                  {c.category}
                </span>
                <p className="mt-4 text-xs text-cyanBright opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                  Preview <Icon name="arrowUpRight" size={12} />
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-edge bg-charcoal p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-offwhite hover:bg-white/5"
              aria-label="Close"
            >
              <Icon name="close" size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-300">
                <Icon name="award" size={26} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl text-offwhite">{preview.title}</h3>
                <p className="text-sm text-muted">{preview.issuer}</p>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-ink border border-edge p-10 flex flex-col items-center justify-center text-center">
              <Icon name="award" size={48} className="text-cyan/40" />
              <p className="mt-4 font-display text-3xl text-offwhite">{preview.title}</p>
              <p className="text-sm text-muted mt-1">Issued {preview.year}</p>
              <span className="mt-4 px-3 py-1 rounded-full bg-cyan/10 text-cyanBright text-xs font-heading">
                {preview.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
