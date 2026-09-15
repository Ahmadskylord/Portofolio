import { useEffect } from 'react'
import Icon from '../Icon'
import { useContent } from '../../context/ContentContext'

export default function ProjectDetail({ slug, onBack }) {
  const { projects } = useContent()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="flex flex-col items-center pt-32 pb-20 min-h-screen">
        <p className="font-display text-offwhite text-5xl">Project not found</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-cyan mt-6 px-5 py-2.5 rounded-lg font-heading font-semibold text-ink"
        >
          <Icon name="arrow" size={16} className="rotate-180" /> Back to Projects
        </button>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-x">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 border border-edge hover:border-cyan/40 rounded-lg text-muted hover:text-cyanBright text-sm transition-colors"
        >
          <Icon name="arrow" size={15} className="rotate-180" /> Back to Projects
        </button>

        {/* Header */}
        <div className="bg-charcoal mt-8 border border-edge rounded-2xl overflow-hidden">
          <div className="relative flex justify-center items-center grid-bg aspect-video">
            {project.image ? (
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="px-6 font-display text-cyan/40 text-4xl sm:text-6xl text-center">
                {project.title}
              </span>
            )}
            {project.image && <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />}
            <div className="top-4 left-4 absolute flex gap-2">
              <span className="bg-ink/90 backdrop-blur px-2.5 py-1 rounded font-heading text-cyanBright text-xs">
                {project.type}
              </span>
              <span className="bg-ink/90 backdrop-blur px-2.5 py-1 rounded font-heading text-muted text-xs">
                {project.year}
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <h1 className="font-display text-offwhite text-4xl sm:text-5xl">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted">
                <Icon name="briefcase" size={15} className="text-cyan" /> Role: <span className="text-offwhite">{project.role}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {project.stack.map((s) => (
                <span key={s} className="bg-cyan/10 px-3 py-1 rounded-lg text-cyanBright text-xs">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan hover:bg-cyanBright px-5 py-2.5 rounded-lg font-heading font-semibold text-ink text-sm transition-colors"
                >
                  <Icon name="external" size={15} /> Live Demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-edge-strong hover:border-cyan/50 rounded-lg font-heading font-semibold text-offwhite hover:text-cyanBright text-sm transition-colors"
              >
                <Icon name="github" size={15} /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="gap-10 grid lg:grid-cols-[1.3fr_1fr] mt-10">
          <div className="space-y-8">
            <section>
              <h2 className="flex items-center gap-2 font-heading font-semibold text-offwhite text-xl">
                <span className="text-cyan">//</span> Overview
              </h2>
              <p className="mt-3 text-muted leading-relaxed">{project.overview}</p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 font-heading font-semibold text-offwhite text-xl">
                <span className="text-cyan">//</span> The Problem
              </h2>
              <p className="mt-3 text-muted leading-relaxed">{project.problem}</p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 font-heading font-semibold text-offwhite text-xl">
                <span className="text-cyan">//</span> The Solution
              </h2>
              <p className="mt-3 text-muted leading-relaxed">{project.solution}</p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 font-heading font-semibold text-offwhite text-xl">
                <span className="text-cyan">//</span> Key Features
              </h2>
              <ul className="gap-3 grid sm:grid-cols-2 mt-3">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted text-sm">
                    <Icon name="arrowUpRight" size={15} className="flex-shrink-0 mt-0.5 text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-charcoal p-6 border border-edge rounded-2xl">
              <h3 className="mb-4 font-heading font-semibold text-offwhite">Project Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Role</dt>
                  <dd className="text-offwhite">{project.role}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Tahun</dt>
                  <dd className="text-offwhite">{project.year}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Type</dt>
                  <dd className="text-offwhite">{project.type}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-charcoal p-6 border border-edge rounded-2xl">
              <h3 className="mb-4 font-heading font-semibold text-offwhite">Category</h3>
              <div className="flex flex-wrap gap-2">
                {project.category.map((c) => (
                  <span key={c} className="bg-cyan/10 px-3 py-1 rounded-full text-cyanBright text-xs">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-cyan/5 p-6 border border-cyan/30 rounded-2xl">
              <h3 className="mb-2 font-heading font-semibold text-offwhite">Tertarik dengan project serupa?</h3>
              <p className="mb-4 text-muted text-sm">
                Saya terbuka untuk kolaborasi atau mengerjakan project serupa untuk kebutuhan Anda.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  onBack()
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
                }}
                className="inline-flex items-center gap-2 bg-cyan hover:bg-cyanBright px-4 py-2 rounded-lg font-heading font-semibold text-ink text-sm transition-colors"
              >
                Hubungi Saya <Icon name="arrow" size={15} />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
