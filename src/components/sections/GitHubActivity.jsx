import { useEffect, useState } from 'react'
import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'

const langColor = {
  PHP: 'bg-indigo-500',
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  HTML: 'bg-orange-500',
}

export default function GitHubActivity() {
  const { github } = useContent()
  const [repos, setRepos] = useState(github.repos || [])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${github.username}/repos?sort=updated&direction=desc&per_page=6`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub API request failed')
        return response.json()
      })
      .then((items) => {
        setRepos(items.map((repo) => ({
          name: repo.name,
          desc: repo.description || 'Repository GitHub tanpa deskripsi.',
          lang: repo.language || 'Other',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        })))
        setStatus('live')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('fallback')
      })

    return () => controller.abort()
  }, [github.username])

  return (
    <section id="github" className="bg-charcoal/40 py-24 border-edge border-y">
      <div className="container-x">
        <SectionHeading
          index="09"
          label="GitHub"
          title="GitHub Activity"
          sub="Repository terbaru dan kontribusi saya. Terhubung langsung dengan akun GitHub untuk data live."
        />
        <Reveal>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-edge hover:border-cyan/40 rounded-lg text-offwhite hover:text-cyanBright text-sm transition-colors"
            >
              <Icon name="github" size={16} /> @{github.username}
            </a>
            <span className="text-muted text-xs">
              {status === 'live' ? 'Live data' : status === 'loading' ? 'Loading...' : 'Cached data'} • GitHub API
            </span>
          </div>
        </Reveal>

        <div className="gap-5 grid sm:grid-cols-2">
          {repos.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 100}>
              <a
                href={github.url + r.name}
                target="_blank"
                rel="noreferrer"
                className="group block bg-ink p-6 border border-edge hover:border-cyan/40 rounded-2xl transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-offwhite group-hover:text-cyanBright transition-colors">
                    {r.name}
                  </h3>
                  <Icon name="arrowUpRight" size={16} className="text-muted group-hover:text-cyanBright" />
                </div>
                <p className="mt-2 text-muted text-sm line-clamp-2">{r.desc}</p>
                <div className="flex items-center gap-4 mt-4 text-muted text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${langColor[r.lang] || 'bg-white/30'}`} />
                    {r.lang}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>★</span> {r.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="github" size={12} /> {r.forks}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        {status === 'fallback' && (
          <p className="mt-4 text-muted text-xs">
            Data live GitHub sedang tidak tersedia. Silakan buka profil untuk melihat repository terbaru.
          </p>
        )}
      </div>
    </section>
  )
}
