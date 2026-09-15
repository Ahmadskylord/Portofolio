import { useState } from 'react'
import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function Blog() {
  const { blogPosts: allPosts, blogCategories } = useContent()
  const [category, setCategory] = useState('Semua')
  const [query, setQuery] = useState('')

  const blogPosts = allPosts || []
  const filtered = blogPosts.filter((p) => {
    const matchCat = category === 'Semua' || p.category === category
    const matchQuery =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <section id="blog" className="py-24">
      <div className="container-x">
        <SectionHeading index="10" label="Blog & Notes" title="Notes, Articles & Tutorials" />

        <Reveal>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-heading transition-colors ${
                    category === c
                      ? 'bg-cyan text-ink font-semibold'
                      : 'border border-edge text-muted hover:text-offwhite'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative">
              <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes..."
                className="pl-9 pr-4 py-2 rounded-lg border border-edge bg-charcoal text-sm text-offwhite placeholder:text-muted focus:border-cyan/50 focus:outline-none"
              />
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <article className="group flex flex-col h-full p-6 rounded-2xl border border-edge bg-charcoal hover:border-cyan/40 transition-colors">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan/10 text-cyanBright font-heading">
                    {p.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="clock" size={12} /> {p.readTime}
                  </span>
                </div>
                <h3 className="mt-4 font-heading font-semibold text-lg text-offwhite leading-snug group-hover:text-cyanBright transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{p.excerpt}</p>
                <div className="mt-auto pt-5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-edge text-[10px] text-muted">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-cyanBright text-xs inline-flex items-center gap-1">
                    Read <Icon name="arrowUpRight" size={12} />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
