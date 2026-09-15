import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon'
import { useContent } from '../context/ContentContext'

export default function CommandPalette({ open, onClose, onNavigate }) {
  const { profile } = useContent()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const actions = useMemo(() => {
    const list = [
      { label: 'Home', target: 'home', icon: 'user' },
      { label: 'About', target: 'about', icon: 'user' },
      { label: 'Skills', target: 'skills', icon: 'code' },
      { label: 'Projects', target: 'projects', icon: 'briefcase' },
      { label: 'Experience', target: 'experience', icon: 'clock' },
      { label: 'Education', target: 'education', icon: 'grad' },
      { label: 'Certifications', target: 'certifications', icon: 'award' },
      { label: 'Blog', target: 'blog', icon: 'layout' },
      { label: 'GitHub Activity', target: 'github', icon: 'github' },
      { label: 'Contact', target: 'contact', icon: 'mail' },
      {
        label: 'Download CV',
        target: 'cv',
        icon: 'download',
        type: 'download',
      },
      {
        label: 'GitHub Profile',
        target: 'github-link',
        icon: 'github',
        type: 'external',
        url: profile.socials[0]?.url || 'https://github.com/',
      },
      { label: 'Back to Top', target: 'top', icon: 'arrow' },
      { label: 'Admin Panel', target: 'admin', icon: 'settings', type: 'admin' },
    ]
    if (!query) return list
    return list.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  if (!open) return null

  const run = (action) => {
    onClose()
    if (action.type === 'download') {
      window.open(profile.cvs[0]?.file || '#', '_blank')
      return
    }
    if (action.type === 'external') {
      window.open(action.url, '_blank')
      return
    }
    if (action.type === 'admin') {
      window.location.hash = '#/admin'
      return
    }
    if (action.target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    onNavigate(action.target)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-ink/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-edge bg-charcoal shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-edge">
          <Icon name="search" size={18} className="text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 py-4 bg-transparent text-offwhite placeholder:text-muted focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-edge text-[10px] text-muted">
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {actions.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted">No results for “{query}”</p>
          )}
          {actions.map((a, i) => (
            <button
              key={a.label}
              onClick={() => run(a)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                i === 0 ? 'bg-cyan/10' : 'hover:bg-white/5'
              }`}
            >
              <Icon name={a.icon} size={16} className="text-cyanBright" />
              <span className="text-offwhite flex-1">{a.label}</span>
              <Icon name="arrowUpRight" size={13} className="text-muted" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
