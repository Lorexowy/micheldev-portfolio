"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home, User, LayoutGrid, FileText, ImageIcon, Sun, Moon, Mail, Menu, X, type LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, type Variants } from "framer-motion"


interface NavLink {
  href: string
  label: string
  Icon: LucideIcon 
  ariaLabel?: string 
}

const links: NavLink[] = [
  { href: "#", label: "", Icon: Home, ariaLabel: "Strona główna" }, 
  { href: "#uslugi", label: "Usługi", Icon: LayoutGrid, ariaLabel: "Usługi" },
  { href: "#projekty", label: "Projekty", Icon: ImageIcon, ariaLabel: "Projekty" },
  { href: "#o-mnie", label: "O mnie", Icon: User, ariaLabel: "O mnie" },
  { href: "#wspolpraca", label: "Proces", Icon: FileText, ariaLabel: "Proces współpracy" },
  { href: "#kontakt", label: "Kontakt", Icon: Mail, ariaLabel: "Kontakt" },
]

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
  hidden: { opacity: 0, pointerEvents: "none" },
  visible: { opacity: 1, pointerEvents: "auto", transition: { duration: 0.3 } },
}


const mobileMenuPanelVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { type: "spring", stiffness: 300, damping: 30 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeHash, setActiveHash] = useState("") 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) 


  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined") {
      setActiveHash(window.location.hash)
      const handleHashChange = () => setActiveHash(window.location.hash)
      window.addEventListener("hashchange", handleHashChange)
      return () => window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
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

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

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
          lg:hidden fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3
          bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800
          transition-all duration-300 ease-out
          ${scrolled ? "shadow-md" : "shadow-none"}
        `}
      >
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
          aria-label="Strona główna"
        >
          <Home size={24} />
          <span className="sr-only">Strona główna</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
          onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicking outside
        >
          {/* Mobile Menu Panel */}
          <motion.div
            initial="hidden"
            animate={isMobileMenuOpen ? "visible" : "hidden"}
            variants={mobileMenuPanelVariants}
            className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-gray-950 h-full shadow-2xl p-6 flex flex-col rounded-l-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Zamknij menu nawigacyjne"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={navVariants} // Reuse navVariants for the mobile menu container
              className="flex flex-col gap-2 flex-grow"
            >
              {links.map((link, idx) => {
                // Skip the first link if it's just for the home icon in the main navbar
                if (link.href === "#" && link.label === "") {
                  return null
                }
                const isActive = link.href === activeHash || (link.href === "#" && activeHash === "")
                return (
                  <motion.div key={idx} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold
                                  transition-all duration-200 ease-out
                                  ${
                                    isActive
                                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  }`}
                      aria-label={link.ariaLabel || link.label || undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <link.Icon size={22} className={isActive ? "text-white" : "text-gray-600 dark:text-gray-400"} />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>
            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  toggleTheme()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold w-full justify-start
                           transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                aria-label="Przełącz motyw"
              >
                {mounted && theme === "dark" ? (
                  <Sun size={22} className="text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon size={22} className="text-gray-600 dark:text-gray-400" />
                )}
                <span>Przełącz motyw</span>
              </button>
            </div>
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
            bg-white/20 dark:bg-black/70
            backdrop-filter backdrop-blur-xl backdrop-saturate-150 backdrop-hue-rotate-10
            transition-all duration-300 ease-out
            ${
              scrolled
                ? "backdrop-blur-3xl backdrop-saturate-200 backdrop-hue-rotate-15 bg-white/30 dark:bg-black/40 shadow-md"
                : "shadow-none"
            }
          `}
        >
          {links.map((link, idx) => {
            // Sprawdzenie, czy link jest aktywny na podstawie hasha URL
            const isActive = link.href === activeHash || (link.href === "#" && activeHash === "")

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="rounded-full"
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                              text-sm font-medium transition-all duration-200 ease-out
                              ${isActive ? "bg-white/25 dark:bg-black/50" : ""}`} // Aktywny styl
                  aria-label={link.ariaLabel || link.label || undefined} // Dodano aria-label
                >
                  <span
                    className={`flex items-center gap-2 ${
                      hoveredIdx === idx
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                        : "text-white"
                    }`}
                  >
                    {/* Użycie komponentu Icon bezpośrednio z propem color */}
                    <link.Icon size={20} color={hoveredIdx === idx ? "url(#nav-gradient)" : "#ffffff"} />
                    {link.label && <span className="hidden sm:inline">{link.label}</span>}
                  </span>
                </Link>
              </motion.div>
            )
          })}

          {/* Theme toggle */}
          <motion.div
            variants={itemVariants}
            onMouseEnter={() => setHoveredIdx(links.length)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="pl-2 sm:pl-3 border-l border-white/40 dark:border-white/20 rounded-full"
          >
            <button
              onClick={toggleTheme}
              className="flex items-center p-1.5 sm:p-2 rounded-full transition-all duration-200 ease-out"
              aria-label="Przełącz motyw" // Dodano aria-label
            >
              {/* dopiero po mountingu odczytujemy theme */}
              {mounted && theme === "dark" ? (
                <Sun size={20} color={hoveredIdx === links.length ? "url(#nav-gradient)" : "#ffffff"} fill="none" />
              ) : mounted && theme === "light" ? (
                <Moon size={20} color={hoveredIdx === links.length ? "url(#nav-gradient)" : "#ffffff"} fill="none" />
              ) : (
                /* fallback domyślny we SSR: biała Moon */
                <Moon size={20} color="#ffffff" fill="none" />
              )}
            </button>
          </motion.div>
        </motion.div>
      </motion.nav>
    </>
  )
}
