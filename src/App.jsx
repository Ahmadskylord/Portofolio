import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ContentProvider } from './context/ContentContext'
import { AdminProvider, useAdmin } from './context/AdminContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import WhatIDo from './components/sections/WhatIDo'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Certifications from './components/sections/Certifications'
import Journey from './components/sections/Journey'
import GitHubActivity from './components/sections/GitHubActivity'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import ProjectDetail from './components/sections/ProjectDetail'
import ErrorBoundary from './components/ErrorBoundary'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const projectMatch = hash.match(/^#\/project\/(.+)$/)
  const isAdmin = hash === '#/admin' || hash.startsWith('#/admin/')
  return { projectSlug: projectMatch ? decodeURIComponent(projectMatch[1]) : null, isAdmin }
}

function PublicSite({ paletteOpen, setPaletteOpen, navigate }) {
  const { projectSlug } = useHashRoute()

  return (
    <>
      <Navbar onCommand={() => setPaletteOpen(true)} />
      {projectSlug ? (
        <ProjectDetail slug={projectSlug} onBack={() => (window.location.hash = '#')} />
      ) : (
        <main>
          <Hero />
          <About />
          <WhatIDo />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Journey />
          <GitHubActivity />
          <Blog />
          <Contact />
        </main>
      )}
      <Footer />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
      />
    </>
  )
}

function AdminSection() {
  const { isAuthed } = useAdmin()
  if (isAuthed) {
    return <AdminLayout onBack={() => (window.location.hash = '#')} />
  }
  return <AdminLogin onBack={() => (window.location.hash = '#')} />
}

function AppInner() {
  const { isAdmin } = useHashRoute()
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return isAdmin ? (
    <ErrorBoundary>
      <AdminSection />
    </ErrorBoundary>
  ) : (
    <ErrorBoundary>
      <PublicSite paletteOpen={paletteOpen} setPaletteOpen={setPaletteOpen} navigate={navigate} />
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <AdminProvider>
          <div className="bg-ink text-offwhite min-h-screen antialiased">
            <AppInner />
          </div>
        </AdminProvider>
      </ContentProvider>
    </ThemeProvider>
  )
}
