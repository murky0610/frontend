import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Added PhoneIcon and MailIcon
import { HandshakeIcon, LinkIcon, PhoneIcon, MailIcon } from 'lucide-react';

export function PartnershipAndLinkagesComponent() {
  const partners = [
    {
      name: 'Brgy. Kidawa, Laak, Davao de Oro',
      contact: {
        // These are just placeholder strings indicating information isn't directly available here
        phone: '(Information typically obtained through the Municipality of Laak)',
        email: '(Information typically obtained through the Municipality of Laak)',
      },
      // No logo or website for this entry in the data
    },
    {
      name: 'Davao de Oro State College (DDOSC)',
      logo: '/Partners Logo/davao-de-oro-logo.jpg',
      website: 'https://ddosc.edu.ph/',
      contact: {
        phone: '(084) 829 0284 / +63 917-127-0418 / +63 919-084-8955',
        email: 'info@ddosc.edu.ph',
      },
    },
    {
      name: 'Davao Oriental State University (DOrSU)',
      logo: '/Partners Logo/dorsu-logo.jpg',
      website: 'https://dorsu.edu.ph/',
      contact: {
        phone: '(087) 811-4079 / (087) 388-3207',
        email: 'op@dorsu.edu.ph',
      },
    },
    {
      name: 'UPLB SARAI Project',
      logo: '/Partners Logo/upscale-sarai-logo.png',
      website: 'https://sarai.ph/',
      contact: {
        phone: '+63 49 536 3080',
        email: 'projectsarai@up.edu.ph',
      },
    },
    {
      name: 'UP Mindanao – Land Reservation Management Office (LRMO)',
      logo: '/Partners Logo/upmin-logo.png',
      website: 'https://www.upmin.edu.ph/',
      contact: {
        phone: '(082) 293-0302 / (082) 293-0084',
        email: 'ovca.upmindanao@up.edu.ph',
      },
    },
    {
      name: 'World Agroforestry – International Centre for Research in Agroforestry (ICRAF)',
      logo: '/Partners Logo/cifor-icraf-logo.png',
      website: 'https://www.worldagroforestry.org/',
      contact: {
        phone: '+63 49 536 2701',
        email: 'icraf-philippines@cifor-icraf.org',
      },
    },
  ];

  // Helper to check if contact info is just the placeholder string
  const isPlaceholderContact = (contact: {
    // These are just placeholder strings indicating information isn't directly available here
    phone: string;
    email: string;
  }) =>
    contact &&
    contact.phone &&
    contact.phone.includes('Information typically obtained') &&
    contact.email &&
    contact.email.includes('Information typically obtained');

  return (
    <div className="container py-12 mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Partners & Linkages
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We collaborate with various organizations to achieve our mission and create meaningful
            impact.
          </p>
        </div>

        <Tabs defaultValue="partners" className="w-full">
          {/* Add TabsList and Triggers here if you plan to add other tabs */}
          {/* <TabsList>
            <TabsTrigger value="partners">Partners</TabsTrigger>
             Add other triggers if needed
           </TabsList> */}

          <TabsContent value="partners" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                // Use flex-col to structure the card content vertically
                <Card key={index} className="overflow-hidden flex flex-col">
                  <CardHeader className="pb-2 flex-grow-0">
                    {' '}
                    {/* flex-grow-0 keeps header height based on content */}
                    <div className="flex items-center gap-4">
                      {/* Logo Placeholder/Image */}
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            fill
                            className="object-contain p-2" // Add padding to logo
                          />
                        ) : (
                          // Show a default icon if no logo is provided
                          <HandshakeIcon size={30} className="text-muted-foreground" />
                        )}
                      </div>
                      {/* Partner Name */}
                      {/* Use CardTitle for the main name, allow flex-grow to take space */}
                      <CardTitle className="text-lg leading-snug flex-grow">
                        {partner.name}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  {/* CardContent for Contact Info - Only render if real contact info exists */}
                  {partner.contact && !isPlaceholderContact(partner.contact) && (
                    <CardContent className="pt-2 space-y-1 text-sm text-muted-foreground flex-grow-0">
                      {' '}
                      {/* pt-2 adds spacing from header */}
                      {partner.contact.phone &&
                        !partner.contact.phone.includes('Information typically obtained') && (
                          <div className="flex items-center gap-2">
                            {' '}
                            {/* Added gap for icon */}
                            <PhoneIcon size={14} className="flex-shrink-0 text-gray-500" />{' '}
                            {/* Added icon and styling */}
                            <span>{partner.contact.phone}</span>
                          </div>
                        )}
                      {partner.contact.email &&
                        !partner.contact.email.includes('Information typically obtained') && (
                          <div className="flex items-center gap-2">
                            {' '}
                            {/* Added gap for icon */}
                            <MailIcon size={14} className="flex-shrink-0 text-gray-500" />{' '}
                            {/* Added icon and styling */}
                            <span>{partner.contact.email}</span>
                          </div>
                        )}
                    </CardContent>
                  )}

                  {/* CardContent for Website Link - Only render if website exists */}
                  {partner.website && (
                    // Use flex-grow to push the website link down in cards with less content
                    <CardContent className="pt-2 flex-grow">
                      {/* Make the website a clickable link */}
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-2"
                      >
                        <LinkIcon size={14} className="flex-shrink-0" /> {/* Added icon */}
                        <span>{partner.website}</span>
                      </a>
                    </CardContent>
                  )}

                  {/* Handle the case for partners like Brgy. Kidawa with minimal info */}
                  {!partner.logo && isPlaceholderContact(partner.contact) && !partner.website && (
                    <CardContent className="pt-2 text-sm italic text-muted-foreground flex-grow">
                      {' '}
                      {/* flex-grow to take up remaining space */}
                      Contact information available through the Municipality of Laak.
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
