import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

// Przykładowe dane projektów. Zastąp je swoimi rzeczywistymi projektami.
const projects = [
  {
    id: 1,
    title: "VGEO",
    description:
      "Kompleksowa platforma e-commerce z systemem płatności, zarządzaniem produktami i kontami użytkowników.",
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "VOYAGER - Polska Galanteria Skórzana",
    description: "Responsywny blog z systemem zarządzania treścią (CMS), kategoriami i wyszukiwaniem.",
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Nitką i Szydełkiem",
    description:
      "Intuicyjna aplikacja do zarządzania zadaniami z funkcjami tworzenia, edycji i oznaczania zadań jako ukończone.",
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "#",
  }
]

export default function Projekty() {
  return (
    <section id="projekty" className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-white">Moje Projekty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
