import { useEffect, useState } from 'react'
import Icon from './Icon'
import { useTheme } from '../context/ThemeContext'
import { useContent } from '../context/ContentContext'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ onCommand }) {
  const { profile } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-edge' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between h-16">
        <button
          onClick={() => go('home')}
          className="font-heading font-bold text-lg tracking-tight text-offwhite"
        >
          <span className="text-cyanBright">AD</span>
          <span className="text-muted">.danial</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`px-3 py-2 text-sm transition-colors relative ${
                  active === l.id ? 'text-cyanBright' : 'text-muted hover:text-offwhite'
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-px bg-cyanBright transition-opacity ${
                    active === l.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-edge text-xs text-muted hover:border-cyan/40 hover:text-offwhite transition-colors"
            title="Command Palette (Ctrl+K)"
          >
            <Icon name="search" size={14} />
            <span className="hidden md:inline">Navigate</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-edge text-[10px] font-heading">
              Ctrl K
            </kbd>
          </button>
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-muted hover:text-cyanBright hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            <Icon name={dark ? 'sun' : 'moon'} size={18} />
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              go('contact')
            }}
            className="hidden md:inline-flex px-4 py-2 rounded-lg bg-cyan text-ink font-heading font-semibold text-sm hover:bg-cyanBright transition-colors"
          >
            Hire Me
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 text-offwhite hover:bg-white/5 rounded-lg"
            aria-label="Menu"
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-ink/95 backdrop-blur-md border-b border-edge">
          <ul className="container-x py-4 flex flex-col">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`w-full text-left py-3 text-sm ${
                    active === l.id ? 'text-cyanBright' : 'text-offwhite/80'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={profile.cvs[0]?.file || '#'}
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan/10 text-cyanBright font-heading text-sm"
              >
                <Icon name="download" size={16} /> Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
