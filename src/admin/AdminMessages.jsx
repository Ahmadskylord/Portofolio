import { useAdmin } from '../context/AdminContext'
import Icon from '../components/Icon'
import { Button, PageTitle } from './ui'

export default function AdminMessages() {
  const { messages, toggleRead, deleteMessage, markAllRead, unreadCount } = useAdmin()

  return (
    <div>
      <PageTitle
        title="Messages"
        sub={`${messages.length} pesan • ${unreadCount} belum dibaca`}
        action={
          messages.length > 0 ? (
            <Button variant="ghost" onClick={markAllRead}>
              <Icon name="check" size={15} /> Tandai semua dibaca
            </Button>
          ) : undefined
        }
      />

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-edge bg-charcoal p-10 text-center text-muted">
          <Icon name="mail" size={32} className="mx-auto text-cyan/40" />
          <p className="mt-3 text-sm">Inbox kosong. Pesan dari form kontak akan muncul di sini.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 bg-charcoal transition-colors ${
                m.read ? 'opacity-75 border-edge' : 'border-cyan/40'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-offwhite">{m.subject}</h3>
                    {!m.read && (
                      <span className="px-1.5 py-0.5 rounded bg-cyan text-ink text-[10px] font-bold">Baru</span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {m.name} • {m.email} • {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => toggleRead(m.id)}>
                    <Icon name="check" size={15} /> {m.read ? 'Belum dibaca' : 'Tandai dibaca'}
                  </Button>
                  <Button variant="danger" onClick={() => deleteMessage(m.id)}>
                    <Icon name="close" size={15} /> Hapus
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
