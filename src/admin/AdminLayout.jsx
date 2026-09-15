import { useState } from 'react'
import Icon from '../components/Icon'
import { useAdmin } from '../context/AdminContext'
import { PageTitle } from './ui'
import AdminDashboard from './AdminDashboard'
import AdminProjects from './AdminProjects'
import AdminMessages from './AdminMessages'
import AdminGeneral from './AdminGeneral'

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'projects', label: 'Projects', icon: 'briefcase' },
  { id: 'skills', label: 'Skills', icon: 'code' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'education', label: 'Education', icon: 'grad' },
  { id: 'certifications', label: 'Certifications', icon: 'award' },
  { id: 'blog', label: 'Blog', icon: 'layout' },
  { id: 'journey', label: 'Journey', icon: 'clock' },
  { id: 'messages', label: 'Messages', icon: 'mail' },
  { id: 'socials', label: 'Social Links', icon: 'link' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

const collectionFor = {
  profile: 'profile',
  skills: 'skills',
  experience: 'experiences',
  education: 'educations',
  certifications: 'certifications',
  blog: 'blogPosts',
  journey: 'journey',
  socials: 'socials',
}

export default function AdminLayout({ onBack }) {
  const { logout, unreadCount } = useAdmin()
  const [tab, setTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-ink">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-60 shrink-0 border-r border-edge bg-charcoal/40 hidden md:flex flex-col fixed inset-y-0">
          <div className="px-5 py-5 border-b border-edge">
            <p className="font-heading font-bold text-offwhite">
              <span className="text-cyanBright">AD</span>
              <span className="text-muted">.admin</span>
            </p>
            <p className="text-xs text-muted mt-0.5">Panel Manajemen</p>
          </div>
          <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  tab === n.id
                    ? 'bg-cyan/15 text-cyanBright font-heading font-medium'
                    : 'text-muted hover:text-offwhite hover:bg-white/5'
                }`}
              >
                <Icon name={n.icon} size={16} />
                <span className="flex-1 text-left">{n.label}</span>
                {n.id === 'messages' && unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan text-ink text-[10px] font-heading font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-edge space-y-1">
            <button
              onClick={onBack}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-offwhite hover:bg-white/5 transition-colors"
            >
              <Icon name="arrow" size={16} className="rotate-180" /> Lihat Situs
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Icon name="close" size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile topbar + main */}
        <div className="flex-1 md:ml-60 flex flex-col">
          <header className="md:hidden sticky top-0 z-30 bg-ink/90 backdrop-blur border-b border-edge px-4 py-3 flex items-center justify-between">
            <p className="font-heading font-bold text-offwhite">
              <span className="text-cyanBright">AD</span>
              <span className="text-muted">.admin</span>
            </p>
            <div className="flex items-center gap-2">
              <button onClick={onBack} className="p-2 text-muted hover:text-offwhite">
                <Icon name="arrow" size={18} className="rotate-180" />
              </button>
              <button onClick={logout} className="p-2 text-red-400">
                <Icon name="close" size={18} />
              </button>
            </div>
          </header>
          <div className="md:hidden border-b border-edge px-4 py-2 flex gap-1 overflow-x-auto">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  tab === n.id ? 'bg-cyan/15 text-cyanBright' : 'text-muted'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>

          <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl w-full mx-auto">
            {tab === 'dashboard' && <AdminDashboard onNavigate={setTab} />}
            {tab === 'projects' && <AdminProjects />}
            {tab === 'messages' && <AdminMessages />}
            {(tab === 'profile' ||
              tab === 'skills' ||
              tab === 'experience' ||
              tab === 'education' ||
              tab === 'certifications' ||
              tab === 'blog' ||
              tab === 'journey' ||
              tab === 'socials') && (
              <AdminGeneral collection={collectionFor[tab]} title={nav.find((n) => n.id === tab).label} />
            )}
            {tab === 'settings' && <AdminGeneral collection="settings" title="Settings" />}
          </main>
        </div>
      </div>
    </div>
  )
}
