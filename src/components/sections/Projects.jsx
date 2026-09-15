import { useState } from 'react'
import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { projectFilters } from '../../data/portfolio'
import { useContent } from '../../context/ContentContext'

function ProjectCard({ project }) {
  return (
    <article className="group flex flex-col bg-charcoal border border-edge hover:border-cyan/40 rounded-2xl overflow-hidden transition-colors">
      <div className="relative bg-charcoal aspect-video overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="px-6 font-display text-cyan/40 group-hover:text-cyanBright text-3xl text-center transition-colors">
                {project.title}
              </span>
            </div>
          </>
        )}
        {project.image && <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />}
        <div className="top-3 left-3 absolute flex gap-2">
          <span className="bg-ink/80 backdrop-blur px-2 py-1 rounded font-heading text-[11px] text-cyanBright">
            {project.type}
          </span>
        </div>
        <div className="top-3 right-3 absolute bg-ink/80 backdrop-blur px-2 py-1 rounded font-heading text-[11px] text-muted">
          {project.year}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading font-semibold text-offwhite text-xl">{project.title}</h3>
        <p className="mt-2 text-muted text-sm leading-relaxed">{project.short}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.stack.map((s) => (
            <span key={s} className="bg-cyan/10 px-2 py-0.5 rounded text-[11px] text-cyanBright">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-auto pt-5">
          <a
            href={`#/project/${project.slug}`}
            className="inline-flex items-center gap-1.5 bg-cyan hover:bg-cyanBright px-3.5 py-2 rounded-lg font-heading font-semibold text-ink text-xs transition-colors"
          >
            Detail <Icon name="arrowUpRight" size={14} />
          </a>
          {project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 p-2 border border-edge hover:border-cyan/40 rounded-lg text-muted hover:text-cyanBright transition-colors"
              aria-label="Live demo"
            >
              <Icon name="external" size={15} />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 p-2 border border-edge hover:border-cyan/40 rounded-lg text-muted hover:text-cyanBright transition-colors"
            aria-label="GitHub"
          >
            <Icon name="github" size={15} />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const { projects } = useContent()
  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category.includes(filter))

  return (
    <section id="projects" className="py-24">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Featured Work"
          title="Projects"
          sub="Beberapa project yang pernah saya kerjakan — dari sistem informasi, aplikasi web, hingga website organisasi."
        />

        <Reveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-heading transition-colors ${
                  filter === f
                    ? 'bg-cyan text-ink font-semibold'
                    : 'border border-edge text-muted hover:text-offwhite hover:border-edge-strong'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
