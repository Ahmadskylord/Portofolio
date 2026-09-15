import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-start justify-center bg-ink p-8">
          <div className="max-w-xl w-full rounded-2xl border border-red-500/40 bg-charcoal p-6 mt-16">
            <p className="font-heading font-bold text-lg text-red-400">Terjadi error saat render</p>
            <pre className="mt-3 p-4 rounded-lg bg-ink border border-edge text-sm text-red-300 whitespace-pre-wrap overflow-auto max-h-72">
              {this.state.error && this.state.error.message
                ? this.state.error.message
                : String(this.state.error)}
            </pre>
            <button
              onClick={() => {
                this.setState({ error: null })
                window.location.hash = '#'
                window.location.reload()
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan text-ink font-heading font-semibold text-sm hover:bg-cyanBright"
            >
              Muat ulang
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
