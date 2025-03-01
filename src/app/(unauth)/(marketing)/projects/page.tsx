"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// Import icons from lucide-react
import  {Cpu, Database, ChartArea } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col ml-10 mr-10">
      <div className="flex justify-center items-center text-center">
        <div className="flex flex-col w-full">
          <Label className="font-bold text-lg bg-red-300 text-center">
            AAVC Phase 1:
            Enhancing the Value Chain Project Designs for Coffee, Cacao, and Cavendish Banana Towards the Development of Agri-Aqua Value Chain Laboratory in UP Mindanao
          </Label>

          <Label className="p-2 text-justify">
            This program will contribute to new ways of evaluation that account
            for the dynamics in the chain and develop models to aid
            decision-making and develop more effective upgrading strategies
            considering emerging and critical concerns like sustainability,
            resiliency, and inclusiveness. Build on the findings of previous
            initiatives of UP Mindanao related to cacao, coffee, and cavendish
            banana. Based on the program’s findings, a framework for other
            commodity chains may be established and used as the basis for
            intervention. Institutional innovation can be developed for
            developing effective link of value chain design and implementation
            (e.g., VC Lab). Innovative ways to evaluate value chains will be
            introduced including:
            <ul className="list-disc ml-6 mt-2">
              <li>Agent-based modeling</li>
              <li>Supply chain network designs (SCND)</li>
              <li>Agri-food chain applications for decision-making (i.e., prototype mobile apps)</li>
              <li>Improve on existing upgrading strategies</li>
            </ul>
          </Label>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
      <Accordion type="single" collapsible>
        {/* Project 1 */}
        <AccordionItem value="item-1">
   
          <AccordionTrigger>
            {/* Icon for Project 1 */}
            <ChartArea className="mr-2 h-4 w-4" />
           <h1 className=" text-lg"> Project 1: Value Chain Analysis and Development: Cacao, Coffee, and Cavendish Banana</h1>
          </AccordionTrigger>
      
         
          <AccordionContent>
            For the three chains, updating includes utilizing previous survey
            data to examine the role of consolidation and clusters. Factors
            affecting the decision to cluster will be examined using a logit
            model. A technical efficiency model will also be estimated to
            analyze the role of clusters in enhancing efficiency. A new survey
            will be conducted for cacao which will be used in agent-based
            modelling in component 2 as well as in the analysis of clusters.
            Training and workshops on value chain analysis and development will
            be conducted for a selected group of researchers and practitioners.
            Stakeholder workshops will also be conducted to present research
            outputs. These capacity-building activities and stakeholder
            engagement form part and parcel of developing a value chain
            laboratory for the agri-food sector.

            {/* Tabs for Present & Former Members */}
            <div className="mt-6">
              <Tabs defaultValue="present">
                <TabsList className="flex space-x-4 border-none shadow-none bg-transparent">
                  <TabsTrigger
                    value="present"
                    className="focus:outline-none focus:shadow-none data-[state=active]:bg-slate-100"
                  >
                    Present Members
                  </TabsTrigger>
                  <TabsTrigger
                    value="former"
                    className="focus:outline-none focus:shadow-none data-[state=active]:bg-slate-100"
                  >
                    Former Members
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="present"
                  className="mt-4 p-4 rounded shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Present Project Team</h3>
                
                </TabsContent>

                <TabsContent
                  value="former"
                  className="mt-4 p-4 rounded shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Former Project Team</h3>
                  
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Project 2 */}
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {/* Icon for Project 2 */}
            <Cpu className="mr-2 h-4 w-4" />
            <h1 className=" text-lg"> Project 2: Value Chain Modelling and Simulations: Cacao, Coffee, and Cavendish Banana</h1>
           
          </AccordionTrigger>
        
          <AccordionContent>
            This project aims to develop models of agri-food value chains that
            will aid decision-making and evaluation of the chain. This project
            will focus on developing models of at most three chains: Cavendish
            banana, coffee, and cacao. Studying these value chains in UP
            Mindanao is not new. However, this project aims to incorporate the
            data gathered from previous studies (CHED-funded study on Cavendish
            banana value chain; DOST-PCIEERD-funded project on the coffee value
            chain; CHED-funded and PCARRD-UP Mindanao-funded projects for cacao
            value chain) to develop further models that will support in the
            improvement of the studied chains.
          </AccordionContent>
          <AccordionContent>
            {/* Tabs for Present & Former Members */}
            <div className="mt-6">
              <Tabs defaultValue="present">
                <TabsList className="flex space-x-4 border-none shadow-none bg-transparent">
                  <TabsTrigger
                    value="present"
                    className="focus:outline-none focus:shadow-none data-[state=active]:bg-slate-100"
                  >
                    Present Members
                  </TabsTrigger>
                  <TabsTrigger
                    value="former"
                    className="focus:outline-none focus:shadow-none data-[state=active]:bg-slate-100"
                  >
                    Former Members
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="present"
                  className="mt-4 p-4 rounded shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Present Project Team</h3>
                  
                </TabsContent>

                <TabsContent
                  value="former"
                  className="mt-4 p-4 rounded shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Former Project Team</h3>
                 
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Project 3 */}
        <AccordionItem value="item-3">
          <AccordionTrigger>
            {/* Icon for Project 3 */}
            <Database className="mr-2 h-4 w-4" />
            <h1 className=" text-lg">Project 3: Data analytics for the Cacao, Coffee, and Cavendish Banana Value Chains</h1>
            
          </AccordionTrigger>
           
          <AccordionContent>
            This project covers the data analytics component of the proposed
            program. It will build on the updated analysis of the banana
            (Cavendish banana), cacao, and coffee value chains by developing
            decision support platform based on an analysis of issues in the
            value chains, previous outputs of mathematical models (e.g., SCND),
            previous technologies developed (e.g., Kape Analytics), and data
            analytics modules for selected crops. The technologies will be
            tested and built as a validated prototype. The prototype testing
            will include testing with small-scale farmers of the selected crops
            to validate model results and ease of use of the application. The
            capacity building activities will be based on the user manual of
            the application featuring how it provides insights for
            decision-making at the farm-level. Trainings and workshops will be
            conducted for its users. Technology pitch can be created to drum up
            investment support from potential investors. The stakeholder
            workshops will be a venue to present the capabilities of the
            prototype to gain interest and possible future investments from
            government or the private sector. The prototype(s) can also further
            be developed as a commercial technology through incubator programs.
            Project 3 will contribute to the large gap in A4.0 technologies in
            the three selected commodities.
          </AccordionContent>
          <AccordionContent>
            {/* Tabs for Present & Former Members */}
            <div className="mt-6">
              <Tabs defaultValue="present">
                <TabsList className="flex space-x-4 border-none shadow-none bg-transparent">
                  <TabsTrigger
                    value="present"
                    className="focus:outline-none focus:shadow-none data-[state=active]:bg-slate-100"
                  >
                    Present Members
                  </TabsTrigger>
                  <TabsTrigger
                    value="former"
                    className="focus:outline-none focus:shadow-none data-[state=active]:bg-slate-100"
                  >
                    Former Members
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="present"
                  className="mt-4 p-4 rounded shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Present Project Team</h3>
                 
                </TabsContent>

                <TabsContent
                  value="former"
                  className="mt-4 p-4 rounded shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">Former Project Team</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {[
                      { name: "Dr. Juan Dela Cruz", role: "Former Project Leader" },
                      { name: "Ms. Anna Lopez", role: "Former Research Assistant" },
                      { name: "Mr. Pedro Santos", role: "Former Project Staff" },
                      { name: "Ms. Marie Fernandez", role: "Former Project Staff" },
                    ].map((member, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <Image
                          src="/former_member.jpg"
                          alt={member.name}
                          width={120}
                          height={120}
                          className="rounded-full object-cover"
                        />
                        <p className="font-semibold mt-2">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
    </div>
  )
}
