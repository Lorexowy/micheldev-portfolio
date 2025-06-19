// src/components/sections/Uslugi.tsx
import dynamic from "next/dynamic"
import React from "react"
import { motion, useMotionValue, useMotionTemplate } from "framer-motion"
import AnimatedBackground from "@/components/ui/AnimatedBackground"

const Paintbrush = dynamic(() => import("lucide-react").then(mod => mod.Paintbrush))
const Laptop = dynamic(() => import("lucide-react").then(mod => mod.Laptop))
const CheckCircle = dynamic(() => import("lucide-react").then(mod => mod.CheckCircle))

function ServiceCard({ icon: Icon, title, description, index }: { icon: React.ComponentType<any>, title: string, description: string, index: number }) {
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
          <Icon className="w-10 h-10 text-indigo-500 dark:text-indigo-200" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none"
        >
          {description.split(",").map((item, idx) => (
            <motion.li
              key={idx}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span>{item.trim()}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default function Uslugi() {
  const services = [
    {
      icon: Paintbrush,
      title: "Projektowanie graficzne",
      description:
        "Projektowanie logotypów, Identyfikacja wizualna, Branding, Materiały marketingowe, Grafiki social media, Plakaty / Reklamy / Banery",
    },
    {
      icon: Laptop,
      title: "Tworzenie stron internetowych",
      description:
        "Strony one-page, Strony multi-page, HTML / CSS / JS, Next.js, Responsywny design, Optymalizacja wydajności, Optymalizacja SEO, Wordpress",
    },
  ]

  return (
    <AnimatedBackground
      variant="section"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-950"
    >
      <section id="uslugi">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-50">Moje <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 bg-[length:200%_200%]">Usługi</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            {services.map((service, index) => (
              <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} index={index} />
            ))}
          </div>
        </div>
      </section>
    </AnimatedBackground>
  )
}