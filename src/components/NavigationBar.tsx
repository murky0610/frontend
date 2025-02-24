"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/partnerships", label: "Partnership & Linkages" },
];

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            AAVC
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-gray-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Login & Sign Up Buttons (Aligned Inline) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-black hover:text-gray-600 transition-colors">
              Log in
            </Link>
            <Link href="/signup">
              <Button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="text-black" /> : <Menu className="text-black" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-black text-lg py-2 hover:text-gray-600"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="text-black text-lg py-2 hover:text-gray-600"
                  onClick={toggleMenu}
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <Button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
