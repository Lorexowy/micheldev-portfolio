// src/types/index.ts
import { LucideIcon } from 'lucide-react'

// Typy dla projektów
export interface Project {
  id: number
  title: string
  description: string
  image: string
  liveUrl: string
  technologies?: string[]
  category?: 'website' | 'graphics' | 'branding'
}

// Typy dla usług
export interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

// Typy dla formularza kontaktowego
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

// Typy dla FAQ
export interface FAQItem {
  question: string
  answer: string
}

// Typy dla kroków współpracy
export interface CollaborationStep {
  id: number
  icon: LucideIcon
  title: string
  description: string
  details: string[]
  duration?: string
  color: string
}

// Typy dla social media
export interface SocialLink {
  name: string
  icon: LucideIcon
  url: string
  color: string
}

// Typy dla kontaktu
export interface ContactInfo {
  icon: LucideIcon
  label: string
  value: string
  href: string
  color: string
}

// Typy dla nawigacji
export interface NavLink {
  targetId: string
  label: string
  icon: LucideIcon
  ariaLabel?: string
}

// Typy dla animacji
export interface MousePosition {
  x: number
  y: number
}

// Typy dla komponentów UI
export interface AnimatedBackgroundProps {
  className?: string
  variant?: 'hero' | 'section' | 'minimal'
  children?: React.ReactNode
}

// Typy dla EmailJS
export interface EmailJSConfig {
  serviceId: string
  templateId: string
  publicKey: string
}

export interface EmailTemplateParams {
  from_name: string
  from_email: string
  subject: string
  message: string
  to_email: string
}

// Utility types
export type ThemeMode = 'light' | 'dark' | 'system'
export type SectionId = 'hero' | 'uslugi' | 'projekty' | 'wspolpraca' | 'kontakt'