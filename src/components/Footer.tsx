// src/components/Footer.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { 
  Mail, 
  Phone, 
  Instagram, 
  Home, 
  LayoutGrid, 
  ImageIcon, 
  MessageCircle,
  X,
  Shield,
  Eye,
  Lock,
  FileText
} from "lucide-react"

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  }
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

function PrivacyPolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Polityka Prywatności
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm">
                    <strong>Ostatnia aktualizacja:</strong> {new Date().toLocaleDateString('pl-PL')}
                  </p>
                </div>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Administrator danych
                  </h3>
                  <p className="leading-relaxed">
                    Administratorem Twoich danych osobowych jest <strong>Mateusz Michel</strong> - osoba fizyczna 
                    świadcząca usługi projektowania graficznego i tworzenia stron internetowych pod nazwą MichelDev. 
                  </p>
                  <p className="mt-2">
                    Kontakt:{" "}
                    <a href="mailto:mateusz.michel7@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      mateusz.michel7@gmail.com
                    </a>
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Jakie dane zbieramy
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white">Formularz kontaktowy:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        <li>Imię i nazwisko</li>
                        <li>Adres e-mail</li>
                        <li>Temat wiadomości</li>
                        <li>Treść wiadomości</li>
                      </ul>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Dane z formularza będą przetwarzane po wdrożeniu funkcjonalności wysyłania
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white">Vercel Web Analytics:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        <li>Liczba odwiedzin stron (anonimowe page views)</li>
                        <li>Metryki wydajności strony (Core Web Vitals)</li>
                        <li>Podstawowe informacje o przeglądarce i urządzeniu</li>
                        <li>Kraj/region odwiedzającego (bez dokładnej lokalizacji)</li>
                        <li>Źródła ruchu (referrery)</li>
                      </ul>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        <strong>Analytics są teraz aktywne</strong> - dane są całkowicie anonimowe i zgodne z GDPR
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Cel i podstawa prawna
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">📧 Formularz kontaktowy:</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        <strong>Cel:</strong> Odpowiedź na zapytania i nawiązanie współpracy<br/>
                        <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f RODO (uzasadniony interes) - prowadzenie korespondencji handlowej
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-800 dark:text-green-300">📊 Vercel Web Analytics:</h4>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                        <strong>Cel:</strong> Analiza ruchu, optymalizacja strony i poprawa doświadczeń użytkowników<br/>
                        <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f RODO (uzasadniony interes) - analiza funkcjonowania strony
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Twoje prawa
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-800 dark:text-green-300">Masz prawo do:</h4>
                      <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-400 mt-1">
                        <li>Dostępu do danych</li>
                        <li>Ich sprostowania</li>
                        <li>Usunięcia</li>
                        <li>Ograniczenia przetwarzania</li>
                        <li>Sprzeciwu</li>
                        <li>Przenoszenia danych</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">Skarga do UODO:</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        Masz prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Cookies i technologie śledzące
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-medium text-purple-800 dark:text-purple-300">🍪 Cookies funkcjonalne (lokalne):</h4>
                      <ul className="text-sm text-purple-700 dark:text-purple-400 mt-1 space-y-1">
                        <li>• Przechowowanie preferencji motywu (jasny/ciemny tryb)</li>
                        <li>• Podstawowe funkcjonowanie strony</li>
                      </ul>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                        Te cookies są niezbędne dla działania strony - nie wymagają zgody
                      </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <h4 className="font-medium text-indigo-800 dark:text-indigo-300">📈 Vercel Web Analytics:</h4>
                      <ul className="text-sm text-indigo-700 dark:text-indigo-400 mt-1 space-y-1">
                        <li>• Zbieranie statystyk odwiedzin bez cookies identyfikujących</li>
                        <li>• Analiza wydajności strony (Core Web Vitals)</li>
                        <li>• Anonimowe dane geograficzne (kraj/region)</li>
                        <li>• Źródła ruchu i popularne strony</li>
                        <li>• Brak profilowania użytkowników</li>
                        <li>• Zgodne z GDPR bez konieczności wyrażania zgody</li>
                      </ul>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium">
                        Analytics działają od {new Date().toLocaleDateString('pl-PL')}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Czego NIE używamy:</strong> Cookies reklamowe, śledzące, marketingowe, 
                        social media widgets, Google Analytics, Facebook Pixel
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Okres przechowywania danych
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-medium text-orange-800 dark:text-orange-300">📧 Dane z formularza kontaktowego:</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                        • Do czasu zrealizowania zapytania/zakończenia korespondencji<br/>
                        • Następnie przez <strong>3 lata</strong> na potrzeby ewentualnych roszczeń<br/>
                        • Możliwość wcześniejszego usunięcia na żądanie
                      </p>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg border border-teal-200 dark:border-teal-800">
                      <h4 className="font-medium text-teal-800 dark:text-teal-300">📊 Dane analytics:</h4>
                      <p className="text-sm text-teal-700 dark:text-teal-400 mt-1">
                        • Przechowywane przez Vercel zgodnie z ich polityką prywatności<br/>
                        • Maksymalnie <strong>24 miesiące</strong> (dane anonimowe)<br/>
                        • Automatyczne usuwanie starszych danych<br/>
                        • Możliwość wyłączenia analytics w ustawieniach Vercel
                      </p>
                      <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">
                        Dane analytics są obecnie zbierane i przetwarzane
                      </p>
                    </div>
                  </div>
                </section>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📞 Kontakt w sprawach RODO:</h4>
                  <p className="text-sm text-center">
                    <strong>Mateusz Michel</strong><br/>
                    Email: <a href="mailto:mateusz.michel7@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      mateusz.michel7@gmail.com
                    </a><br/>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Odpowiedź w ciągu 30 dni zgodnie z RODO
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Footer() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "mateusz.michel7@gmail.com",
      href: "mailto:mateusz.michel7@gmail.com"
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+48 519 430 169",
      href: "tel:+48519430169"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@michelwebdev",
      href: "https://www.instagram.com/michelwebdev?igsh=MTBxYW9lY2w1dmk4MQ%3D%3D&utm_source=qr"
    }
  ]

  const navLinks = [
    { href: "#", label: "Strona główna", icon: Home },
    { href: "#uslugi", label: "Usługi", icon: LayoutGrid },
    { href: "#projekty", label: "Projekty", icon: ImageIcon },
    { href: "#kontakt", label: "Kontakt", icon: MessageCircle }
  ]

  return (
    <>
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800"
      >
        {/* Dekoracyjny gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Kolumna 1: Branding + Opis */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Michel<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Dev</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Tworzę nowoczesne strony internetowe i projekty graficzne, 
                które wyróżniają marki w cyfrowym świecie.
              </p>

            </motion.div>

            {/* Kolumna 2: Kontakt */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skontaktuj się
              </h4>
              <div className="space-y-3">
                {contactLinks.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <contact.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{contact.value}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Kolumna 3: Nawigacja */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Nawigacja
              </h4>
              <div className="space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div key={index}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                    >
                      <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Separator */}
          <motion.div 
            variants={itemVariants}
            className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
          />

          {/* Dolna sekcja - Copyright + Polityka */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} MichelDev. Wszelkie prawa zastrzeżone.
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-sm text-gray-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                Polityka prywatności
              </button>
            </div>
          </motion.div>
        </div>

        {/* Subtelne podświetlenie na hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.footer>

      {/* Modal Polityki Prywatności */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </>
  )
}