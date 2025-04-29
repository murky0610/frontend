"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, Blocks, Boxes, ChartArea, ChevronRight, FileText, GlassWater, Microscope, Monitor, Projector, Sprout, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1) Hero / Banner Section */}
      <section className="relative w-full bg-gray-50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Left Text */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
             
              Agri-Aqua Value Chain Laboratory
            </h1>
            <p className="mt-4 text-gray-700 text-lg">
            Empowering communities through innovation for sustainable agri-aqua futures.

              
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/register">Join the Initiative</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-us">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 flex justify-center">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src="/aavc_right_column.jpg" // Replace with your own relevant image
                alt="AAVC Lab in Action"
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              <span className="text-green-800">AAVC</span> - Agri-Aqua Value Chain
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              The Agri-Aqua Value Chain (AAVC) represents the complete ecosystem of activities, processes, and
              stakeholders involved in bringing agricultural and aquatic products from production to consumption.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our integrated approach connects farmers, fishers, processors, distributors, and consumers in a
              sustainable network that enhances food security, promotes economic growth, and ensures environmental
              stewardship across the entire value chain.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 text-green-800">
                <Sprout className="w-5 h-5" />
                
                <span className="font-medium text-green-800">Sustainable Production</span>
              </div>
              <div className="flex items-center gap-3 text-green-800">
                <GlassWater className="w-5 h-5" />
                
                <span className="font-medium text-green-800">Resource Conservation</span>
              </div>
              <div className="flex items-center gap-3 text-green-800">
                <ChartArea className="w-5 h-5" />
                
                <span className="font-medium text-green-800">Economic Growth</span>
              </div>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/90 to-green-700/70 flex items-center justify-center p-8">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Our Value Chain Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <p className="font-semibold mb-2">PRODUCTION</p>
                    <p>Sustainable farming and fishing practices</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <p className="font-semibold mb-2">PROCESSING</p>
                    <p>Value addition and quality control</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <p className="font-semibold mb-2">DISTRIBUTION</p>
                    <p>Market access and efficient logistics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
      <section className="bg-white py-16 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">WE AIM TO</h2>
{/* SDG 1 (no poverty), SDG 2 (zero hunger), SDG 10 (reduce inequalities), SDG 12 (responsible consumption and production), SDG 17(partnerships for the goals) (Add SDG (9) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Aim 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <Microscope className="w-16 h-16 text-green-600" strokeWidth={1.5} />
            </div>
            <p className=" font-bold">
              ADVANCE RESEARCH & INNOVATION: TO DRIVE CONTINUOUS INNOVATION THROUGH RESEARCH, TECHNOLOGY, AND
              COLLABORATION IN AGRI-AQUA VALUE CHAINS.
            </p>
          </div>

          {/* Aim 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <Blocks className="w-16 h-16 text-green-600" strokeWidth={1.5} />
            </div>
            <p className=" font-bold">
              DEVELOP IMPACTFUL SOLUTIONS: TO CREATE SUSTAINABLE, INCLUSIVE, AND RESILIENT SOLUTIONS THAT ENHANCE
              COMPETITIVENESS, DRIVE POLICY IMPROVEMENTS, AND SUPPORT ECONOMIC GROWTH.
            </p>
          </div>

          {/* Aim 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <Boxes className="w-16 h-16 text-green-600" strokeWidth={1.5} />
            </div>
            <p className=" font-bold">
              SERVE AS A LEADING HUB: TO BE A PROMINENT KNOWLEDGE CENTER FOR AGRI-AQUA VALUE CHAIN DEVELOPMENT,
              FOSTERING SUSTAINABILITY AND RESILIENCE IN AGRICULTURAL SYSTEMS.
            </p>
          </div>
        </div>
      </div>
    </section>

     
      {/* NEW: News and Updates Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">NEWS AND UPDATES</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main News Item */}
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-80 w-full">
                  <Image
                    src="/news-events/game-oral.jpg?height=600&width=800"
                    alt="Lab Launches Mentoring Program"
                    fill
                    className="object-cover"
                  />
                </div> 
                <div className="p-6 bg-white">
                <Link
    href="/news/mentoring-program"
    className="text-2xl font-bold text-green-600 hover:text-green-700 hover:underline"
  >
                   UPLB 4th Global Agribusiness Management and Entrepreneurship Conference and Expo (GAME 2024) DOST-PCAARRD-led Parallel Session
                  </Link>
                  <p className="text-gray-500 mt-2">16 January, 2025</p>
                  <p className="mt-3 text-gray-700">
                    The Development Innovations and Policy Laboratory launched its Mentoring Program on Policy Analysis
                    and Policy Research Proposal Development...
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar News Items */}
            <div className="space-y-6">
              {/* News Item 1 */}
              <div className="flex gap-4">
                <div className="relative h-24 w-32 flex-shrink-0">
                  <Image
                    src="/news-events/smardec.jpg?height=200&width=300"
                    alt="Lab Institutionalizes"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                <Link
    href="/news/mentoring-program"
    className="text-2xl font-bold text-green-600 hover:text-green-700 hover:underline"
  >
                  SMAARRDEC 37th Regional Symposium on Research, Development and Extension Highlights
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">20 November, 2024</p>
                </div>
              </div>

              {/* News Item 2 */}
              <div className="flex gap-4">
                <div className="relative h-24 w-32 flex-shrink-0">
                  <Image
                    src="/aavc_left_column.jpg?height=200&width=300"
                    alt="Training Program"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                <Link
    href="/news/mentoring-program"
    className="text-2xl font-bold text-green-600 hover:text-green-700 hover:underline"
  >
                    17th UP Mindanao Supply Chain Management Forum: Sustainable Growth and Optimization in Agricultural Value Chains
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">10 October, 2024</p>
                </div>
              </div>

              {/* News Item 3 */}
              <div className="flex gap-4">
                <div className="relative h-24 w-32 flex-shrink-0">
                  <Image
                    src="/news-events/mindanao-symposium.jpg?height=200&width=300"
                    alt="Policy Workshop"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                <Link
    href="/news/mentoring-program"
    className="text-2xl font-bold text-green-600 hover:text-green-700 hover:underline"
  >
                    Mindanao Research Symposium on the Future of Agri-food Systems  
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">22 August, 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
              Show more
            </Button>
          </div>
        </div>
      </section>

      {/* NEW: Our Services Section */}
      <section className="w-full py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">OUR SERVICES</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
            {/* Service 1 */}
            <div className="flex flex-col items-center">
              <Monitor className="w-16 h-16 mb-4" />
              <h3 className="text-sm font-bold uppercase">CAPACITY BUILDING</h3>
            </div>

            {/* Service 2 */}
            <div className="flex flex-col items-center">
              <Users className="w-16 h-16 mb-4" />
              <h3 className="text-sm font-bold uppercase">MOBILE APPS</h3>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col items-center">
              <Projector className="w-16 h-16 mb-4" />
              <h3 className="text-sm font-bold uppercase">REPOSITORY</h3>
            </div>

            {/* Service 4 */}
            {/* <Link href=""> */}
            <div className="flex flex-col items-center">
              <FileText className="w-16 h-16 mb-4" />
              <h3 className="text-sm font-bold uppercase">DIRECTORY</h3>
              {/* </Link> */}
            </div>

      
          </div>

          <div className="flex justify-center mt-10">
            {/* <Button variant="secondary" className="bg-[#0A3D62] hover:bg-[#0c4b79] text-white">
              Read more
            </Button> */}
          </div>
        </div>
      </section>


      {/* 5) Final CTA Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{ backgroundImage: "url('/farmland-bg.jpg')" }}
      >
        <div className="bg-black bg-opacity-40 absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Become Part of a Sustainable Future
          </h2>
          <p className="mt-4 text-base text-gray-200 text-center max-w-xl">
            Empower our agri-aqua communities by supporting advanced research and 
            innovation at the AAVC Lab—together, let’s shape resilient value chains.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email to get involved"
              className="px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-green-500 sm:flex-grow"
            />
            <Button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md">
              Get Updates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
