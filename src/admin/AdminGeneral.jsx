import { useState, useEffect } from 'react'
import { useContent } from '../context/ContentContext'
import Icon from '../components/Icon'
import { Button, Field, PageTitle, TextArea, TextInput } from './ui'

function removeTrailingCommas(value) {
  let result = ''
  let inString = false
  let escaped = false

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i]

    if (inString) {
      result += char
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === '"') inString = false
      continue
    }

    if (char === '"') {
      inString = true
      result += char
      continue
    }

    if (char === ',') {
      let next = i + 1
      while (/\s/.test(value[next] || '')) next += 1
      if (value[next] === ']' || value[next] === '}') continue
    }

    result += char
  }

  return result
}

export default function AdminGeneral({ collection, title }) {
  const c = useContent()
  const [json, setJson] = useState(null)
  const [error, setError] = useState('')
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem('adm_settings')
      return raw ? JSON.parse(raw) : { siteTitle: 'Ahmad Danial Hariadi — Full Stack Web Developer', baseUrl: '#' }
    } catch {
      return { siteTitle: 'Ahmad Danial Hariadi — Full Stack Web Developer', baseUrl: '#' }
    }
  })

  useEffect(() => {
    localStorage.setItem('adm_settings', JSON.stringify(settings))
  }, [settings])

  const map = {
    profile: { data: c.profile, set: c.setProfile, label: 'Profile (email, sosial, statistik)' },
    skills: { data: c.skills, set: c.setSkills, label: 'Kelompok Skills (kategori & item)' },
    experience: { data: c.experiences, set: c.setExperiences, label: 'Daftar pengalaman & organisasi' },
    education: { data: c.educations, set: c.setEducations, label: 'Daftar pendidikan' },
    certifications: { data: c.certifications, set: c.setCertifications, label: 'Daftar sertifikasi' },
    blog: { data: c.blogPosts, set: c.setBlogPosts, label: 'Daftar artikel / blog post' },
    journey: { data: c.journey, set: c.setJourney, label: 'Timeline perjalanan' },
    socials: { data: c.profile.socials, set: (v) => c.setProfile({ ...c.profile, socials: v }), label: 'Daftar tautan sosial' },
    settings: { data: settings, set: setSettings, label: 'Website settings (SEO metadata dasar)' },
  }

  const meta = map[collection]
  const data = meta?.data ?? c.profile

  const [draft, setDraft] = useState(undefined)

  const openEditor = () => {
    setJson(JSON.stringify(data, null, 2))
    setDraft(undefined)
    setError('')
  }

  const saveJson = () => {
    try {
      const repairedJson = removeTrailingCommas(json)
      const parsed = JSON.parse(repairedJson)
      meta.set(parsed)
      setJson(JSON.stringify(parsed, null, 2))
      setJson(null)
      setError('')
    } catch (e) {
      const trailingCommaHint = /Unexpected token|Expected/.test(e.message) && /,\s*[\]}]/.test(json)
        ? ' Hapus koma terakhir sebelum tanda ] atau }.'
        : ''
      setError('JSON tidak valid: ' + e.message + trailingCommaHint)
    }
  }

  const changeSimple = (value) => {
    if (collection === 'skills') {
      const lines = value.split('\n').map((s) => s.trim()).filter(Boolean)
      c.setSkills(lines)
    } else if (collection === 'settings') {
      setSettings((prev) => ({ ...prev, siteTitle: value }))
    } else {
      c.setProfile({ ...c.profile, [collection]: value })
    }
    setDraft(undefined)
  }

  return (
    <div>
      <PageTitle title={title} sub={meta?.label} />

      {collection === 'socials' && !json && (
        <div className="bg-charcoal p-6 border border-edge rounded-2xl">
          <p className="mb-4 text-muted text-sm">
            Tautan sosial tersimpan di dalam profile. Gunakan editor JSON untuk mengubah.
          </p>
          <Button variant="ghost" onClick={openEditor}>Buka Editor JSON</Button>
        </div>
      )}

      {(collection === 'profile' || collection === 'settings') && !json && (
        <SimpleForm
          collection={collection}
          data={data}
          settings={settings}
          onSave={(v) => changeSimple(v)}
          onSettingsChange={setSettings}
        />
      )}

      {(collection !== 'socials' && collection !== 'profile' && collection !== 'settings') && !json && (
        <div className="bg-charcoal p-6 border border-edge rounded-2xl">
          <p className="mb-4 text-muted text-sm">
            Koleksi "{title}" berisi {Array.isArray(data) ? data.length + ' item' : 'konten'}.
            Edit secara langsung melalui editor JSON untuk kontrol penuh terhadap struktur data.
          </p>
          <Button variant="ghost" onClick={openEditor}>Buka Editor JSON</Button>
        </div>
      )}

      {json !== null && (
        <div className="bg-charcoal p-6 border border-edge rounded-2xl">
          <Field label="Data (JSON)">
            <TextArea
              rows={20}
              value={json}
              onChange={(e) => setJson(e.target.value)}
              className="font-mono text-xs"
            />
          </Field>
          <p className="mt-2 text-muted text-xs">
            Koma terakhir sebelum <code>]</code> atau <code>{'}'}</code> akan diperbaiki otomatis saat disimpan.
          </p>
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setJson(null)}>Batal</Button>
            <Button onClick={saveJson}>Simpan</Button>
          </div>
        </div>
      )}
    </div>
  )
}

function SimpleForm({ collection, data, settings, onSave, onSettingsChange }) {
  const c = useContent()
  const [f, setF] = useState(
    collection === 'profile'
      ? {
          email: data.email,
          location: data.location || '',
          role: data.role,
          status: data.status,
          openToWork: data.openToWork,
        }
      : { siteTitle: settings.siteTitle || '', baseUrl: settings.baseUrl || '' }
  )
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }))

  if (collection === 'profile') {
    return (
      <div className="space-y-4 bg-charcoal p-6 border border-edge rounded-2xl">
        <div className="gap-4 grid sm:grid-cols-2">
          <Field label="Email"><TextInput value={f.email} onChange={set('email')} /></Field>
          <Field label="Lokasi"><TextInput value={f.location} onChange={set('location')} /></Field>
          <Field label="Role"><TextInput value={f.role} onChange={set('role')} /></Field>
          <Field label="Status"><TextInput value={f.status} onChange={set('status')} /></Field>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={f.openToWork}
            onChange={(e) => setF((p) => ({ ...p, openToWork: e.target.checked }))}
            className="accent-cyan"
          />
          <label className="text-muted text-sm">Open to Work</label>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              const next = {
                ...c.profile,
                email: f.email,
                location: f.location,
                role: f.role,
                status: f.status,
                openToWork: f.openToWork,
              }
              c.setProfile(next)
              onSave('')
            }}
          >
            Simpan Profile
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 bg-charcoal p-6 border border-edge rounded-2xl">
      <div className="gap-4 grid sm:grid-cols-2">
        <Field label="Site Title"><TextInput value={f.siteTitle} onChange={set('siteTitle')} /></Field>
        <Field label="Base URL"><TextInput value={f.baseUrl} onChange={set('baseUrl')} /></Field>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => {
          onSettingsChange((prev) => ({ ...prev, siteTitle: f.siteTitle, baseUrl: f.baseUrl }))
          onSave(f.siteTitle)
        }}>Simpan Settings</Button>
      </div>
    </div>
  )
}