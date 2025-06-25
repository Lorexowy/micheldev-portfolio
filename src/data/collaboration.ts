// src/data/collaboration.ts
import { MessageCircle, Calculator, Wrench, Rocket } from "lucide-react"
import { CollaborationStep } from '@/types'

export const collaborationSteps: CollaborationStep[] = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Kontakt i omówienie potrzeb",
    description: "Poznajemy się i omawiamy Twoją wizję projektu",
    details: [
      "Bezpłatna konsultacja",
      "Analiza wymagań",
      "Określenie celów projektu",
      "Wybór najlepszego rozwiązania"
    ],
    duration: "1-2 dni",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    icon: Calculator,
    title: "Wycena i harmonogram",
    description: "Przygotowuję szczegółową ofertę i plan realizacji",
    details: [
      "Transparentna wycena",
      "Szczegółowy harmonogram",
      "Podpisanie umowy",
      "Ustalenie kamieni milowych"
    ],
    duration: "2-3 dni",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    icon: Wrench,
    title: "Realizacja projektu",
    description: "Tworzę Twój projekt z regularnym feedbackiem",
    details: [
      "Regularne aktualizacje postępu",
      "Możliwość wprowadzania zmian",
      "Testy i optymalizacja",
      "Prezentacja wersji roboczych"
    ],
    duration: "1-6 tygodni",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    icon: Rocket,
    title: "Wdrożenie i wsparcie",
    description: "Uruchamiamy projekt i zapewniam dalsze wsparcie",
    details: [
      "Wdrożenie i publikacja",
      "Szkolenie z obsługi",
      "30 dni bezpłatnego wsparcia",
      "Możliwość rozwoju projektu"
    ],
    duration: "Ongoing",
    color: "from-orange-500 to-red-500"
  }
]

// Utility functions
export const getStepById = (id: number): CollaborationStep | undefined =>
  collaborationSteps.find(step => step.id === id)

export const getTotalEstimatedDuration = (): string => {
  return "2-8 tygodni (w zależności od złożoności projektu)"
}