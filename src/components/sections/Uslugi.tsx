// src/components/sections/Uslugi.tsx
"use client"

import React from "react"
import { motion, useMotionValue, useMotionTemplate } from "framer-motion"
import { CheckCircle } from "lucide-react"

import AnimatedBackground from "@/components/ui/AnimatedBackground"
import { services } from "@/data/services"
import { Service } from "@/types"

interface ServiceCardProps {
  service: Service
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const highlight = useMotionTemplate`radial-gradient(circle at ${pointerX}px ${pointerY}px, rgba(255,255,255,0.2), transparent 80%)`

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set(e.clientX - rect.left)
    pointerY.set(e.clientY - rect.top)
  }
  
  const handleLeave = () => {
    pointerX.set(-100)
    pointerY.set(-100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div
        className="group relative overflow-hidden flex flex-col items-center text-center h-full p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-transparent rounded-lg shadow-md transition-all duration-300 ease-in-out"
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: highlight, opacity: 0.6 }}
        />
        
        <div className="flex justify-center mb-4">
          <service.icon className="w-10 h-10 text-indigo-500 dark:text-indigo-200" />
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {service.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {service.description}
        </p>
        
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ 
            hidden: {}, 
            visible: { transition: { staggerChildren: 0.1 } } 
          }}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none w-full"
        >
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              variants={{ 
                hidden: { opacity: 0, y: 10 }, 
                visible: { opacity: 1, y: 0 } 
              }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default function Uslugi() {
  return (
    <AnimatedBackground
      variant="section"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-950"
    >
      <section id="uslugi">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-50">
              Moje{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-[length:200%_200%]">
                Usługi
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Oferuję kompleksowe rozwiązania, które pomogą Twojej marce wyróżnić się w cyfrowym świecie.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.title} 
                service={service} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>
    </AnimatedBackground>
  )
}