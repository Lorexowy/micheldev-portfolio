// src/components/sections/Projekty.tsx
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import AnimatedBackground from "@/components/ui/AnimatedBackground"
import { motion, useAnimation, Variants, useInView } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "VGEO",
    description:
      "Multi-page strona internetowa stworzona dla firmy geodezyjnej VGEO",
    image: "/images/vgeoweb.png",
    liveUrl: "http://www.vgeo.pl",
  },
  {
    id: 2,
    title: "VOYAGER - Polska Galanteria Skórzana",
    description: "Multi-page strona internetowa stworzona dla firmy kaletniczej VOYAGER",
    image: "/images/voyagersopelweb.png",
    liveUrl: "https://voyagersopel.pl",
  },
  {
    id: 3,
    title: "Nitką i Szydełkiem",
    description:
      "One-page strona internetowa stworzona dla osoby prywatnej zajmującej się rękodziełem",
    image: "/images/nitkaiszydelkiemweb.png",
    liveUrl: "https://nitkaiszydelkiem.pl",
  }
]

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
}

const card: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
}

export default function Projekty() {
  const controls = useAnimation()
  const ref = React.useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.2 })

  React.useEffect(() => {
    if (inView) controls.start('show')
  }, [controls, inView])

  return (
    <AnimatedBackground
      variant="section"
      className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <motion.section
        ref={ref}
        id="projekty"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-50">Moje <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-[length:200%_200%]">Projekty</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={card}
                whileHover={{ scale: 1.03 }}
                className="relative flex flex-col overflow-hidden rounded-xl border border-white/30 bg-white/40 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-gray-800/30 dark:bg-gray-900/40"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`Podgląd projektu ${project.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="flex-grow p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{project.description}</p>
                </div>
                <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Sprawdź
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatedBackground>
  )
}