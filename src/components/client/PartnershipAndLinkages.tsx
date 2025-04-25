import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HandshakeIcon, LinkIcon } from "lucide-react"

export function PartnershipAndLinkagesComponent() {
  const partners = [
        {
          name: "Brgy. Kidawa, Laak, Davao de Oro",
          contact: {
              phone: "(Information typically obtained through the Municipality of Laak)",
              email: "(Information typically obtained through the Municipality of Laak)"
          }
        },
        {
          name: "Davao de Oro State College (DDOSC)",
          // Note: Logo URL needs verification from the official site at time of use. Assuming a standard location.
          logo: "/Partners Logo/davao-de-oro-logo.jpg", 
          website: "https://ddosc.edu.ph/",
          contact: {
              phone: "(084) 829 0284 / +63 917-127-0418 / +63 919-084-8955", // Verify numbers from site
              email: "info@ddosc.edu.ph" // Verify email from site
          }
        },
        {
          name: "Davao Oriental State University (DOrSU)",
          // Note: Logo URL needs verification from the official site at time of use. Assuming a standard location.
           logo: "/Partners Logo/dorsu-logo.jpg", 
          website: "https://dorsu.edu.ph/",
          contact: {
              phone: "(087) 811-4079 / (087) 388-3207", // Verify numbers from site
              email: "op@dorsu.edu.ph" // Verify email from site (President's office, find general if available)
          }
        },
        {
          name: "UPLB SARAI Project",
          // Note: Logo URL needs verification from the official site at time of use.
                logo: "/Partners Logo/upscale-sarai-logo.png", 
          website: "https://sarai.ph/",
          contact: {
              phone: "+63 49 536 3080", // Verify number from site
              email: "projectsarai@up.edu.ph" // Verify email from site
          }
        },
        {
          name: "UP Mindanao – Land Reservation Management Office (LRMO)",
          logo: "/Partners Logo/upmin-logo.png", 
          website: "https://www.upmin.edu.ph/", // Link to main UP Mindanao website
          contact: {
              // Specific LRMO public contact might not be listed. Providing general UPMin contact.
              phone: "(082) 293-0302 / (082) 293-0084", // UPMin Trunkline, verify numbers
              email: "ovca.upmindanao@up.edu.ph" // General Admin email, verify appropriate contact
          }
        },
        {
          name: "World Agroforestry – International Centre for Research in Agroforestry (ICRAF)",
          // Note: Logo URL needs verification from the official site at time of use.
          logo: "/Partners Logo/cifor-icraf-logo.png", 
          website: "https://www.worldagroforestry.org/",
          contact: {
              // Providing general contact and Philippines office if available.
              phone: "+63 49 536 2701", // ICRAF Philippines (Los Baños), verify number
              email: "icraf-philippines@cifor-icraf.org" // ICRAF Philippines email, verify address
          }
        },
     ]



  return (
    <div className="container py-12 mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Partners & Linkages</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We collaborate with various organizations to achieve our mission and create meaningful impact.
          </p>
        </div>

        <Tabs defaultValue="partners" className="w-full">


          <TabsContent value="partners" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                        <CardDescription>{partner.contact.phone}</CardDescription>
                        <CardDescription>{partner.contact.email}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {partner.website}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
