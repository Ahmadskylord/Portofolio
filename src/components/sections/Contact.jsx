import { useState } from 'react'
import Icon from '../Icon'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { useContent } from '../../context/ContentContext'
import { useAdmin } from '../../context/AdminContext'

export default function Contact() {
  const { profile } = useContent()
  const { addMessage } = useAdmin()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const contactMethods = [
    { name: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
    { name: 'WhatsApp', value: 'Chat langsung', href: profile.socials[2]?.url || '#', icon: 'whatsapp' },
    { name: 'LinkedIn', value: 'Connect', href: profile.socials[1]?.url || '#', icon: 'linkedin' },
    { name: 'GitHub', value: '@' + (profile.github?.username || 'github'), href: profile.socials[0]?.url || '#', icon: 'github' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    addMessage({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    })
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 bg-charcoal/40 border-y border-edge">
      <div className="container-x">
        <SectionHeading
          index="11"
          label="Contact"
          title="Let's Work Together"
          sub="Punya peluang kerja, project freelance, atau ide kolaborasi? Jangan ragu untuk menghubungi saya."
        />
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
          <Reveal>
            <div className="space-y-4">
              {contactMethods.map((m) => (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl border border-edge bg-ink hover:border-cyan/40 hover:-translate-y-0.5 transition-all"
                >
                  <div className="p-3 rounded-xl bg-cyan/10 text-cyanBright">
                    <Icon name={m.icon} size={20} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-offwhite">{m.name}</p>
                    <p className="text-sm text-muted">{m.value}</p>
                  </div>
                </a>
              ))}
              <a
                href={profile.cvs[0]?.file || '#'}
                download
                className="flex items-center justify-center gap-2 p-5 rounded-2xl bg-cyan text-ink font-heading font-semibold hover:bg-cyanBright transition-colors"
              >
                <Icon name="download" size={18} /> Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center p-10 rounded-2xl border border-cyan/30 bg-ink text-center">
                <div className="p-4 rounded-full bg-cyan/10 text-cyanBright">
                  <Icon name="award" size={32} />
                </div>
                <h3 className="mt-4 font-heading font-semibold text-xl text-offwhite">
                  Pesan Terkirim!
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Terima kasih {form.name || 'teman'}, saya akan segera membalas pesan Anda.
                </p>
                <button
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', subject: '', message: '' })
                  }}
                  className="mt-6 px-5 py-2.5 rounded-lg border border-edge-strong text-offwhite hover:border-cyan/50 hover:text-cyanBright transition-colors text-sm"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-edge bg-ink p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-muted mb-2" htmlFor="name">Nama</label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-lg border border-edge bg-charcoal text-offwhite placeholder:text-muted/50 focus:border-cyan/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-2" htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@anda.com"
                      className="w-full px-4 py-3 rounded-lg border border-edge bg-charcoal text-offwhite placeholder:text-muted/50 focus:border-cyan/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Topik pesan"
                    className="w-full px-4 py-3 rounded-lg border border-edge bg-charcoal text-offwhite placeholder:text-muted/50 focus:border-cyan/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tulis pesan Anda..."
                    className="w-full px-4 py-3 rounded-lg border border-edge bg-charcoal text-offwhite placeholder:text-muted/50 focus:border-cyan/50 focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan text-ink font-heading font-semibold hover:bg-cyanBright transition-colors"
                >
                  Kirim Pesan <Icon name="arrow" size={16} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
