import { useState } from 'react'
import Icon from '../components/Icon'
import { useAdmin } from '../context/AdminContext'

export default function AdminLogin({ onBack }) {
  const { login } = useAdmin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (login(username, password)) {
      setError('')
    } else {
      setError('Username atau password salah.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative w-full max-w-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-6 text-sm text-muted hover:text-cyanBright transition-colors"
        >
          <Icon name="arrow" size={15} className="rotate-180" /> Kembali ke situs
        </button>

        <div className="rounded-2xl border border-edge bg-charcoal p-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan/10 text-cyanBright">
              <Icon name="briefcase" size={22} />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-offwhite">Admin</h1>
              <p className="text-xs text-muted">Panel manajemen konten</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1.5" htmlFor="aduser">Username</label>
              <input
                id="aduser"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-lg border border-edge bg-ink text-offwhite placeholder:text-muted/50 focus:border-cyan/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1.5" htmlFor="adpass">Password</label>
              <input
                id="adpass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-edge bg-ink text-offwhite placeholder:text-muted/50 focus:border-cyan/50 focus:outline-none"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan text-ink font-heading font-semibold hover:bg-cyanBright transition-colors"
            >
              Masuk <Icon name="arrow" size={15} />
            </button>
          </form>

          <p className="mt-5 text-xs text-muted text-center">
            Demo: <span className="text-cyanBright">admin / admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
