// src/components/ui/AnimatedBackground.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useMouseFollower, getMouseFollowerBackground } from "@/hooks/useMouseFollower"

interface AnimatedBackgroundProps {
  className?: string
  variant?: 'hero' | 'section' | 'minimal'
  children?: React.ReactNode
}

export default function AnimatedBackground({ 
  className = "", 
  variant = 'section',
  children 
}: AnimatedBackgroundProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const mousePosition = useMouseFollower()

  // Różne warianty dla różnych sekcji
  const getOrbConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          orb1: {
            className: "absolute top-1/4 left-1/4 w-64 h-64 md:w-80 lg:w-96 md:h-80 lg:h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl",
            animation: {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            },
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }
          },
          orb2: {
            className: "absolute bottom-1/4 right-1/4 w-48 h-48 md:w-64 lg:w-80 md:h-64 lg:h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl",
            animation: {
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            },
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }
          }
        }
      case 'section':
        return {
          orb1: {
            className: "absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl",
            animation: {
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            },
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }
          },
          orb2: {
            className: "absolute bottom-10 left-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl",
            animation: {
              scale: [1.1, 1, 1.1],
              opacity: [0.1, 0.2, 0.1],
            },
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }
          }
        }
      case 'minimal':
        return {
          orb1: {
            className: "absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-xl",
            animation: {
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1],
            },
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }
          },
          orb2: null // tylko jeden orb dla minimal
        }
      default:
        return { orb1: null, orb2: null }
    }
  }

  const orbConfig = getOrbConfig()

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        background: getMouseFollowerBackground(mousePosition),
      }}
    >
      {/* Dekoracyjne tło - ukryte przed screen readerami */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Pierwszy orb */}
        {orbConfig.orb1 && (
          <motion.div
            className={orbConfig.orb1.className}
            animate={orbConfig.orb1.animation}
            transition={orbConfig.orb1.transition}
            style={{ y: variant === 'hero' ? y1 : undefined }}
          />
        )}
        
        {/* Drugi orb */}
        {orbConfig.orb2 && (
          <motion.div
            className={orbConfig.orb2.className}
            animate={orbConfig.orb2.animation}
            transition={orbConfig.orb2.transition}
            style={{ y: variant === 'hero' ? y2 : undefined }}
          />
        )}
      </div>

      {/* Zawartość */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}