import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { useContent } from '../context/ContentContext'
import Icon from '../components/Icon'
import { Button, PageTitle, TextInput } from './ui'

export default function AdminDashboard({ onNavigate }) {
  const { messages, unreadCount, addMessage } = useAdmin()
  const { profile, projects, skills, blogPosts, certifications, experiences, educations, setProfile } = useContent()
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const [editName, setEditName] = useState(profile.name)
  const [editRole, setEditRole] = useState(profile.role)
  const [editTagline, setEditTagline] = useState(profile.tagline)
  const [editLocation, setEditLocation] = useState(profile.location)
  const [editEmail, setEditEmail] = useState(profile.email)
  const [editOpenToWork, setEditOpenToWork] = useState(profile.openToWork)

  const totalSkills = skills.reduce((a, g) => a + g.items.length, 0)
  const totalProjects = projects.length
  const totalCertifications = certifications.length
  const totalBlogPosts = blogPosts.length
  const totalExperiences = experiences.length
  const totalEducations = educations.length
  const totalMessages = messages.length

  const recentProjects = projects.slice(0, 4)
  const recentMessages = messages.slice(0, 5)

  const saveProfile = () => {
    setProfile({
      ...profile,
      name: editName,
      role: editRole,
      tagline: editTagline,
      location: editLocation,
      email: editEmail,
      openToWork: editOpenToWork,
    })
    setShowProfileEdit(false)
  }

  const statCards = [
    { label: 'Projects', value: totalProjects, target: 'projects', icon: 'briefcase', color: 'cyan' },
    { label: 'Skills', value: totalSkills, target: 'skills', icon: 'code', color: 'indigo' },
    { label: 'Experience', value: totalExperiences, target: 'experience', icon: 'grad', color: 'amber' },
    { label: 'Education', value: totalEducations, target: 'education', icon: 'grad', color: 'emerald' },
    { label: 'Certificates', value: totalCertifications, target: 'certifications', icon: 'award', color: 'rose' },
    { label: 'Blog Posts', value: totalBlogPosts, target: 'blog', icon: 'layout', color: 'violet' },
    { label: 'Messages', value: totalMessages, target: 'messages', icon: 'mail', color: 'cyan' },
    { label: 'Unread', value: unreadCount, target: 'messages', icon: 'check', color: 'orange' },
  ]

  const colorMap = {
    cyan: { bg: 'bg-cyan/10', text: 'text-cyanBright', border: 'border-cyan/20' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-300', border: 'border-indigo-500/20' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/20' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/20' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-300', border: 'border-rose-500/20' },
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-300', border: 'border-violet-500/20' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/20' },
  }

  return (
    <div>
      <PageTitle title="Dashboard" sub="Ringkasan manajemen konten website" />

      {/* Profile Overview Card */}
      <div className="rounded-2xl border border-edge bg-charcoal p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-25 rounded-xl object-cover border-2 border-cyan/30"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#0c151a"/><text x="40" y="45" fill="#14b8d4" font-family="sans-serif" font-size="28" text-anchor="middle" dominant-baseline="middle">AD</text></svg>')
              }}
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-charcoal" />
          </div>
          <div className="flex-1 min-w-0">
            {showProfileEdit ? (
              <div className="space-y-3 w-full">
                <div className="grid sm:grid-cols-2 gap-3">
                  <TextInput value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nama" />
                  <TextInput value={editRole} onChange={(e) => setEditRole(e.target.value)} placeholder="Role" />
                  <TextInput value={editTagline} onChange={(e) => setEditTagline(e.target.value)} placeholder="Tagline" />
                  <TextInput value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Lokasi" />
                  <TextInput value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-muted">
                    <input type="checkbox" checked={editOpenToWork} onChange={(e) => setEditOpenToWork(e.target.checked)} className="accent-cyan" />
                    Open to Work
                  </label>
                  <Button size="sm" onClick={saveProfile}>Simpan</Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowProfileEdit(false)}>Batal</Button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-heading font-bold text-lg text-offwhite">{profile.name}</h3>
                <p className="text-sm text-cyanBright">{profile.role} • {profile.status}</p>
                <p className="text-xs text-muted mt-0.5">{profile.tagline}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted">
                  <span className="flex items-center gap-1"><Icon name="pin" size={12} /> {profile.location}</span>
                  <span className="flex items-center gap-1"><Icon name="mail" size={12} /> {profile.email}</span>
                  {profile.openToWork && <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-heading font-medium">Open to Work</span>}
                </div>
              </div>
            )}
          </div>
          {!showProfileEdit && (
            <Button variant="ghost" onClick={() => setShowProfileEdit(true)}>
              <Icon name="settings" size={15} /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-6">
        {statCards.map((s) => {
          const c = colorMap[s.color] || colorMap.cyan
          return (
            <button
              key={s.label}
              onClick={() => onNavigate(s.target)}
              className={`p-4 rounded-xl border ${c.border} bg-charcoal text-left hover:scale-105 transition-all`}
            >
              <div className={`p-2 rounded-lg ${c.bg} ${c.text} w-fit`}>
                <Icon name={s.icon} size={16} />
              </div>
              <p className={`mt-3 font-heading font-bold text-xl ${c.text}`}>{s.value}</p>
              <p className="text-[11px] text-muted mt-0.5">{s.label}</p>
            </button>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-offwhite mb-3">Aksi Cepat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Tambah Project', target: 'projects', icon: 'plus', variant: 'cyan' },
            { label: 'Kelola Blog', target: 'blog', icon: 'layout', variant: 'violet' },
            { label: 'Edit Skills', target: 'skills', icon: 'code', variant: 'indigo' },
            { label: 'Pengalaman', target: 'experience', icon: 'grad', variant: 'amber' },
            { label: 'Pendidikan', target: 'education', icon: 'grad', variant: 'emerald' },
            { label: 'Sertifikasi', target: 'certifications', icon: 'award', variant: 'rose' },
          ].map((q) => (
            <button
              key={q.label}
              onClick={() => onNavigate(q.target)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-edge bg-charcoal hover:border-cyan/40 hover:bg-charcoal/80 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-cyan/10 text-cyanBright group-hover:bg-cyan/20 transition-colors">
                <Icon name={q.icon} size={18} />
              </div>
              <span className="text-[11px] text-muted group-hover:text-offwhite transition-colors font-heading">{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Projects & Messages Row */}
      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="rounded-2xl border border-edge bg-charcoal p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-offwhite">Project Terbaru</h3>
            <button onClick={() => onNavigate('projects')} className="text-xs text-cyanBright hover:underline">
              Lihat Semua →
            </button>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-sm text-muted">Belum ada project. <button onClick={() => onNavigate('projects')} className="text-cyanBright hover:underline">Tambah sekarang</button>.</p>
          ) : (
            <ul className="space-y-3">
              {recentProjects.map((p) => (
                <li key={p.slug} className="p-3 rounded-lg bg-ink border border-edge hover:border-cyan/20 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-offwhite truncate">{p.title}</p>
                      <p className="text-xs text-muted mt-0.5">{p.type} • {p.year}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-cyan/10 text-cyanBright text-[10px] font-heading shrink-0">
                      {p.category[0]}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-muted">{s}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Messages */}
        <div className="rounded-2xl border border-edge bg-charcoal p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-offwhite">Pesan Terbaru</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-cyan text-ink text-[10px] font-bold">{unreadCount} baru</span>
              )}
              <button onClick={() => onNavigate('messages')} className="text-xs text-cyanBright hover:underline">
                Lihat Semua →
              </button>
            </div>
          </div>
          {recentMessages.length === 0 ? (
            <div className="text-center py-6">
              <Icon name="mail" size={32} className="mx-auto text-cyan/30" />
              <p className="text-sm text-muted mt-2">Belum ada pesan masuk.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {recentMessages.map((m) => (
                <li key={m.id} className={`p-3 rounded-lg border ${m.read ? 'bg-ink border-edge' : 'bg-cyan/5 border-cyan/20'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-offwhite truncate">{m.name}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      {!m.read && <span className="px-1.5 py-0.5 rounded bg-cyan text-ink text-[10px] font-bold">Baru</span>}
                      <span className="text-[10px] text-muted">{new Date(m.createdAt).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-0.5 truncate">{m.subject}</p>
                  <p className="text-[10px] text-muted/60 mt-0.5">{m.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6 rounded-2xl border border-edge bg-charcoal p-6">
        <h3 className="font-heading font-semibold text-offwhite mb-4">Status Sistem</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'LocalStorage', status: 'Active', ok: true },
            { label: 'Content Fields', status: '8 fields', ok: true },
            { label: 'Admin Auth', status: 'Authenticated', ok: true },
            { label: 'Theme', status: 'Dark', ok: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 p-3 rounded-lg bg-ink border border-edge">
              <span className={`w-2 h-2 rounded-full ${s.ok ? 'bg-green-500' : 'bg-red-500'}`} />
              <div>
                <p className="text-xs text-muted">{s.label}</p>
                <p className="text-sm text-offwhite font-heading font-medium">{s.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}