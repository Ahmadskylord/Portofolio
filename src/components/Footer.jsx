import Icon from './Icon'
import { useContent } from '../context/ContentContext'

export default function Footer() {
  const { profile } = useContent()
  return (
    <footer className="border-t border-edge bg-ink">
      <div className="container-x py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="max-w-sm">
            <p className="font-heading font-bold text-offwhite text-lg">
              <span className="text-cyanBright">AD</span>
              <span className="text-muted">.danial</span>
            </p>
            <p className="mt-3 text-sm text-muted">
              {profile.role}. {profile.tagline}
            </p>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="font-heading font-semibold text-sm text-offwhite mb-3">Menu</p>
              <ul className="space-y-2 text-sm text-muted">
                {['About', 'Skills', 'Projects', 'Experience'].map((m) => (
                  <li key={m}>
                    <a href={`#${m.toLowerCase()}`} className="hover:text-cyanBright transition-colors">
                      {m}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-semibold text-sm text-offwhite mb-3">Lainnya</p>
              <ul className="space-y-2 text-sm text-muted">
                {['Education', 'Certifications', 'Blog', 'Contact'].map((m) => (
                  <li key={m}>
                    <a href={`#${m.toLowerCase()}`} className="hover:text-cyanBright transition-colors">
                      {m}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="font-heading font-semibold text-sm text-offwhite mb-3">Social</p>
            <div className="flex gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="p-2.5 rounded-lg border border-edge text-muted hover:text-cyanBright hover:border-cyan/40 transition-colors"
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-edge flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <a href="#/admin" className="hover:text-cyanBright transition-colors">Admin</a>
            <span className="text-cyan">●</span> Open to Work
          </p>
        </div>
      </div>
    </footer>
  )
}
