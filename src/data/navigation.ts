// src/data/navigation.ts
import { Home, LayoutGrid, ImageIcon, Mail, MessageCircle, FolderIcon, FolderRootIcon } from "lucide-react"
import { NavLink } from '@/types'

// Linki nawigacyjne
export const navLinks: NavLink[] = [
  { 
    targetId: "hero", 
    label: "", 
    icon: Home, 
    ariaLabel: "Strona główna" 
  }, 
  { 
    targetId: "uslugi", 
    label: "Usługi", 
    icon: LayoutGrid, 
    ariaLabel: "Usługi" 
  },
  { 
    targetId: "projekty", 
    label: "Projekty", 
    icon: ImageIcon, 
    ariaLabel: "Projekty" 
  },
  { 
    targetId: "wspolpraca", 
    label: "Współpraca", 
    icon: FolderRootIcon, 
    ariaLabel: "Wspolpraca" 
  },
  { 
    targetId: "kontakt", 
    label: "Kontakt", 
    icon: Mail, 
    ariaLabel: "Kontakt" 
  }
]

// Linki dla footera (bez pustego labela dla home)
export const footerNavLinks: NavLink[] = [
  { 
    targetId: "hero", 
    label: "Strona główna", 
    icon: Home, 
    ariaLabel: "Strona główna" 
  },
  { 
    targetId: "uslugi", 
    label: "Usługi", 
    icon: LayoutGrid, 
    ariaLabel: "Usługi" 
  },
  { 
    targetId: "projekty", 
    label: "Projekty", 
    icon: ImageIcon, 
    ariaLabel: "Projekty" 
  },
  { 
    targetId: "wspolpraca", 
    label: "Współpraca", 
    icon: FolderRootIcon, 
    ariaLabel: "Wspolpraca" 
  },
  { 
    targetId: "kontakt", 
    label: "Kontakt", 
    icon: MessageCircle, 
    ariaLabel: "Kontakt" 
  }
]

// Utility functions
export const getLinkByTargetId = (targetId: string): NavLink | undefined =>
  navLinks.find(link => link.targetId === targetId)

export const getMobileNavLinks = (): NavLink[] =>
  navLinks.filter(link => link.label !== "") // Filtruj puste labele dla mobile