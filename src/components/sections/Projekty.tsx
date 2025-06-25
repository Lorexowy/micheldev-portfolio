"use client"

import React, { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { motion, useInView, Variants } from 'framer-motion'

import AnimatedBackground from "@/components/ui/AnimatedBackground"
import { projects } from "@/data/projects"
import { Project } from "@/types"

// UPROSZCZONE ANIMACJE z prawidłowymi typami
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
}

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'tween',
      duration: 0.3,
      ease: 'easeOut'
    } 
  }
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={card}
      className="relative flex flex-col overflow-hidden rounded-xl border border-white/30 bg-white/40 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-200 dark:border-gray-800/30 dark:bg-gray-900/40"
    >
      <div className="relative w-full h-48">
        <Image
          src={project.image}
          alt={`Podgląd projektu ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
          loading="lazy"
          quality={75}
        />
        {project.category && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-indigo-500/90 text-white text-xs rounded-full">
            {project.category === 'website' ? 'Strona web' : 
             project.category === 'graphics' ? 'Grafika' : 'Branding'}
          </div>
        )}
      </div>
      
      <div className="flex-grow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <Link
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Sprawdź
        </Link>
      </div>
    </motion.div>
  )
}

export default function Projekty() {
  const ref = React.useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.2, once: true })

  const memoizedProjects = useMemo(() => 
    projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    )), [])

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
        animate={inView ? "show" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={card}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-50">
              Moje{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-[length:200%_200%]">
                Projekty
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Poznaj wybrane realizacje, które odzwierciedlają moje podejście do projektowania i programowania.
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {memoizedProjects}
          </motion.div>

          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">
                Nowe projekty wkrótce...
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </AnimatedBackground>
  )
}