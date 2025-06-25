// src/components/sections/Kontakt.tsx
"use client"

import React, { useState, useRef } from "react"
import { motion, useInView, Variants, AnimatePresence } from "framer-motion"
import emailjs from '@emailjs/browser'
import { 
  Send, 
  Share2,
  ChevronDown,
  CheckCircle,
  AlertCircle
} from "lucide-react"

import AnimatedBackground from "@/components/ui/AnimatedBackground"
import { contactInfo, socialShareLinks, faqData } from "@/data/contact"
import { ContactFormData } from "@/types"

// EmailJS configuration - przenieś to do .env w przyszłości
const EMAILJS_SERVICE_ID = "service_38manau"
const EMAILJS_TEMPLATE_ID = "template_5bit5fm"  
const EMAILJS_PUBLIC_KEY = "zacMgwhSoVuiEfIqg"

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Reset status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'mateusz.michel7@gmail.com'
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', response)
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setFormData({ name: "", email: "", subject: "", message: "" })

    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitStatus('error')
      setErrorMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio: mateusz.michel7@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      variants={cardVariants}
      onSubmit={handleSubmit}
      className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-white/10 dark:border-gray-700/30 rounded-2xl p-8 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Imię i nazwisko
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            placeholder="Jan Kowalski"
            required
          />
        </motion.div>

        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            placeholder="jan@przykład.pl"
            required
          />
        </motion.div>
      </div>

      <motion.div
        whileFocus={{ scale: 1.02 }}
        className="space-y-2 mb-6"
      >
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Temat
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          placeholder="Nowa strona internetowa"
          required
        />
      </motion.div>

      <motion.div
        whileFocus={{ scale: 1.02 }}
        className="space-y-2 mb-8"
      >
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
          placeholder="Opisz swój projekt..."
          required
        />
      </motion.div>

      {/* Checkbox zgody na przetwarzanie danych */}
      <motion.div
        variants={itemVariants}
        className="mb-6"
      >
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="dataConsent"
            required
            className="mt-1 w-4 h-4 text-indigo-600 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 focus:ring-2 transition-all duration-200 accent-indigo-600"
          />
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Wysyłając formularz wyrażasz zgodę na przetwarzanie podanych danych osobowych (imię i nazwisko, adres e-mail, temat i treść wiadomości){" "}
              przez <strong>MichelDev</strong> w celu odpowiedzi na zapytanie oraz prowadzenia korespondencji handlowej.
              Zgoda jest dobrowolna i może zostać cofnięta w każdym czasie.{" "}
              <button
                type="button"
                onClick={() => {
                  // Scroll to footer where privacy policy link is
                  const footer = document.querySelector('footer');
                  if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline font-medium"
              >
                Szczegóły w Polityce prywatności
              </button>*
            </p>
          </div>
        </label>
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          submitStatus === 'success' 
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
            : submitStatus === 'error'
            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Wysyłanie...
            </motion.div>
          ) : submitStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Wiadomość wysłana!
            </motion.div>
          ) : submitStatus === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              Spróbuj ponownie
            </motion.div>
          ) : (
            <motion.div
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Wyślij wiadomość
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Dziękuję za wiadomość!</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              Odpowiem na Twój email w ciągu 24 godzin.
            </p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Błąd wysyłania</span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              {errorMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}

function ContactInfo() {
  const [currentUrl, setCurrentUrl] = useState('')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  return (
    <motion.div
      variants={cardVariants}
      className="space-y-6"
    >
      <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-white/10 dark:border-gray-700/30 rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Skontaktuj się ze mną
        </h3>
        
        <div className="space-y-4">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-4 p-4 bg-white/30 dark:bg-gray-900/30 rounded-xl hover:bg-white/40 dark:hover:bg-gray-900/40 transition-all duration-300"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-3 bg-gradient-to-r ${item.color} rounded-lg text-white shadow-lg`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Social Share Section */}
      <motion.div
        variants={cardVariants}
        className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-white/10 dark:border-gray-700/30 rounded-2xl p-8 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Udostępnij mnie
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Pomóż mi dotrzeć do większej liczby osób!
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {socialShareLinks.map((social, index) => (
            <motion.a
              key={index}
              href={currentUrl ? `${social.url}${encodeURIComponent(currentUrl)}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-3 bg-white/30 dark:bg-gray-900/30 rounded-lg hover:bg-white/40 dark:hover:bg-gray-900/40 transition-all duration-300 ${social.color} ${!currentUrl ? 'opacity-50 pointer-events-none' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-white/10 dark:border-gray-700/30 rounded-2xl p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Często zadawane pytania
      </h3>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
            initial={false}
          >
            <motion.button
              className="w-full p-6 text-left bg-white/30 dark:bg-gray-900/30 hover:bg-white/40 dark:hover:bg-gray-900/40 transition-all duration-200 flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <span className="font-semibold text-gray-900 dark:text-white pr-4">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white/20 dark:bg-gray-900/20 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Kontakt() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { amount: 0.2, once: true })

  return (
    <AnimatedBackground
      variant="section"
      className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950"
    >
      <motion.section
        ref={containerRef}
        id="kontakt"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Header sekcji */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-50">
            Porozmawiajmy o Twoim{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:200%_200%]">
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                projekcie
              </motion.span>
            </span>
          </h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Gotowy na realizację swojego pomysłu? Skontaktuj się ze mną już dziś 
            i stwórzmy coś wyjątkowego razem!
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Formularz kontaktowy */}
          <div>
            <ContactForm />
          </div>

          {/* Informacje kontaktowe */}
          <div>
            <ContactInfo />
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants}>
          <FAQ />
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Pracuję zdalnie z całą Polską
            </span>
          </motion.div>
        </motion.div>
      </motion.section>
    </AnimatedBackground>
  )
}