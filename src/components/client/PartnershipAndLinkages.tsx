import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HandshakeIcon, LinkIcon } from "lucide-react"

export function PartnershipAndLinkagesComponent() {
  const partners = [
    {
      name: "Brgy. Kidawa, Laak, Davao de Oro",
    //   agreement: "MOA",
    //   status: "Signed and notarized",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Davao de Oro State College (DDOSC)",
    //   agreement: "MOU",
    //   status: "Signed and notarized",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Davao Oriental State University (DOrSU)",
    //   agreement: "MOU",
    //   status: "Signed and notarized",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "UPLB SARAI Project",
    //   agreement: "Letter of Commitment",
    //   status: "Signed and approved",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "UP Mindanao – Land Reservation Management Office (LRMO)",
    //   agreement: "Letter of Commitment",
    //   status: "Signed and approved",
      logo: "/placeholder.svg?height=80&width=80",
    },
  ]

  const linkages = [
    {
      name: "World Agroforestry – International Centre for Research in Agroforestry (ICRAF)",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "The Smarter Approaches to Reinvigorate Agriculture as an Industry (SARAI) in the Philippines Project (SARAI) of the (DOST-PCAARRD)",
      logo: "/placeholder.svg?height=80&width=80",
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
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="partners">
              <HandshakeIcon className="mr-2 h-4 w-4" />
              Partners
            </TabsTrigger>
            <TabsTrigger value="linkages">
              <LinkIcon className="mr-2 h-4 w-4" />
              Linkages
            </TabsTrigger>
          </TabsList>

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
                        <CardDescription>{partner.agreement}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {partner.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="linkages" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {linkages.map((linkage, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        <Image
                          src={linkage.logo || "/placeholder.svg"}
                          alt={`${linkage.name} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <CardTitle className="text-lg">{linkage.name}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
