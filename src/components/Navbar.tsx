"use client"

import React, { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, type Variants } from "framer-motion"

import { navLinks, getMobileNavLinks } from "@/data/navigation"
import { SectionId } from "@/types"

const navVariants: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
}

const mobileMenuOverlayVariants: Variants = {
  hidden: { opacity: 0, pointerEvents: "none" as const },
  visible: { opacity: 1, pointerEvents: "auto" as const, transition: { duration: 0.3 } },
}

const mobileMenuPanelVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { type: "spring", stiffness: 300, damping: 30 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<SectionId>("hero") 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) 

  // Get mobile nav links without empty labels
  const mobileNavLinks = getMobileNavLinks()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Funkcja do smooth scrollowania bez zmiany URL
  const scrollToSection = (targetId: SectionId) => {
    // Dla home scrollujemy na górę strony
    if (targetId === "hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      setActiveSection("hero")
      return
    }

    // Dla innych sekcji szukamy elementu po ID
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
      setActiveSection(targetId)
    }
  }

  // Automatyczne wykrywanie aktywnej sekcji podczas scrollowania
  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionId[] = ["hero", "uslugi", "projekty", "kontakt"]
      const scrollPosition = window.scrollY + 150 // offset dla lepszego wykrywania

      // Sprawdź czy jesteśmy na górze strony
      if (window.scrollY < 100) {
        setActiveSection("hero")
        return
      }

      // Sprawdź którą sekcję aktualnie widzimy
      let foundActiveSection = false
      
      for (const sectionId of sections.slice(1)) { // pomijamy hero, bo jest na górze
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          const elementBottom = elementTop + element.offsetHeight
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(sectionId)
            foundActiveSection = true
            break
          }
        }
      }

      // Jeśli nie znaleźliśmy żadnej aktywnej sekcji i nie jesteśmy na górze, 
      // sprawdź czy może jesteśmy między sekcjami - wtedy ustaw hero
      if (!foundActiveSection && window.scrollY >= 100) {
        setActiveSection("hero")
      }
    }

    // Wywołaj handleScroll od razu po załadowaniu, żeby ustawić poprawną sekcję
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dodatkowy useEffect do resetowania aktywnej sekcji przy ładowaniu strony
  useEffect(() => {
    // Po załadowaniu komponentu sprawdź pozycję scrollowania
    const checkInitialPosition = () => {
      if (window.scrollY < 100) {
        setActiveSection("hero")
      }
    }

    // Sprawdź pozycję po krótkim opóźnieniu (żeby DOM się załadował)
    const timer = setTimeout(checkInitialPosition, 100)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* gradient w defs */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Mobile Header (visible on small screens) */}
      <header
        className={`
          lg:hidden fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-2
          bg-gray-950 border-b border-gray-800
          transition-all duration-300 ease-out
          ${scrolled ? "shadow-md" : "shadow-none"}
        `}
      >
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 text-lg font-semibold text-white"
          aria-label="Strona główna"
        >
          {/* Use the Home icon from navLinks */}
          {navLinks[0] && React.createElement(navLinks[0].icon, { size: 24 })}
          <span className="sr-only">Strona główna</span>
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
          aria-label="Otwórz menu nawigacyjne"
        >
          <Menu className="h-7 w-7" />
        </button>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial="hidden"
          animate={isMobileMenuOpen ? "visible" : "hidden"}
          variants={mobileMenuOverlayVariants}
          className="fixed inset-0 bg-black/50 z-40 flex justify-end"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Mobile Menu Panel */}
          <motion.div
            initial="hidden"
            animate={isMobileMenuOpen ? "visible" : "hidden"}
            variants={mobileMenuPanelVariants}
            className="w-full max-w-xs sm:max-w-sm bg-gray-950 h-full shadow-2xl p-6 flex flex-col rounded-l-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
                aria-label="Zamknij menu nawigacyjne"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={navVariants}
              className="flex flex-col gap-2 flex-grow"
            >
              {mobileNavLinks.map((link, idx) => {
                const isActive = link.targetId === activeSection
                return (
                  <motion.div key={idx} variants={itemVariants}>
                    <button
                      onClick={() => {
                        scrollToSection(link.targetId as SectionId)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold w-full text-left
                                  transition-all duration-200 ease-out
                                  ${
                                    isActive
                                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                      : "text-gray-200 hover:bg-gray-800"
                                  }`}
                      aria-label={link.ariaLabel || link.label || undefined}
                    >
                      {React.createElement(link.icon, { 
                        size: 22, 
                        className: isActive ? "text-white" : "text-gray-400" 
                      })}
                      <span>{link.label}</span>
                    </button>
                  </motion.div>
                )
              })}
            </motion.nav>
          </motion.div>
        </motion.div>
      </header>

      {/* Desktop Navbar (hidden on small screens) */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="hidden lg:flex fixed inset-x-0 top-4 justify-center z-50 pointer-events-none"
      >
        <motion.div
          className={`
            pointer-events-auto flex items-center
            px-3 py-1.5 sm:px-5 sm:py-2 gap-2 sm:gap-4 rounded-full max-w-max mx-auto
            bg-black/70
            backdrop-filter backdrop-blur-xl backdrop-saturate-150 backdrop-hue-rotate-10
            transition-all duration-300 ease-out
            ${
              scrolled
                ? "backdrop-blur-3xl backdrop-saturate-200 backdrop-hue-rotate-15 bg-black/40 shadow-md"
                : "shadow-none"
            }
          `}
        >
          {navLinks.map((link, idx) => {
            const isActive = link.targetId === activeSection

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="rounded-full"
              >
                <button
                  onClick={() => scrollToSection(link.targetId as SectionId)}
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                              text-sm font-medium transition-all duration-200 ease-out
                              ${isActive ? "bg-black/50" : ""}`}
                  aria-label={link.ariaLabel || link.label || undefined}
                >
                  <span
                    className={`flex items-center gap-2 ${
                      hoveredIdx === idx
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                        : "text-white"
                    }`}
                  >
                    {React.createElement(link.icon, {
                      size: 20,
                      color: hoveredIdx === idx ? "url(#nav-gradient)" : "#ffffff"
                    })}
                    {link.label && <span className="hidden sm:inline">{link.label}</span>}
                  </span>
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.nav>
    </>
  )
}