'use client';

import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
export default function ExampleComponent() {
  return (
    <div className="w-full max-w-6xl m-auto">
      <div className="flex flex-col items-center space-y-6">
        <div className=" text-xl font-bold p-6 w-full flex flex-col items-center text-center">
          <p>About the Program:</p>

          <br></br>
          <p className="mb-4">
            Enhancing the Value Chain Project Designs for Coffee, Cacao, and Cavendish Banana
            Towards the Development of Agri-Aqua Value Chain Laboratory in UP Mindanao
          </p>

          {/* <Image
            src="/aavc_about.jpg" 
            alt="AAVC Right Column"
            width={900}
            height={500}
            className="object-cover mx-auto"
          /> */}
        </div>

        <div className="  w-full text-justify">
          This program will contribute to new ways of evaluation that account for the dynamics in
          the chain and develop models to aid decision-making and develop more effective upgrading
          strategies considering emerging and critical concerns like sustainability, resiliency and
          inclusiveness. Build on the findings of previous initiatives of UP Mindanao related to
          cacao, coffee, and cavendish banana Based on the program’s findings, a framework for other
          commodity chains may be established and used as the basis for intervention. Institutional
          innovation can be developed for developing effective link of value chain design and
          implementation (e.g., VC Lab) Innovative ways to evaluate value chains will be introduced
          including : (1) Agent-based modeling, (2) Supply chain network designs (SCND), (3)
          Agri-food chain applications for decision-making (i.e., prototype mobile apps), (4)
          Improve on existing upgrading strategies.
        </div>
      </div>

      <div className="mx-auto p-4">
        {/* Set the Tabs width or leave it flexible. 
          We also make the TabsList a grid with 3 columns. */}
        <Tabs defaultValue="project1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="project1">Project 1</TabsTrigger>
            <TabsTrigger value="project2">Project 2</TabsTrigger>
            <TabsTrigger value="project3">Project 3</TabsTrigger>
          </TabsList>

          <TabsContent value="project1">
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold text-2xl">Project 1</CardTitle>
                <CardDescription className="font-semibold text-xl">
                  Value Chain Analysis and Development: Cacao, Coffee, and Cavendish Banana
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex flex-col items-center justify-center">
                <p className="justify-start">
                  For the three chains, updating includes utilizing previous survey data to examine
                  the role of consolidation and clusters. Factors affecting the decision to cluster
                  will be examined using a logit model. A technical efficiency model will also be
                  estimated to analyze the role of clusters in enhancing efficiency. A new survey
                  will be conducted for cacao which will be used in agent-based modelling in
                  component 2 as well as in the analysis of clusters. Training and workshops on
                  value chain analysis and development will be conducted for a selected group of
                  researchers and practitioners. Stakeholder workshops will also be conducted to
                  present research outputs. These capacity-building activities and stakeholder
                  engagement form part and parcel of developing a value chain laboratory for the
                  agri-food sector.
                </p>

                {/* Team Members Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Team</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {/* Member 1 */}
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/aavc_project1.jpg"
                        alt="Dr. Larry N. Digal"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                      <p className="font-semibold mt-2">Dr. Larry N. Digal</p>
                      <p className="text-sm text-gray-500">Project Leader</p>
                    </div>

                    {/* Member 2 */}
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/aavc_project1.jpg"
                        alt="Asst. Prof. Shemaiah Gail Placencia"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                      <p className="font-semibold mt-2">Asst. Prof. Shemaiah Gail Placencia</p>
                      <p className="text-sm text-gray-500">Project Staff</p>
                    </div>

                    {/* Member 3 */}
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/aavc_project1.jpg"
                        alt="Ms. Carol Balgos"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                      <p className="font-semibold mt-2">Ms. Carol Balgos</p>
                      <p className="text-sm text-gray-500">Project Staff</p>
                    </div>

                    {/* Member 4 */}
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/aavc_project1.jpg"
                        alt="Ms. Jo-an Garcia"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                      <p className="font-semibold mt-2">Ms. Jo-an Garcia</p>
                      <p className="text-sm text-gray-500">Project Staff</p>
                    </div>

                    {/* Member 5 */}
                    <div className="flex flex-col items-center justify-center text-center col-span-full">
                      <Image
                        src="/aavc_project1.jpg"
                        alt="Mark James S. Saguimpa"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                      <p className="font-semibold mt-2">Mark James S. Saguimpa</p>
                      <p className="text-sm text-gray-500">Project Technical Assistant I</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---- PROJECT 2 ---- */}
          <TabsContent value="project2">
            <Card>
              <CardHeader>
                <CardTitle>Project 2</CardTitle>
                <CardDescription>
                  Value Chain Modelling and Simulations: Cacao, Coffee, and Cavendish Banana
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <p>
                  <strong>Project Leader:</strong> Dr. Giovanna Fae Oguis
                </p>
                <p>
                  <strong>Project Staff:</strong> El Veena Grace Rosero
                </p>
                <p>
                  <strong>Science Research Analyst:</strong> Novy Aila Rivas
                </p>

                <p className="font-semibold">
                  Value Chain Modelling and Simulations: Cacao, Coffee, and Cavendish Banana
                </p>
                <p>
                  This project aims to develop models of agri-food value chains that will aid
                  decision-making and evaluation of the chain. This project will focus on developing
                  models of at most three chains: Cavendish banana, coffee, and cacao. Studying
                  these value chains in UP Mindanao is not new. However, this project aims to
                  incorporate the data gathered from previous studies (CHED-funded study on
                  Cavendish banana value chain; DOST-PCIEERD-funded project on the coffee value
                  chain; CHED-funded and PCARRD-UP Mindanao-funded projects for cacao value chain)
                  to develop further models that will support in the improvement of the studied
                  chains.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---- PROJECT 3 ---- */}
          <TabsContent value="project3">
            <Card>
              <CardHeader>
                <CardTitle>Project 3</CardTitle>
                <CardDescription>
                  Data analytics for the Cacao, Coffee, and Cavendish Banana Value Chains
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <p>
                  <strong>Project Leader:</strong> Jon Henly O. Santillan
                </p>
                <p>
                  <strong>Science Research Analyst:</strong> Jeff Erxon Palen
                </p>
                <p>
                  <strong>Former Science Research Analyst:</strong> Alex John Labanon
                </p>

                <p className="font-semibold">
                  Data analytics for the Cacao, Coffee, and Cavendish Banana Value Chains
                </p>
                <p>
                  This project covers the data analytics component of the proposed program. It will
                  build on the updated analysis of the banana (Cavendish banana), cacao, and coffee
                  value chains by developing decision support platform based on an analysis of
                  issues in the value chains, previous outputs of mathematical models (e.g., SCND),
                  previous technologies developed (e.g., Kape Analytics), and data analytics modules
                  for selected crops. The technologies will be tested and built as a validated
                  prototype. The prototype testing will include testing with small-scale farmers of
                  the selected crops to validate model results and ease of use of the application.
                  The capacity building activities will be based on the user manual of the
                  application featuring how it provides insights for decision-making at the
                  farm-level. Trainings and workshops will be conducted for its users. Technology
                  pitch can be created to drum up investment support from potential investors. The
                  stakeholder workshops will be a venue to present the capabilities of the prototype
                  to gain interest and possible future investments from government or the private
                  sector. The prototype(s) can also further be developed as a commercial technology
                  through incubator programs. Project 3 will contribute to the large gap in A4.0
                  technologies in the three selected commodities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
