// src/lib/animations.ts
import { type Variants } from "framer-motion"

// Podstawowe warianty kontenerów
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.15 },
  },
}

// Warianty dla elementów wewnątrz kontenerów
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
}

// Warianty dla kart/elementów które pojawiają się z boku
export const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
}

// Warianty dla przycisków
export const buttonVariants: Variants = {
  hover: { scale: 1.02, y: -1 },
  tap: { scale: 0.98 }
}

// Warianty dla sekcji
export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

// Warianty dla nawigacji mobilnej
export const mobileMenuOverlayVariants: Variants = {
  hidden: { opacity: 0, pointerEvents: "none" as any },
  visible: { opacity: 1, pointerEvents: "auto" as any, transition: { duration: 0.3 } },
}

export const mobileMenuPanelVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { type: "spring", stiffness: 300, damping: 30 } },
}

// Warianty dla nawigacji desktop
export const navVariants: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.1 },
  },
}

export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
}

// Transition presets
export const transitions = {
  spring: { type: "spring" as const, stiffness: 200, damping: 25 },
  springFast: { type: "spring" as const, stiffness: 300, damping: 30 },
  easeOut: { duration: 0.6, ease: "easeOut" as const },
  smooth: { duration: 0.3, ease: "easeInOut" as const },
}