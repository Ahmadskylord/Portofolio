export function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm text-muted mb-1.5">{label}</label>
      {children}
    </div>
  )
}

export const inputCls =
  'w-full px-3.5 py-2.5 rounded-lg border border-edge bg-ink text-sm text-offwhite placeholder:text-muted/50 focus:border-cyan/50 focus:outline-none'

export function TextInput(props) {
  return <input {...props} className={`${inputCls} ${props.className || ''}`} />
}

export function TextArea(props) {
  return <textarea {...props} className={`${inputCls} ${props.className || ''}`} />
}

export function Button({ children, variant = 'primary', size = 'md', ...props }) {
  const styles = {
    primary: 'bg-cyan text-ink font-heading font-semibold hover:bg-cyanBright',
    ghost: 'border border-edge text-offwhite font-heading font-medium hover:border-cyan/50 hover:text-cyanBright',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20 font-heading font-medium hover:bg-red-500/20',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-lg transition-colors ${styles[variant]} ${sizes[size]} ${props.className || ''}`}
    >
      {children}
    </button>
  )
}

export function PageTitle({ title, sub, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h2 className="font-heading font-bold text-xl text-offwhite">{title}</h2>
        {sub && <p className="text-sm text-muted mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  )
}
