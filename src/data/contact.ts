// src/data/contact.ts
import { 
  Mail, 
  Phone, 
  Instagram, 
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle
} from "lucide-react"
import { ContactInfo, SocialLink, FAQItem } from '@/types'

// Informacje kontaktowe
export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "mateusz.michel7@gmail.com",
    href: "mailto:mateusz.michel7@gmail.com",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+48 519 430 169",
    href: "tel:+48519430169",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@michelwebdev",
    href: "https://www.instagram.com/michelwebdev?igsh=MTBxYW9lY2w1dmk4MQ%3D%3D&utm_source=qr",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Clock,
    label: "Czas odpowiedzi",
    value: "Do 24 godzin",
    href: "#",
    color: "from-purple-500 to-indigo-500"
  }
]

// Social media links do udostępniania
export const socialShareLinks: SocialLink[] = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/sharer/sharer.php?u=",
    color: "hover:text-blue-600"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/intent/tweet?url=",
    color: "hover:text-sky-500"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    color: "hover:text-blue-700"
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/?text=",
    color: "hover:text-green-600"
  }
]

// FAQ
export const faqData: FAQItem[] = [
  {
    question: "Ile czasu zajmuje realizacja projektu?",
    answer: "Czas realizacji zależy od skomplikowania projektu. Proste strony one-page to 1-2 tygodnie, bardziej złożone projekty mogą zająć 3-6 tygodni. Zawsze ustalamy konkretny harmonogram podczas pierwszej konsultacji."
  },
  {
    question: "Czy oferujesz wsparcie techniczne po ukończeniu projektu?",
    answer: "Tak! Każdy projekt zawiera 30 dni bezpłatnego wsparcia technicznego. Po tym okresie oferuję pakiety serwisowe dostosowane do potrzeb klienta, w tym aktualizacje, kopie zapasowe i drobne modyfikacje."
  },
  {
    question: "Jakie są koszty realizacji strony internetowej?",
    answer: "Ceny zależą od zakresu projektu. Proste strony zaczynają się od 1000 zł, bardziej zaawansowane projekty e-commerce czy aplikacje webowe to koszt od 5000 zł wzwyż. Każda wycena jest indywidualna i transparentna."
  },
  {
    question: "Czy projektujesz strony responsywne?",
    answer: "Absolutnie! Wszystkie moje projekty są w pełni responsywne i dostosowane do urządzeń mobilnych, tabletów i komputerów. Testuję każdą stronę na różnych urządzeniach, aby zapewnić optymalne doświadczenie użytkownika."
  }
]

// Utility functions
export const getContactByLabel = (label: string): ContactInfo | undefined =>
  contactInfo.find(contact => contact.label === label)

export const getFAQByQuestion = (question: string): FAQItem | undefined =>
  faqData.find(faq => faq.question === question)