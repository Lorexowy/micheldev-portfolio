// src/components/sections/Hero.tsx
"use client"

import { Inter } from "next/font/google"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import AnimatedBackground from "@/components/ui/AnimatedBackground"
import { containerVariants, itemVariants } from "@/lib/animations"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function Hero() {
  const words = ["wizualne", "graficzne", "mobilne", "cyfrowe", "internetowe", "komercyjne", "UX/UI"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Logika animacji tekstu (bez zmian)
  useEffect(() => {
    const current = words[wordIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }, 150);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words]);

  return (
    <AnimatedBackground
      variant="hero"
      className={`min-h-screen flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-12 md:py-16 lg:py-0 bg-gradient-to-br from-black via-gray-900 to-black ${inter.variable}`}
    >
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center justify-center w-full">
          
          {/* Lewa strona - tekst */}
          <motion.div className="relative z-10 w-full lg:w-1/2 max-w-2xl text-center lg:text-left order-1 lg:order-1">

            <motion.div className="mb-3 md:mb-1" variants={itemVariants}>
              <h1 className="text-6xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-8xl font-extrabold text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                Michel
                <motion.span
                  className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-[length:200%_200%]"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  whileHover={{ scale: 1.05 }}
                >
                  Dev
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-lg"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 md:mb-8 flex justify-center lg:justify-start">
              <div className="w-60 h-px bg-white/20" />
            </motion.div>

            <motion.div className="mb-6 md:mb-8" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                Tworzę projekty{" "}
                <span className="inline-block min-w-[12ch] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:200%_200%]">
                  {displayText}
                  <motion.span
                    style={{ borderRight: "2px solid white" }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
            >
              Specjalizuję się w <span className="text-indigo-400 font-semibold">projektowaniu graficznym</span> i{" "}
              <span className="text-purple-400 font-semibold">tworzeniu stron internetowych</span>. Pomagam markom wyróżnić
              się poprzez kompleksowe rozwiązania wizualne. Sprawdź sam i rozpocznijmy współpracę!
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center lg:justify-start items-center px-2 sm:px-0"
            >
              <motion.a
                href="#projekty"
                className="group relative w-full sm:w-auto px-5 md:px-8 py-2.5 md:py-4 bg-white text-gray-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl text-center"
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
                className="group relative w-full sm:w-auto px-5 md:px-8 py-2.5 md:py-4 border border-white/20 text-white font-semibold rounded-lg backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/30 text-center"
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
          </motion.div>

          {/* Prawa strona - mockup (bez zmian) */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 w-full lg:w-1/2 hidden lg:flex justify-center items-center order-2 lg:order-2 mt-8 lg:mt-0"
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 overflow-hidden w-64 sm:w-72 md:w-80 lg:w-[340px] xl:w-[380px] h-48 sm:h-56 md:h-64 lg:h-80 xl:h-[500px] shadow-2xl"
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Cała zawartość mockupu bez zmian... */}
              <div className="flex items-center gap-2 mb-3 md:mb-4 p-1.5 md:p-2 bg-white/5 rounded-lg md:rounded-xl">
                <div className="flex gap-1.5 md:gap-2">
                  <motion.span
                    className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.span
                    className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-500 rounded-full cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.span
                    className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
                <div className="flex-1 h-4 md:h-6 bg-white/10 rounded-md md:rounded-lg relative overflow-hidden mx-2 md:mx-3">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs text-white/70 font-medium">
                    micheldev.websites
                  </span>
                </div>
              </div>

              <div className="space-y-2 md:space-y-4">
                <div className="h-12 md:h-16 lg:h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg md:rounded-xl p-2 md:p-3 border border-white/10">
                  <div className="h-2 md:h-3 bg-white/20 rounded-full w-3/4 mb-1 md:mb-2"></div>
                  <div className="h-1.5 md:h-2 bg-white/15 rounded-full w-1/2"></div>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {[0, 1, 2].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-10 md:h-12 lg:h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-md md:rounded-lg relative overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        y: -2,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2 md:space-y-3 px-1 md:px-2">
                  {[0.8, 0.6, 0.4].map((width, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 md:h-2 bg-white/10 rounded-full"
                      style={{ width: `${width * 100}%` }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="absolute top-2 md:top-4 right-2 md:right-4 w-8 h-8 md:w-10 lg:w-12 md:h-10 lg:h-12 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full backdrop-blur-sm border border-white/20"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              />

              <motion.div
                className="absolute bottom-3 md:bottom-6 left-2 md:left-4 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full backdrop-blur-sm border border-white/20"
                animate={{
                  y: [0, -5, 0],
                  x: [0, 3, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-t from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </motion.div>

        </div>
      </motion.section>
    </AnimatedBackground>
  )
}