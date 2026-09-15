import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import Icon from '../components/Icon'
import { Button, Field, PageTitle, TextArea, TextInput, inputCls } from './ui'
import { projectFilters } from '../data/portfolio'

const emptyProject = {
  slug: '',
  title: '',
  image: '',
  category: ['Web'],
  type: '',
  year: new Date().getFullYear(),
  role: 'Developer',
  stack: [],
  short: '',
  overview: '',
  problem: '',
  solution: '',
  features: [],
  demo: '#',
  github: 'https://github.com/',
}

export default function AdminProjects() {
  const { projects, setProjects } = useContent()
  const [editing, setEditing] = useState(null) // index or null (new)
  const [form, setForm] = useState(null)

  const startNew = () => {
    setEditing(null)
    setForm(emptyProject)
  }

  const startEdit = (p) => {
    const idx = projects.findIndex((x) => x.slug === p.slug)
    setEditing(idx)
    setForm({ ...p, stack: p.stack.join(', '), category: p.category.join(', '), features: p.features.join('\n') })
  }

  const cancel = () => {
    setEditing(null)
    setForm(null)
  }

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => setForm((current) => ({ ...current, image: reader.result }))
    reader.readAsDataURL(file)
  }

  const save = () => {
    const slug = form.slug.trim().toLowerCase().replace(/\s+/g, '-')
    const next = {
      ...form,
      slug: slug || Date.now().toString(),
      stack: form.stack.split(',').map((s) => s.trim()).filter(Boolean),
      category: form.category.split(',').map((s) => s.trim()).filter(Boolean),
      features: form.features.split('\n').map((s) => s.trim()).filter(Boolean),
    }
    let list
    if (editing === null) {
      list = [...projects, next]
    } else {
      list = projects.map((p, i) => (i === editing ? next : p))
    }
    setProjects(list)
    cancel()
  }

  const remove = (slug) => {
    if (confirm('Hapus project ini?')) setProjects(projects.filter((p) => p.slug !== slug))
  }

  if (form) {
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
    return (
      <div>
        <PageTitle
          title={editing === null ? 'Tambah Project' : 'Edit Project'}
          action={<Button variant="ghost" onClick={cancel}>Batal</Button>}
        />
        <div className="space-y-4 bg-charcoal p-6 border border-edge rounded-2xl">
          <div className="gap-4 grid sm:grid-cols-2">
            <Field label="Judul *">
              <TextInput value={form.title} onChange={set('title')} placeholder="Nama project" />
            </Field>
            <Field label="Slug (URL)">
              <TextInput value={form.slug} onChange={set('slug')} placeholder="kebab-case" />
            </Field>
            <Field label="Type">
              <TextInput value={form.type} onChange={set('type')} placeholder="mis. Web-Based System" />
            </Field>
            <Field label="Tahun">
              <TextInput type="number" value={form.year} onChange={set('year')} />
            </Field>
            <Field label="Role">
              <TextInput value={form.role} onChange={set('role')} />
            </Field>
            <Field label="Kategori (pisah koma)">
              <TextInput value={form.category} onChange={set('category')} placeholder="Web, Laravel, System" />
            </Field>
          </div>
          <Field label="Gambar Project">
            <div className="space-y-3">
              {form.image && (
                <div className="relative bg-ink border border-edge rounded-xl max-w-md overflow-hidden">
                  <img src={form.image} alt="Preview project" className="w-full object-cover aspect-video" />
                  <button
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, image: '' }))}
                    className="top-2 right-2 absolute bg-ink/85 px-3 py-1.5 rounded-lg text-offwhite hover:text-cyanBright text-xs"
                  >
                    Hapus gambar
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImage}
                className={inputCls}
              />
              <p className="text-muted text-xs">Format JPG, PNG, atau WebP. Gambar disimpan di browser ini.</p>
            </div>
          </Field>
          <Field label="Keterangan Singkat">
            <TextArea rows={2} value={form.short} onChange={set('short')} />
          </Field>
          <Field label="Tech Stack (pisah koma)">
            <TextInput value={form.stack} onChange={set('stack')} placeholder="Laravel, PHP, MySQL" />
          </Field>
          <Field label="Overview">
            <TextArea rows={2} value={form.overview} onChange={set('overview')} />
          </Field>
          <Field label="Problem">
            <TextArea rows={2} value={form.problem} onChange={set('problem')} />
          </Field>
          <Field label="Solution">
            <TextArea rows={2} value={form.solution} onChange={set('solution')} />
          </Field>
          <Field label="Features (satu per baris)">
            <TextArea rows={3} value={form.features} onChange={set('features')} />
          </Field>
          <div className="gap-4 grid sm:grid-cols-2">
            <Field label="Link Demo">
              <TextInput value={form.demo} onChange={set('demo')} />
            </Field>
            <Field label="Link GitHub">
              <TextInput value={form.github} onChange={set('github')} />
            </Field>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={cancel}>Batal</Button>
            <Button onClick={save}>Simpan Project</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageTitle
        title="Projects"
        sub={`${projects.length} project`}
        action={<Button onClick={startNew}><Icon name="plus" size={15} /> Tambah</Button>}
      />

      <div className="gap-4 grid sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.slug} className="bg-charcoal p-5 border border-edge rounded-2xl">
            {p.image && <img src={p.image} alt={p.title} className="mb-4 rounded-xl w-full object-cover aspect-video" />}
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-heading font-semibold text-offwhite">{p.title}</h3>
                <p className="mt-0.5 text-muted text-xs">{p.type} • {p.year}</p>
              </div>
              <span className="bg-cyan/10 px-2 py-0.5 rounded font-heading text-[11px] text-cyanBright">
                {p.category[0]}
              </span>
            </div>
            <p className="mt-2 text-muted text-sm line-clamp-2">{p.short}</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => startEdit(p)}>Edit</Button>
              <Button variant="danger" onClick={() => remove(p.slug)}>Hapus</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
