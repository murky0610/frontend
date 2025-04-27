import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NewsAndEventsComponent() {
  // Manually added news and events data
  const newsAndEvents = [
    {
      id: 1,
      title: "PGC MINDANAO INTERNSHIP PROGRAM 2025",
      image: "/aavc_left_column.jpg?height=200&width=300",
      date: "August 2025",
      description:
        "Deadline: Second week of August 2025. Attention: All faculty members and students from Higher Education Institutions (HEIs) interested in training in fields related to genomics. Applications...",
      link: "#",
    },
    {
      id: 2,
      title: "CALL FOR EXPRESSIONS OF INTEREST (EOI) in 16S Metagenomic Training",
      image: "/aavc_left_column.jpg?height=200&width=300",
      date: "July 2025",
      description:
        "For Graduate Students, HEI Faculty Members, and Research Professionals. PGC Mindanao would like to announce training program in metagenomics this year. The program will be designed for...",
      link: "#",
    },
    {
      id: 3,
      title: "IN-HOUSE WORKSHOP ON SCP PAGE AND GEL STAINING",
      image: "/aavc_left_column.jpg?height=200&width=300",
      date: "June 2025",
      description:
        "PGC Mindanao hosted a one-day in-house workshop on SDS-PAGE and Gel Staining on June 15, 2025, at the Molecular Biology Laboratory of the University of the Philippines Mindanao...",
      link: "#",
    },
    {
      id: 4,
      title: "PGC Mindanao to conduct ELISA Workshop in Zamboanga City",
      image: "/aavc_left_column.jpg?height=200&width=300",
      date: "February 14, 2025",
      description:
        "Local researchers in collaboration with Mindanao State College with MSAT, Inc. will participate in a two-day hands-on workshop on ELISA (Enzyme-linked Immunosorbent Assay)...",
      link: "#",
    },
    {
      id: 5,
      title:
        "PGC Mindanao hosts 'Bringing Omics Closer to Zamboanga: Forum on Molecular Biology and Genomics' in Zamboanga City",
        image: "/aavc_left_column.jpg?height=200&width=300",
      date: "February 10, 2025",
      description:
        "Building more partnerships for the strategic spreading access to know-how in omics technologies, PGC Mindanao conducted a Forum on Molecular Biology and Omics...",
      link: "#",
    },
    {
      id: 6,
      title:
        "DAY 1: Customized Molecular Biology and Bioinformatics Training of Researchers from Mindanao State University Main Campus – Marawi",
        image: "/aavc_left_column.jpg?height=200&width=300",
      date: "January 2025",
      description:
        "PGC Mindanao has been conducting a 5-day customized molecular biology and bioinformatics training here at PGC Mindanao for researchers from MSU-Main...",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">NEWS AND EVENTS</h1>
          <div className="h-1 w-full bg-white/20 mt-2"></div>
        </div>
      </div>

      {/* News and Events Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsAndEvents.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                <p className="text-sm text-gray-700 mb-4">{item.description}</p>
                <Link
                  href={item.link}
                  className="inline-flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-800"
                >
                  READ MORE <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
