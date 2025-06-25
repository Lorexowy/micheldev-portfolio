// src/data/services.ts
import { Paintbrush, Laptop } from "lucide-react"
import { Service } from '@/types'

export const services: Service[] = [
  {
    icon: Paintbrush,
    title: "Projektowanie graficzne",
    description: "Kompleksowe usługi projektowania graficznego dla Twojej marki",
    features: [
      "Projektowanie logotypów",
      "Identyfikacja wizualna", 
      "Branding",
      "Materiały marketingowe",
      "Grafiki social media",
      "Plakaty / Reklamy / Banery"
    ]
  },
  {
    icon: Laptop,
    title: "Tworzenie stron internetowych",
    description: "Nowoczesne strony internetowe dostosowane do Twoich potrzeb",
    features: [
      "Strony one-page",
      "Strony multi-page", 
      "HTML / CSS / JS",
      "Next.js",
      "Responsywny design",
      "Optymalizacja wydajności",
      "Optymalizacja SEO",
      "WordPress"
    ]
  }
]

// Utility functions
export const getServiceByTitle = (title: string): Service | undefined =>
  services.find(service => service.title === title)

export const getAllServiceFeatures = (): string[] =>
  services.flatMap(service => service.features)