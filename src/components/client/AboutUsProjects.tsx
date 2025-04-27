"use client"

import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Coffee, Banana, Leaf } from "lucide-react"

export default function AboutUsProjectsComponent() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6">
      
      <div className="space-y-12">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">Research and Development</h1>
          <div className="h-1 w-full bg-white/20 mt-2"></div>
        </div>
      </div>
        {/* Header Section */}
        <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Phase 1</h1>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Enhancing the Value Chain Project</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For Coffee, Cacao, and Cavendish Banana Towards the Development of Agri-Aqua Value Chain Laboratory in UP
            Mindanao
          </p>
        </div>

        {/* About Section with Card */}
        <Card className="border-t-4 border-t-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-500" />
              About the Program
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-emerald max-w-none">
            <p>
              This program will contribute to new ways of evaluation that account for the dynamics in the chain and
              develop models to aid decision-making and develop more effective upgrading strategies considering emerging
              and critical concerns like sustainability, resiliency and inclusiveness. Build on the findings of previous
              initiatives of UP Mindanao related to cacao, coffee, and cavendish banana Based on the program's findings,
              a framework for other commodity chains may be established and used as the basis for intervention.
            </p>
            <p>
              Institutional innovation can be developed for developing effective link of value chain design and
              implementation (e.g., VC Lab). Innovative ways to evaluate value chains will be introduced including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Agent-based modeling</li>
              <li>Supply chain network designs (SCND)</li>
              <li>Agri-food chain applications for decision-making (i.e., prototype mobile apps)</li>
              <li>Improve on existing upgrading strategies</li>
            </ul>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Our Projects</h2>

          <Tabs defaultValue="project1" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1">
              <TabsTrigger
                value="project1"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
              >
                <Coffee className="h-4 w-4" />
                <span>Project 1</span>
              </TabsTrigger>
              <TabsTrigger
                value="project2"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
              >
                <Leaf className="h-4 w-4" />
                <span>Project 2</span>
              </TabsTrigger>
              <TabsTrigger
                value="project3"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
              >
                <Banana className="h-4 w-4" />
                <span>Project 3</span>
              </TabsTrigger>
            </TabsList>

            {/* Project 1 Content */}
            <TabsContent value="project1">
              <Card className="border-t-4 border-t-emerald-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>PROJECT 1</span>
                  </div>
                  <CardTitle className="text-2xl">Value Chain Analysis and Development</CardTitle>
                  <CardDescription className="text-lg">Cacao, Coffee, and Cavendish Banana</CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      For the three chains, updating includes utilizing previous survey data to examine the role of
                      consolidation and clusters. Factors affecting the decision to cluster will be examined using a
                      logit model. A technical efficiency model will also be estimated to analyze the role of clusters
                      in enhancing efficiency. A new survey will be conducted for cacao which will be used in
                      agent-based modelling in component 2 as well as in the analysis of clusters. Training and
                      workshops on value chain analysis and development will be conducted for a selected group of
                      researchers and practitioners. Stakeholder workshops will also be conducted to present research
                      outputs. These capacity-building activities and stakeholder engagement form part and parcel of
                      developing a value chain laboratory for the agri-food sector.
                    </p>
                  </div>

                  {/* Team Members Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="inline-block w-8 h-0.5 bg-emerald-500"></span>
                      Project Team
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {/* Member 1 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Digal.png"
                            alt="Dr. Larry N. Digal"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Dr. Larry N. Digal</p>
                        <p className="text-sm text-emerald-600">Project Leader</p>
                      </div>

                      {/* Member 2 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Placencia.png"
                            alt="Asst. Prof. Shemaiah Gail Placencia"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Asst. Prof. Shemaiah Gail Placencia</p>
                        <p className="text-sm text-emerald-600">Project Staff</p>
                      </div>

                      {/* Member 3 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Balgos.png"
                            alt="Ms. Carol Balgos"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Ms. Carol Balgos</p>
                        <p className="text-sm text-emerald-600">Project Staff</p>
                      </div>

                      {/* Member 4 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Jgarcia.jpg"
                            alt="Ms. Jo-an Garcia"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Ms. Jo-an Garcia</p>
                        <p className="text-sm text-emerald-600">Project Staff</p>
                      </div>

                      {/* Member 5 */}
                      <div className="flex flex-col items-center text-center group col-span-full">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Saguimpa.jpg"
                            alt="Mark James S. Saguimpa"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Mark James S. Saguimpa</p>
                        <p className="text-sm text-emerald-600">Project Technical Assistant I</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Project 2 Content */}
            <TabsContent value="project2">
              <Card className="border-t-4 border-t-emerald-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>PROJECT 2</span>
                  </div>
                  <CardTitle className="text-2xl">Value Chain Modelling and Simulations</CardTitle>
                  <CardDescription className="text-lg">Cacao, Coffee, and Cavendish Banana</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      This project aims to develop models of agri-food value chains that will aid decision-making and
                      evaluation of the chain. This project will focus on developing models of at most three chains:
                      Cavendish banana, coffee, and cacao. Studying these value chains in UP Mindanao is not new.
                      However, this project aims to incorporate the data gathered from previous studies (CHED-funded
                      study on Cavendish banana value chain; DOST-PCIEERD-funded project on the coffee value chain;
                      CHED-funded and PCARRD-UP Mindanao-funded projects for cacao value chain) to develop further
                      models that will support in the improvement of the studied chains.
                    </p>
                  </div>

                  {/* Team Members Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="inline-block w-8 h-0.5 bg-emerald-500"></span>
                      Project Team
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {/* Member 1 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Oguis.jpg"
                            alt="Dr. Giovanna Fae Oguis"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Dr. Giovanna Fae Oguis</p>
                        <p className="text-sm text-emerald-600">Project Leader</p>
                      </div>

                      {/* Member 2 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Rosero.jpg"
                            alt="El Veena Grace Rosero"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">El Veena Grace Rosero</p>
                        <p className="text-sm text-emerald-600">Project Staff</p>
                      </div>

                      {/* Member 3 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Rivas.jpg"
                            alt="Novy Aila Rivas"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Novy Aila Rivas</p>
                        <p className="text-sm text-emerald-600">Science Research Analyst</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Project 3 Content */}
            <TabsContent value="project3">
              <Card className="border-t-4 border-t-emerald-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>PROJECT 3</span>
                  </div>
                  <CardTitle className="text-2xl">Data Analytics for Value Chains</CardTitle>
                  <CardDescription className="text-lg">Cacao, Coffee, and Cavendish Banana</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      This project covers the data analytics component of the proposed program. It will build on the
                      updated analysis of the banana (Cavendish banana), cacao, and coffee value chains by developing
                      decision support platform based on an analysis of issues in the value chains, previous outputs of
                      mathematical models (e.g., SCND), previous technologies developed (e.g., Kape Analytics), and data
                      analytics modules for selected crops. The technologies will be tested and built as a validated
                      prototype. The prototype testing will include testing with small-scale farmers of the selected
                      crops to validate model results and ease of use of the application.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      The capacity building activities will be based on the user manual of the application featuring how
                      it provides insights for decision-making at the farm-level. Trainings and workshops will be
                      conducted for its users. Technology pitch can be created to drum up investment support from
                      potential investors. Project 3 will contribute to the large gap in A4.0 technologies in the three
                      selected commodities.
                    </p>
                  </div>

                  {/* Team Members Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="inline-block w-8 h-0.5 bg-emerald-500"></span>
                      Project Team
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {/* Member 1 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Santillan.jpg"
                            alt="Jon Henly O. Santillan"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Jon Henly O. Santillan</p>
                        <p className="text-sm text-emerald-600">Project Leader</p>
                      </div>

                      {/* Member 2 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Palen.jpg"
                            alt="Jeff Erxon Palen"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Jeff Erxon Palen</p>
                        <p className="text-sm text-emerald-600">Science Research Analyst</p>
                      </div>

                      {/* Member 3 */}
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-3 overflow-hidden rounded-full border-4 border-emerald-100 transition-all duration-300 group-hover:border-emerald-300 w-[120px] h-[120px]">
                          <Image
                            src="/Staff Pictures/Labanon.jpg"
                            alt="Alex John Labanon"
                            width={120}
                            height={120}
                            className="rounded-full object-cover w-full h-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="font-semibold">Alex John Labanon</p>
                        <p className="text-sm text-emerald-600">Former Science Research Analyst</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
