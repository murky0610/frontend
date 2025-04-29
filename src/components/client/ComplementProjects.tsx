import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Facebook, Calendar } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Fish } from "lucide-react"
// Updated project data with actual information
const projects = [
  {
    id: 1,
    name: "Enhancing the Efficiency of the Location-based Logistics of the Timber Supply Chains in Caraga and Davao Regions Using Spatial Econometrics [PCAARRD-GIA]",
    duration: "June 1, 2024 - November 30, 2025",
    description:
      "The project aims to analyze the current logistical networks and resources for the timber supply chains in the Caraga and Davao Regions, and formulate an evidence-based strategic plan and policy frameworks for efficient logistical networks. It will map current networks, determine factors affecting logistics, analyze efficiency, identify areas for improvement, and provide policy recommendations. The AAVC lab facility will store the project database and support spatial analysis embedded in GIS and remote sensing tools.",
    logo: "/Partners Logo/PCAARRD-logo.png?height=80&width=80",
    websiteUrl: "https://example.com/project-alpha",
    facebookUrl: "https://facebook.com/project-alpha",
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Developing a Point of Catch-to-Plate Traceability System for Tuna in the Davao Region",
    duration: "March 1, 2022 - March 31, 2024",
    description:
      "The project developed a mobile traceability application for the tuna supply chain, incorporating food safety practices. It identified key data elements and critical tracking events with reference to BFAR standards. The app has been pilot-tested among fisherfolks and traders in Mati City, with 17 fishers actively recording tuna catch. The plan is to host the app, in collaboration with BFAR, to AAVC Lab.",
      logo: "/Partners Logo/BFAR-logo.png?height=80&width=80",
    websiteUrl: "https://www.researchgate.net/publication/320262859_Developing_a_Traceability_System_for_Tuna_Supply_Chains",
    facebookUrl: null,
    status: "Completed",
  },
  {
    id: 3,
    name: "Development of Traceability System for Cacao in Southern Philippines [PCAARRD-GIA]",
    duration: "March 16, 2023 - March 15, 2025",
    description:
      "The project aims to develop and implement a Transparent Traceability System for cacao in Southern Philippines. It will design a distributed ledger technology traceability system, pilot-test methods for capturing key data elements, develop risk management strategies, build linkages across the supply chain, and institutionalize the implementation of the cacao traceability system. The AAVC Lab will link the traceability system to be developed.",
      logo: "/Partners Logo/PCAARRD-logo.png?height=80&width=80",
    websiteUrl: null,
    facebookUrl: "https://facebook.com/gamma-solutions",
    status: "Ongoing",
  },
  {
    id: 4,
    name: "Integrating Blockchain Technology for Traceability in the Shrimp Industry's Food Supply Chain in Sarangani Province and General Santos City [PCAARRD-GIA]",
    duration: "March 1, 2025 – February 28, 2027",
    description:
      "This project addresses the demand for verifiable sources of sustainably-raised, clean, and healthy shrimp through a blockchain-based traceability system. It will conduct a comprehensive value chain analysis, design blockchain architecture, implement a decentralized application through smart contracts, and conduct system tests. The AAVC Lab will link the traceability system to be developed in the Mindanao State University.",
      logo: "/Partners Logo/PCAARRD-logo.png?height=80&width=80",
    websiteUrl: "https://example.com/delta-tech",
    facebookUrl: "https://facebook.com/delta-tech",
    status: "Newly Approved",
  },
  {
    id: 5,
    name: "Improving the enabling environment to effectively scale Good Agriculture/Aquaculture Practice (GAP) in the Philippines [ACIAR x PCAARRD]",
    duration: "2025 (Ongoing Packaging)",
    description:
      "The proposal aims to build an understanding of both the public and private enabling environment that supports the scaling of good practice in agricultural and aquaculture sectors in the Philippines. This understanding will support developing approaches for both public and private sectors to sustainably scale GAP through effective impact pathways. The AAVC lab will support and will be the partnering agency with the University of Western Australia.",
      logo: "/Partners Logo/ACIAR-PCAARD-logo.png?height=80&width=80",
    websiteUrl: "https://example.com/epsilon-ventures",
    facebookUrl: "https://facebook.com/epsilon-ventures",
    status: "Ongoing Packaging",
  },
  {
    id: 6,
    name: "Developing a Point-of-Catch-to-Plate Traceability System for Blue Swimming Crab in Mindanao [PCAARRD-GIA]",
    duration: "2025 (Ongoing Packaging)",
    description:
      "Similar to the tuna traceability system, a blue swimming crab traceability system will be developed. It will involve the development of a digital traceability system in the blue swimming supply chain to meet quality and safety standards for blue swimming crab of the key markets. The system is being developed to be institutionalized within the local government units to support policy compliance while promoting economic growth.",
      logo: "/Partners Logo/PCAARRD-logo.png?height=80&width=80",
    websiteUrl: "https://example.com/zeta-partners",
    facebookUrl: null,
    status: "Ongoing Packaging",
  },
]

export default function ComplementaryProjects() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Complementary Projects</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our network of complementary projects and initiatives that enhance the capabilities of the AAVC Lab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={project.logo || "/placeholder.svg?height=80&width=80"}
                    alt={`${project.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <Badge
                    className="mb-2"
                    variant={
                      project.status === "Completed"
                        ? "secondary"
                        : project.status === "Ongoing"
                          ? "default"
                          : project.status === "Newly Approved"
                            ? "success"
                            : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{project.duration}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2">
             
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
