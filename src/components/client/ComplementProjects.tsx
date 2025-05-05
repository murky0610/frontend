"use client"
import Image from "next/image"
import { Calendar, User, Building2, Mail } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"; // Adjust path as needed
import { useState } from "react"
// Updated project data with actual information
const projects = [
  {
    id: 2,
    name: "Developing a Point of Catch-to-Plate Traceability System for Tuna in the Davao Region",
    duration: "March 1, 2022 - March 31, 2024",
    description:
      "The project aims to develop a mobile traceability application for the tuna supply chain. It also incorporates information regarding the food safety practices of the users. The project was able to identify key data elements (KDE) and critical tracking events (CTE) for the mobile application with reference to the KDEs collected by the the Bureau of Fisheries and Aquatic Resources (BFAR) for Catch Certification and  standards set by international traceability-promoting organizations. One of its major outputs is the development of a mobile traceability application that will be used to track tuna from catch to retail. The app has already been pilot-tested among fisherfolks and traders in Mati City. Since the start of pilot testing June 2023, 17 fishers have been actively recording tuna catch with 113 fishing trips, 140 pieces or 4,550 kilograms of yellowfin tuna recorded (as of 13 December 2023). However, recording using the application has been inconsistent especially among the traders. Feedback from fishers also indicated potential need to improve the application’s interface to become more user-friendly. Additionally, several barriers in digital traceability adoption have also been identified including the limited number of fisherfolk with access to smartphones, supply chain actors’ limited knowledge about traceability, lack of policy requiring traceability for fish products at the catching stage, and the prevalence of paper-based documentation among downstream actors. Moreover, the prevailing paper-based documentation has made some fishermen consider the application as an additional task that can be time-consuming. This feedback would imply the need to assess and ensure the efficiency in the use of the application to increase adoption among actors in the catching stage of the chain. The plan is to host the app, in collaboration with BFAR, to AAVC Lab.",
      logo: "/Partners Logo/Tuna-3.png?height=80&width=80",
    websiteUrl: null,
    projectLeader: "Asst. Prof. Miko Mariz C. Castro",
    email: "tunatrace@gmail.com",
    implementingAgency: "University of the Philippines Mindanao",
    status: "Completed",
  },
  {
// For future
//     description:
//     <>
//    <p className="indent-8 mb-4"> The project aims to analyze the current logistical networks and resources for the timber supply chains in the Caraga and Davao Regions, and formulate an evidence-based strategic plan and policy frameworks for efficient logistical networks. Specifically, it aims to: (1) map the current logistical networks and resources for the timber supply chains in the Caraga and Davao Regions; (2) determine the factors affecting the logistics for the timber supply chains particularly the transport, road, and storage logistics; (3) analyze the efficiency of the current logistical network and resources including the social dimension, interlinkages, and interactions involved; (4) determine the areas for improvement and validate this through actual time and motion studies; and
//  (5) provide policy recommendations for improvement of the timber supply chain.
//  </p>
//  <p className="indent-8 mb-4">The AAVC lab facility will store the project database and support spatial analysis embedded in GIS and remote sensing tools. These tools will be combined with VC to provide 
//  </p>
//     </>,
    id: 1,
    name: "Enhancing the Efficiency of the Location-based Logistics of the Timber Supply Chains in Caraga and Davao Regions Using Spatial Econometrics [PCAARRD-GIA]",
    duration: "June 1, 2024 - November 30, 2025",
    description:
      `
      The project aims to analyze the current logistical networks and resources for the timber supply chains in the Caraga and Davao Regions, and formulate an evidence-based strategic plan and policy frameworks for efficient logistical networks. Specifically, it aims to: (1) map the current logistical networks and resources for the timber supply chains in the Caraga and Davao Regions; (2) determine the factors affecting the logistics for the timber supply chains particularly the transport, road, and storage logistics; (3) analyze the efficiency of the current logistical network and resources including the social dimension, interlinkages, and interactions involved; (4) determine the areas for improvement and validate this through actual time and motion studies; and
(5) provide policy recommendations for improvement of the timber supply chain.
 
The AAVC lab facility will store the project database and support spatial analysis embedded in GIS and remote sensing tools. These tools will be combined with VC to provide recommendations to the timber value chain. Additionally, the AAVC lab will provide the facility on the stakeholders' consultation.
 

      `,
      logo: "/Partners Logo/upmin-logo.png?height=80&width=80",
    websiteUrl: "https://example.com/project-alpha",
    facebookUrl: "https://facebook.com/project-alpha",
    projectLeader: "Asst. Prof. Thaddeus R. Acuña, MM",
    email: null,
    implementingAgency: "University of the Philippines Mindanao",
    status: "Ongoing",
  },
    {
    id: 3,
    name: "Development of Traceability System for Cacao in Southern Philippines [PCAARRD-GIA]",
    duration: "March 16, 2023 - March 15, 2025",
    description:
      `
      The project aims to develop and implement a Transparent Traceability System (TTS) for cacao in Southern Philippines.  Specifically, it aims to: (1) design a distributed ledger technology (DLT) traceability system based on the baseline information established from previous supply chain studies and key requirements of industry partners; (2) pilot-test the methods for capturing, storing, and sharing key data elements (KDE) and critical tracking events (CTE); (3) develop the associated risk management strategy; (4)  build linkages across the supply chain and stakeholder groups; (5) monitor and document the operationalization of the traceability system within the covered municipalities; and
Institutionalize the implementation of the cacao traceability system. The AAVC Lab will link the traceability system to be developed.

      `
,      
      logo: "/Partners Logo/usep-logo.png?height=80&width=80",
    websiteUrl: null,
    projectLeader: "Asst. Prof. Rey A. Castillo, DBA",
    //email: "tunatrace@gmail.com",
    implementingAgency: "University of Southeastern Philippines",
    facebookUrl: "https://facebook.com/gamma-solutions",
    status: "Ongoing",
  },
  {
    id: 4,
    name: "Integrating Blockchain Technology for Traceability in the Shrimp Industry's Food Supply Chain in Sarangani Province and General Santos City [PCAARRD-GIA]",
    duration: "March 1, 2025 – February 28, 2027",
    description:
    `
    With global markets increasingly demanding verifiable sources of sustainably-raised, clean, and healthy shrimp, a blockchain-based traceability system emerges as a strategic solution capable of addressing regulatory compliance, disease management, logistical constraints, and environmental pressures. Specifically, it aims to conduct a comprehensive value chain analysis of the shrimp industry (P. vannamei) in Sarangani and General Santos City to identify key stakeholders, processes, and value-adding opportunities from production to distribution; design the overall blockchain architecture for the shrimp industry in Sarangani Province and General Santos City; implement the decentralized application (dApp) through the development of smart contracts for traceability of P. vannamei shrimp from production to consumption; and conduct system tests for the overall blockchain system to verify functionality and security.The AAVC Lab will link the traceability system to be developed at the Mindanao State University.

    `, 
    logo: "/Partners Logo/msu-gensan-logo.png?height=80&width=80",
    websiteUrl: "https://example.com/delta-tech",
    facebookUrl: "https://facebook.com/delta-tech",
    projectLeader: "Assoc. Prof. Jypzie M. Catedrilla, DIT",
    email: null,
    implementingAgency: "Mindanao State University - General Santos City",
    status: "Newly Approved",
  },



]

export default function ComplementaryProjects() {

  const [expanded, setExpanded] = useState(false);
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
                          <div className="flex items-start gap-4 mb-3"> {/* Changed to items-start for better alignment if title wraps */}
                              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                  <Image
                                      src={project.logo || "/placeholder.svg?height=80&width=80"}
                                      alt={`${project.name} logo`}
                                      fill
                                      className="object-contain"
                                  />
                              </div>
                              <div className="flex-1"> {/* Allow title area to take remaining space */}
                              <Badge
      className="mb-1" // Slightly reduced margin
      variant={
          project.status === "Completed"
              ? "secondary"
              : project.status === "Ongoing"
                  ? "default"
                  : project.status === "Newly Approved"
                      ? "green" // Changed from "success" to "green"
                      : "outline"
      }
  >
      {project.status}
  </Badge>
                                    <CardTitle className="text-lg leading-tight">{project.name}</CardTitle> {/* Added leading-tight */}
                              </div>
                          </div>
{/* --- Improved Details Section --- */}
<div className="flex justify-between mt-2 text-sm text-muted-foreground">
  {/* Left Column */}
  <div className="flex flex-col space-y-1.5">
    <div className="flex items-center">
      <User className="h-4 w-4 mr-2 flex-shrink-0" />
      <span>{project.projectLeader}</span>
    </div>
    <div className="flex items-center">
      <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
      <span>{project.implementingAgency}</span>
    </div>
  </div>

  {/* Right Column */}
  <div className="flex flex-col space-y-1.5">
    {project.email && (
      <div className="flex items-center">
        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
        <a href={`mailto:${project.email}`} className="hover:underline">
          {project.email}
        </a>
      </div>
    )}
    <div className="flex items-center">
      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
      <span>{project.duration}</span>
    </div>
  </div>
</div>
{/* --- End of Improved Details Section --- */}


                      </CardHeader>
                      <CardContent className="flex-grow pt-4">
      <CardDescription
        className={`text-base transition-all duration-300 ${
          expanded ? "line-clamp-none" : "line-clamp-6"
        }`}
      >
        {project.description}
      </CardDescription>

      {/* Toggle button */}
      {project.description?.split(" ").length > 50 && ( // basic check for long text
        <Button variant={'outline'}
          className="text-sm mt-2 text-primary hover:underline focus:outline-none"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "See Less" : "See More"}
        </Button>
      )}
    </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  )
}