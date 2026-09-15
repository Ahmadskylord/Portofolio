import Icon from '../Icon'
import Reveal from '../Reveal'
import { useContent } from '../../context/ContentContext'

export default function Hero() {
  const { profile } = useContent()
  return (
    <section id="home" className="relative flex items-center pt-16 min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="-top-32 -right-32 absolute bg-cyan/10 blur-[120px] rounded-full w-96 h-96"
        aria-hidden="true"
      />
      <div
        className="-bottom-32 -left-32 absolute bg-cyan/5 blur-[120px] rounded-full w-96 h-96"
        aria-hidden="true"
      />

      <div className="relative items-center gap-12 grid lg:grid-cols-[1.3fr_1fr] py-20 container-x">
        <div>
          {profile.openToWork && (
            <Reveal>
              <span className="inline-flex items-center gap-2 bg-cyan/10 px-3 py-1.5 border border-cyan/30 rounded-full font-heading font-medium text-cyanBright text-xs">
                <span className="relative flex w-2 h-2">
                  <span className="inline-flex absolute bg-cyanBright opacity-75 rounded-full w-full h-full animate-ping" />
                  <span className="inline-flex relative bg-cyanBright rounded-full w-2 h-2" />
                </span>
                Open to Work
              </span>
            </Reveal>
          )}

          <Reveal delay={100}>
            <p className="mt-6 font-heading font-medium text-cyanBright text-sm uppercase tracking-[0.25em]">
              {profile.status} • {profile.role}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-2 font-display text-offwhite text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-5 max-w-xl text-muted text-base sm:text-lg leading-relaxed">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 bg-cyan hover:bg-cyanBright px-6 py-3 rounded-lg font-heading font-semibold text-ink text-sm transition-colors"
              >
                View Projects <Icon name="arrow" size={16} />
              </a>
              <a
                href={profile.cvs[0]?.file || '#'}
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-edge-strong hover:border-cyan/50 rounded-lg font-heading font-semibold text-offwhite hover:text-cyanBright text-sm transition-colors"
              >
                <Icon name="download" size={16} /> Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="flex items-center gap-3 mt-8">
              {profile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="p-2.5 border border-edge hover:border-cyan/40 rounded-lg text-muted hover:text-cyanBright transition-all hover:-translate-y-0.5"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 mt-10 max-w-xl">
              {profile.stats.map((s) => (
                <div key={s.label} className="bg-charcoal/60 p-4 border border-edge rounded-xl">
                  <p className="font-heading font-bold text-cyanBright text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-muted text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo card */}
        <Reveal delay={300} className="hidden lg:block">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute inset-0 border border-cyan/30 rounded-2xl translate-x-4 translate-y-4" />
            <div className="relative bg-charcoal border border-edge rounded-2xl overflow-hidden">
              <img
                src={profile.avatar}
                alt={profile.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src =
                    'data:image/svg+xml,' +
                    encodeURIComponent(
                      `<svg xmlns="https://media.licdn.com/dms/image/v2/D4E03AQE2rghHU6aQ_g/profile-displayphoto-crop_800_800/B4EaBDkU.0JUAI-/0/1787839992129?e=1790208000&v=beta&t=AQeU5CC5y2IOAZM_5tvBJUP741qJ_ukLTZZUonO901s" width="400" height="500"><rect width="100%" height="100%" fill="#0c151a"/><text x="50%" y="50%" fill="#14b8d4" font-family="sans-serif" font-size="24" text-anchor="middle" dominant-baseline="middle">AD</text></svg>`
                    )
                }}
                className="w-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <div className="right-0 bottom-0 left-0 absolute p-5">
                <p className="font-heading font-semibold text-offwhite">{profile.name}</p>
                <p className="text-cyanBright text-sm">{profile.role}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
