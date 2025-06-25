// src/data/projects.ts
import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 1,
    title: "VGEO",
    description: "Multi-page strona internetowa stworzona dla firmy geodezyjnej VGEO",
    image: "/images/vgeoweb.png",
    liveUrl: "http://www.vgeo.pl"
  },
  {
    id: 2,
    title: "VOYAGER - Polska Galanteria Skórzana",
    description: "Multi-page strona internetowa stworzona dla firmy kaletniczej VOYAGER",
    image: "/images/voyagersopelweb.png",
    liveUrl: "https://voyagersopel.pl"
  },
  {
    id: 3,
    title: "Nitką i Szydełkiem",
    description: "One-page strona internetowa stworzona dla osoby prywatnej zajmującej się rękodziełem",
    image: "/images/nitkaiszydelkiemweb.png",
    liveUrl: "https://nitkaiszydelkiem.pl"
  }
]

// Możesz dodać więcej projektów tutaj w przyszłości
export const featuredProjects = projects.slice(0, 3)
export const getProjectById = (id: number): Project | undefined => 
  projects.find(project => project.id === id)
export const getProjectsByCategory = (category: Project['category']): Project[] =>
  projects.filter(project => project.category === category)