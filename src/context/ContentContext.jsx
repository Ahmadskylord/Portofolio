import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  profile as seedProfile,
  skills as seedSkills,
  projects as seedProjects,
  experiences as seedExperiences,
  educations as seedEducations,
  certifications as seedCertifications,
  blogPosts as seedBlog,
  blogCategories as seedBlogCategories,
  journey as seedJourney,
  github as seedGithub,
  whatIdo,
} from '../data/portfolio'

const STORAGE_KEY = 'adm_content_v1'

const seed = {
  profile: seedProfile,
  skills: seedSkills,
  projects: seedProjects,
  experiences: seedExperiences,
  educations: seedEducations,
  certifications: seedCertifications,
  blogPosts: seedBlog,
  blogCategories: seedBlogCategories,
  journey: seedJourney,
  github: seedGithub,
  whatIdo,
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw)
    return {
      ...seed,
      ...parsed,
      github: { ...seed.github, ...(parsed.github || {}), username: seed.github.username, url: seed.github.url },
    }
  } catch {
    return seed
  }
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch {
      /* ignore quota */
    }
  }, [content])

  const update = (key) => (items) => setContent((c) => ({ ...c, [key]: items }))

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY)
    setContent(seed)
  }

  const value = useMemo(
    () => ({
      ...content,
      update,
      resetAll,
      setProfile: update('profile'),
      setSkills: update('skills'),
      setProjects: update('projects'),
      setExperiences: update('experiences'),
      setEducations: update('educations'),
      setCertifications: update('certifications'),
      setBlogPosts: update('blogPosts'),
      setBlogCategories: update('blogCategories'),
      setJourney: update('journey'),
      setGithub: update('github'),
    }),
    [content]
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
