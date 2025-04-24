"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1) Hero / Banner Section */}
      <section className="relative w-full bg-gray-50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Left Text */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Establishing and Operationalizing the <br />
              Agri-Aqua Value Chain Laboratory
            </h1>
            <p className="mt-4 text-gray-700 text-lg">
              A dedicated facility at UP Mindanao, funded by DOST-PCAARRD, to foster 
              <strong> research, innovation, and capacity-building</strong> in Agri-Aqua 
              value chains. Join us as we drive <strong>interdisciplinary collaboration</strong>, 
              shaping sustainable and inclusive agri-aqua development.
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
      {/* 2) Project Overview Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Overview</h2>
          <p className="text-gray-700 text-base mb-6">
            <strong>Project Leader:</strong> A/Prof Giovanna Fae R. Oguis, Ph.D. <br />
            <strong>Implementing Agency:</strong> University of the Philippines Mindanao <br />
            <strong>Source of Funds:</strong> DOST – PCAARRD <br />
            <strong>Duration:</strong> 12 Months (February 1, 2025 – January 31, 2026) <br />
            <strong>Year 1 Budget:</strong> Php 5,000,000.00
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 border rounded-lg bg-gray-50 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-3 font-bold">
                  O1
                </div>
                <h3 className="font-semibold text-gray-800">Physical Facility</h3>
              </div>
              <p className="text-sm text-gray-600">
                Establish a state-of-the-art AAVC Lab facility for in-depth value chain 
                research, analysis, and collaboration.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 border rounded-lg bg-gray-50 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-3 font-bold">
                  O2
                </div>
                <h3 className="font-semibold text-gray-800">
                  Methodology Review
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Refine and review existing supply/value chain studies, aiming to improve 
                relevance and impact on policy-making.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 border rounded-lg bg-gray-50 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-3 font-bold">
                  O3
                </div>
                <h3 className="font-semibold text-gray-800">Knowledge Hub</h3>
              </div>
              <p className="text-sm text-gray-600">
                Serve as a hub for best practices, consolidating supply/value chain 
                research and data for stakeholders worldwide.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 border rounded-lg bg-gray-50 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-3 font-bold">
                  O4
                </div>
                <h3 className="font-semibold text-gray-800">
                  Decision Support Systems
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Develop and refine apps that optimize value chain operations for 
                improved profitability and market transactions.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 3) Facilities & Tools Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Lab Facilities & Digital Tools
            </h2>
            <p className="text-gray-600 mt-2">
              The lab offers advanced research spaces, a consolidated <em>Value Chain Repository</em>, 
              and integrated mobile apps for data-driven decision-making.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card */}
            <div className="p-6 border rounded-lg bg-white hover:shadow-md transition">
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Value Chain Repository</h3>
              <p className="text-sm text-gray-600">
                A knowledge hub of completed VC studies, offering refined 
                methodologies and best practices for commodities like coffee, cacao, 
                and Cavendish banana.
              </p>
              <Link
                href="/repository"
                className="inline-flex items-center text-green-600 mt-2 font-semibold hover:underline"
                legacyBehavior>
                Learn More
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Right Card */}
            <div className="p-6 border rounded-lg bg-white hover:shadow-md transition">
              <h3 className="font-semibold text-xl text-gray-800 mb-2">DSS Mobile Applications</h3>
              <p className="text-sm text-gray-600">
                From cost calculators to market profit optimizers, these apps enhance 
                profitability, efficiency, and transparency across the agri-aqua chain.
              </p>
              <Link
                href="/field-assistant"
                className="inline-flex items-center text-green-600 mt-2 font-semibold hover:underline"
                legacyBehavior>
                View Apps
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 4) Roadmap & Timeline Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Project Roadmap (12 Months)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-md">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Q1 - Q2</h3>
              <p className="text-gray-700 font-medium">Facility Setup & Hiring</p>
              <p className="text-sm text-gray-600 mt-1">
                Acquire equipment and office furniture, hire key personnel (value chain 
                analyst, developer), and launch the AAVC Lab.
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Q2 - Q3</h3>
              <p className="text-gray-700 font-medium">Review & Repository</p>
              <p className="text-sm text-gray-600 mt-1">
                Compile literature on existing VC methodologies, refine them, and 
                incorporate into a working repository for easy access.
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Q3 - Q4</h3>
              <p className="text-gray-700 font-medium">App Integration & Partnerships</p>
              <p className="text-sm text-gray-600 mt-1">
                Test and finalize decision-support systems, forge partnerships 
                (3 MOUs), and facilitate market transactions among chain players.
              </p>
            </div>
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
      {/* 6) Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-xl text-gray-800">Agri-Aqua Value Chain Laboratory</p>
            <p className="text-sm text-gray-500 mt-1">
              University of the Philippines Mindanao <br />
              Davao City, 8100 Philippines
            </p>
            <div className="mt-2 flex gap-2 text-gray-600 text-sm">
              <Link href="#">LinkedIn</Link> | 
              <Link href="#">Facebook</Link> | 
              <Link href="#">Twitter</Link>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>&copy; 2025 AAVC Lab. Funded by DOST-PCAARRD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
