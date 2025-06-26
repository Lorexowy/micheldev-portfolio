"use client"

import { Inter } from "next/font/google"
import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import AnimatedBackground from "@/components/ui/AnimatedBackground"
import { containerVariants, itemVariants } from "@/lib/animations"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function Hero() {
  const words = useMemo(
    () => [
      "wizualne",
      "graficzne",
      "mobilne",
      "cyfrowe",
      "internetowe",
      "komercyjne",
      "UX/UI",
    ],
    []
  )
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  // Typing animation logic
  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000)
        }
      }, 150)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1))
        if (displayText === "") {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }, 100)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex, words])

  return (
    <AnimatedBackground
      variant="hero"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-12 bg-gradient-to-br from-black via-gray-900 to-black ${inter.variable}`}
    >
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-2xl text-center"
      >
        <motion.div variants={itemVariants} className="mb-3">
          <h1 className="text-6xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-8xl font-extrabold text-white leading-tight">
            Michel
            <motion.span
              className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-[length:200%_200%]"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.05 }}
            >
              Dev
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-lg"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="w-60 h-px bg-white/20" />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
            Tworzę projekty
            <span className="inline-block min-w-[12ch] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:200%_200%]">
              {displayText}
              <motion.span
                style={{ borderRight: "2px solid white" }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </span>
          </h2>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed px-2"
        >
          Specjalizuję się w <span className="text-indigo-400 font-semibold">projektowaniu graficznym</span> i{' '}
          <span className="text-purple-400 font-semibold">tworzeniu stron internetowych</span>. Pomagam markom wyróżnić się
          poprzez kompleksowe rozwiązania wizualne. Sprawdź sam i rozpocznijmy współpracę!
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center items-center px-2">
          <motion.a
            href="#projekty"
            className="group relative w-full sm:w-auto px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
              </svg>
              Zobacz portfolio
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#kontakt"
            className="group relative w-full sm:w-auto px-5 py-2.5 border border-white/20 text-white font-semibold rounded-lg backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/30 text-center"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Rozpocznij projekt
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-lg"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </motion.section>
    </AnimatedBackground>
  )
}
