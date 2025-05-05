import Link from "next/link"
import Image from "next/image"
import { Facebook, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/home" className="flex items-center space-x-2">
              <Image src="/logo-v2.png" alt="VCLAB Logo" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-gray-600 text-sm mt-4">
              Empowering communities through innovation for sustainable agri-aqua futures.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-gray-600 hover:text-green-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              {/* <Link href="#" className="text-gray-600 hover:text-green-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link> */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-gray-600 hover:text-green-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-green-600 text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/news-and-events" className="text-gray-600 hover:text-green-600 text-sm">
                  News and Events
                </Link>
              </li>
              <li>
                <Link href="/published-papers" className="text-gray-600 hover:text-green-600 text-sm">
                  Published Papers
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-green-600 text-sm">
                  Complementary Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">VCLAB Building, University Campus, Philippines</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-600 text-sm">+63 (2) 8123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-600 text-sm">info@vclab.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex justify-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Agri-Aqua Value Chain Laboratory. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
