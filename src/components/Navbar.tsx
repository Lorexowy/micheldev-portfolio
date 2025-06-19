"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home, User, LayoutGrid, FileText, ImageIcon, Sun, Moon, Mail, type LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, type Variants } from "framer-motion"

// Zmieniono strukturę linków, aby przechowywać referencje do komponentów ikon
interface NavLink {
  href: string
  label: string
  Icon: LucideIcon // Zamiast JSX, przechowujemy referencję do komponentu ikony
  ariaLabel?: string // Dodano opcjonalny ariaLabel
}

const links: NavLink[] = [
  { href: "#", label: "", Icon: Home, ariaLabel: "Strona główna" }, // Dodano ariaLabel
  { href: "#uslugi", label: "Usługi", Icon: LayoutGrid, ariaLabel: "Usługi" },
  { href: "#projekty", label: "Projekty", Icon: ImageIcon, ariaLabel: "Projekty" },
  { href: "#o-mnie", label: "O mnie", Icon: User, ariaLabel: "O mnie" },
  { href: "#wspolpraca", label: "Proces", Icon: FileText, ariaLabel: "Proces współpracy" },
  { href: "#kontakt", label: "Kontakt", Icon: Mail, ariaLabel: "Kontakt" }, // Zmieniono ikonę na Mail
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeHash, setActiveHash] = useState("") // Stan dla aktywnego hasha URL

  // Gdy już na kliencie
  useEffect(() => {
    setMounted(true)
    // Ustawienie początkowego aktywnego hasha
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

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed inset-x-0 top-4 flex justify-center z-50 pointer-events-none"
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
