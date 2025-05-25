'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Mail, MapPin, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { toast } from 'sonner';

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const email = 'aavclab.upmindanao@up.edu.ph';
  const facebookUrl = 'https://web.facebook.com/AAVCLab';
  const location = 'UP Mindanao, Tugbok, Davao City, 8000 Davao del Sur';
  const mapUrl = 'https://maps.app.goo.gl/DCRybnhQom2ybXeWA';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success("Message sent! We'll get back to you as soon as possible.");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Connect With Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're eager to hear from you! Whether you're interested in collaborations, have
            inquiries, or wish to learn more about our work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form Card */}
          <Card className="shadow-lg border-gray-200 h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="shadow-lg border-gray-200 h-full">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/AAVC_facebook_profile.jpg"
                  alt="AAVCLab Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 2068px) 100vw, 328px"
                />
              </div>
              <CardTitle className="text-2xl">AAVCLab</CardTitle>
              <CardDescription className="text-base max-w-md">
                Agri Aqua Value Chain Laboratory at UP Mindanao
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <Link
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {location}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <Link
                      href={`mailto:${email}`}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {email}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <Facebook className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Facebook</h4>
                    <Link
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      @AAVCLab
                    </Link>
                  </div>
                </div>
              </div>

              <Separator />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
