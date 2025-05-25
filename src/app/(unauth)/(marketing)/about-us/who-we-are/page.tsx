import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function WhoWeArePage() {
  const divisions = [
    {
      name: 'Project Coordinators',
      teams: [
        {
          name: 'A/Prof. Giovanna Fae R. Oguis, Ph.D.',
          position: 'Project Leader',
          profileImage: '/Staff Pictures/Oguis.jpg',
          googleScholarLink: 'https://scholar.google.com/citations?user=XBoqpkYAAAAJ',
        },
        {
          name: 'Prof. Larry N. Digal, Ph.D.',
          position: 'Co-Project Leader',
          profileImage: '/Staff Pictures/Digal.png',
          googleScholarLink: 'https://scholar.google.com.my/citations?user=eF-vThgAAAAJ',
          linkedinLink: 'https://ph.linkedin.com/in/larry-digal-15684b126',
        },
      ],
    },
    {
      name: 'Project Staff',
      teams: [
        {
          name: 'a/Prof. Shemaiah Gail Placencia',
          position: 'Project Staff',
          profileImage: '/Staff Pictures/Placencia.png',
          googleScholarLink: 'https://scholar.google.com.ph/citations?user=vhzgX4QAAAAJ​',
        },
        {
          name: 'a/Prof. Jon Henly O. Santillan',
          position: 'Project Staff',
          profileImage: '/Staff Pictures/Santillan.jpg',
          googleScholarLink: 'https://scholar.google.com/citations?user=BHsOCdoAAAAJ&hl=en&oi=ao',
          linkedinLink: 'https://www.linkedin.com/in/dummySEO',
        },
        {
          name: 'Jo-an A. Garcia',
          position: 'Project Staff',
          profileImage: '/Staff Pictures/JGarcia.jpg',
          linkedinLink: 'https://www.linkedin.com/in/jo-an-garcia-b31bb6238/',
        },
        {
          name: 'Carol Q. Balgos',
          position: 'Project Staff',
          profileImage: '/Staff Pictures/Balgos.png',
          googleScholarLink: 'https://scholar.google.com/citations?hl=en&user=Ku3vdIAAAAAJ',
          linkedinLink: 'https://ph.linkedin.com/in/balgos-carol-943578126 ​',
        },
        {
          name: 'El Veena Grace A. Rosero',
          position: 'Project Staff',
          profileImage: '/Staff Pictures/Rosero.jpg',
          googleScholarLink: 'https://scholar.google.com/citations?user=j5i1QpcAAAAJ ​',
        },
      ],
    },
    {
      name: 'Research Assistants',
      teams: [
        {
          name: 'Novy Aila B. Rivas',
          position: 'Project Technical Assistant III',
          profileImage: '/Staff Pictures/Rivas.jpg',
          linkedinLink: 'https://www.linkedin.com/in/novy-aila-rivas-1a989a241/',
        },
        {
          name: 'Mark James S. Saguimpa',
          position: 'Project Technical Assistant II',
          profileImage: '/Staff Pictures/Saguimpa.jpg',
          googleScholarLink: 'https://scholar.google.com/citations?hl=en&user=6K8ijc4AAAAJ',
          linkedinLink: 'https://www.linkedin.com/in/saguimpamarkjames/',
        },
        {
          name: 'Jeff Erxon B. Palen',
          position: 'Project Technical Assistant II',
          profileImage: '/Staff Pictures/Palen.jpg',
          linkedinLink: 'https://www.linkedin.com/in/jefferxonpalen/',
        },
        {
          name: 'John Noel A. Garcia',
          position: 'Project Administrative Aide VI',
          profileImage: '/Staff Pictures/Garcia.jpg',
          linkedinLink: 'https://www.linkedin.com/in/jnoel-g-jnag/',
        },
        {
          name: 'Merc Ceasar S. Maiquilla',
          position: 'Project Technical Assistant I',
          profileImage: '/Staff Pictures/Maiquilla.png',
          linkedinLink: 'https://www.linkedin.com/in/merc-ceasar-maiquilla-6a374a323/',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Main content container - Centered by mx-auto */}
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">About Us</h1>

        {divisions.map((division, idx) => (
          <section key={idx} className="mb-12">
            {/* Division title - Centered on small screens, left-aligned on larger */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
              {division.name}
            </h2>
            {/* Flexbox container for profile cards - allows wrapping and centers items */}
            <div className="flex flex-wrap justify-center gap-6">
              {division.teams.map((team, tIdx) => (
                <ProfileCard team={team} key={tIdx} />
              ))}
            </div>
          </section>
        ))}
      </div>
      {/* Org chart image container - Centered by mx-auto */}
      <div className="mx-auto max-w-7xl mb-12">
        <Image
          src="/aavc_org_chart_final.png"
          width={1000}
          height={700}
          alt="Organizational Chart of AAVC"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </div>
  );
}
interface TeamMember {
  name: string;
  position: string;
  profileImage: string;
  googleScholarLink?: string;
  linkedinLink?: string;
}
// Reusable card component
function ProfileCard({ team }: { team: TeamMember }) {
  return (
    // Card with responsive width and centered content
    <Card className="w-full sm:w-[300px] max-w-sm p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="relative w-full h-48 mb-4">
        <Image src={team.profileImage} alt={team.name} fill className="object-contain" />
      </div>
      <h3 className="font-semibold text-gray-700 text-lg mb-1">{team.name}</h3>
      <p className="text-gray-500 text-sm mb-4">{team.position}</p>
      <div className="flex justify-center items-center space-x-4">
        {team.googleScholarLink && (
          <Link href={team.googleScholarLink} target="_blank" rel="noopener noreferrer">
            <Image
              src="/google_scholar_icon.png"
              alt="Google Scholar"
              width={24}
              height={24}
              className="object-contain"
            />
          </Link>
        )}
        {team.linkedinLink && (
          <Link href={team.linkedinLink} target="_blank" rel="noopener noreferrer">
            <Image
              src="/li_logo.png"
              alt="LinkedIn"
              width={24}
              height={24}
              className="object-contain"
            />
          </Link>
        )}
      </div>
    </Card>
  );
}
