// src/components/sections/Wspolpraca.tsx
"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"
import { MessageCircle, Calculator, Wrench, Rocket, CheckCircle, ArrowRight } from "lucide-react"
import AnimatedBackground from "@/components/ui/AnimatedBackground"

interface Step {
  id: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  details: string[]
  duration: string
  color: string
}

const steps: Step[] = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Kontakt i omówienie potrzeb",
    description: "Poznajemy się i omawiamy Twoją wizję projektu",
    details: [
      "Bezpłatna konsultacja",
      "Analiza wymagań",
      "Określenie celów projektu",
      "Wybór najlepszego rozwiązania"
    ],
    duration: "",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    icon: Calculator,
    title: "Wycena i harmonogram",
    description: "Przygotowuję szczegółową ofertę i plan realizacji",
    details: [
      "Transparentna wycena",
      "Szczegółowy harmonogram",
      "Podpisanie umowy",
      "Ustalenie kamieni milowych"
    ],
    duration: "",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    icon: Wrench,
    title: "Realizacja projektu",
    description: "Tworzę Twój projekt z regularnym feedbackiem",
    details: [
      "Regularne aktualizacje postępu",
      "Możliwość wprowadzania zmian",
      "Testy i optymalizacja",
      "Prezentacja wersji roboczych"
    ],
    duration: "",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    icon: Rocket,
    title: "Wdrożenie i wsparcie",
    description: "Uruchamiamy projekt i zapewniam dalsze wsparcie",
    details: [
      "Wdrożenie i publikacja",
      "Szkolenie z obsługi",
      "30 dni bezpłatnego wsparcia",
      "Możliwość rozwoju projektu"
    ],
    duration: "",
    color: "from-orange-500 to-red-500"
  }
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

const stepVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
}

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
}

export default function Wspolpraca() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Progress dla centralnej linii - animuje się wraz ze scrollowaniem
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
  
  const isInView = useInView(containerRef, { 
    amount: 0.2,
    once: true 
  })

  // Parallax efekty
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Stwórz wszystkie stepProgress na raz
  const stepProgress0 = useTransform(lineProgress, [0.2, 0.25], [0, 1])
  const stepProgress1 = useTransform(lineProgress, [0.45, 0.5], [0, 1])
  const stepProgress2 = useTransform(lineProgress, [0.7, 0.75], [0, 1])
  const stepProgress3 = useTransform(lineProgress, [0.95, 1], [0, 1])
  
  const stepProgressArray = [stepProgress0, stepProgress1, stepProgress2, stepProgress3]

  // Przygotuj wszystkie dodatkowe transforms na poziomie komponentu
  const rippleScale0 = useTransform(stepProgress0, [0.8, 1], [1, 2])
  const rippleOpacity0 = useTransform(stepProgress0, [0.8, 1], [0.5, 0])
  const borderScale0 = useTransform(stepProgress0, [0.8, 1], [1, 1.8])
  const borderOpacity0 = useTransform(stepProgress0, [0.8, 1], [0.8, 0])

  const rippleScale1 = useTransform(stepProgress1, [0.8, 1], [1, 2])
  const rippleOpacity1 = useTransform(stepProgress1, [0.8, 1], [0.5, 0])
  const borderScale1 = useTransform(stepProgress1, [0.8, 1], [1, 1.8])
  const borderOpacity1 = useTransform(stepProgress1, [0.8, 1], [0.8, 0])

  const rippleScale2 = useTransform(stepProgress2, [0.8, 1], [1, 2])
  const rippleOpacity2 = useTransform(stepProgress2, [0.8, 1], [0.5, 0])
  const borderScale2 = useTransform(stepProgress2, [0.8, 1], [1, 1.8])
  const borderOpacity2 = useTransform(stepProgress2, [0.8, 1], [0.8, 0])

  const rippleScale3 = useTransform(stepProgress3, [0.8, 1], [1, 2])
  const rippleOpacity3 = useTransform(stepProgress3, [0.8, 1], [0.5, 0])
  const borderScale3 = useTransform(stepProgress3, [0.8, 1], [1, 1.8])
  const borderOpacity3 = useTransform(stepProgress3, [0.8, 1], [0.8, 0])

  const rippleScaleArray = [rippleScale0, rippleScale1, rippleScale2, rippleScale3]
  const rippleOpacityArray = [rippleOpacity0, rippleOpacity1, rippleOpacity2, rippleOpacity3]
  const borderScaleArray = [borderScale0, borderScale1, borderScale2, borderScale3]
  const borderOpacityArray = [borderOpacity0, borderOpacity1, borderOpacity2, borderOpacity3]

  return (
    <AnimatedBackground
      variant="section"
      className="py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <motion.section
        ref={containerRef}
        id="wspolpraca"
        className="max-w-7xl mx-auto relative"
      >
        {/* Dekoracyjne elementy tła */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Nagłówek sekcji */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-50">
            Jak wygląda{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:200%_200%]">
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                współpraca?
              </motion.span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Każdy projekt realizuję według sprawdzonego procesu, który gwarantuje najwyższą jakość 
            i pełną satysfakcję klienta
          </motion.p>
        </motion.div>

        {/* Timeline z krokami */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Minimalistyczna linia postępu - tylko na desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full transform -translate-x-1/2">
            {/* Tło linii */}
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full" />
            
            {/* Aktywna część linii, która podświetla się ze scrollowaniem */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full origin-top"
              style={{ 
                scaleY: lineProgress,
                transformOrigin: "top"
              }}
            />
          </div>

          {/* Kroki procesu */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const stepProgress = stepProgressArray[index]
              const rippleScale = rippleScaleArray[index]
              const rippleOpacity = rippleOpacityArray[index]
              const borderScale = borderScaleArray[index]
              const borderOpacity = borderOpacityArray[index]
              
              return (
                <motion.div
                  key={step.id}
                  variants={stepVariants}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                {/* Karta kroku */}
                <motion.div
                  className="flex-1 group relative"
                >
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden">
                    {/* Gradient overlay na hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    <div className="relative z-10">
                      {/* Header karty */}
                      <div className="flex items-start gap-4 mb-6">
                        <motion.div
                          variants={iconVariants}
                          className={`relative p-3 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5
                          }}
                        >
                          <step.icon className="w-6 h-6 text-white" />
                          
                          {/* Animowany pierścień wokół ikony */}
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-white/30"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-bold`}>
                              {step.id}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Lista szczegółów */}
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="space-y-3"
                      >
                        {step.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 }
                            }}
                            className="flex items-center gap-3 group/item"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                              {detail}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Centralny punkt na linii - tylko na desktop */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      delay: index * 0.2 + 0.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className={`relative w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 z-10`}
                  >
                    {/* Animacja gdy kropka dojdzie do punktu */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color}`}
                      style={{
                        scale: stepProgress,
                        opacity: stepProgress
                      }}
                    />
                    
                    {/* Pulsujący pierścień gdy punkt jest aktywny */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color}`}
                      style={{
                        scale: rippleScale,
                        opacity: rippleOpacity
                      }}
                    />
                    
                    {/* Dodatkowy pierścień dla efektu ripple */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2`}
                      style={{
                        borderColor: `rgb(${step.color.includes('blue') ? '59 130 246' : 
                                          step.color.includes('purple') ? '147 51 234' :
                                          step.color.includes('green') ? '34 197 94' :
                                          '249 115 22'})`,
                        scale: borderScale,
                        opacity: borderOpacity
                      }}
                    />
                  </motion.div>
                </div>

                {/* Spacer dla layoutu */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 lg:mt-24"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Rozpocznijmy współpracę
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-gray-600 dark:text-gray-400 mt-4"
          >
            Bezpłatna konsultacja w ciągu 24h
          </motion.p>
        </motion.div>
      </motion.section>
    </AnimatedBackground>
  )
}