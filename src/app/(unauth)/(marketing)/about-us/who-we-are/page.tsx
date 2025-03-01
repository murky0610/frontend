import React from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export function whoWe() {
  const divisions = [
    {
      name: "Project Leader",
      teams: [
        {
          name: "A/Prof. Giovanna Fae R. Oguis, Ph.D.",
          position: "Project Leader",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummyDomestic",
          linkedinLink: "https://www.linkedin.com/in/dummyDomestic",
        },
      ],
    },
    {
      name: "Co-Project Leader",
      teams: [
        {
          name: "Prof. Larry N. Digal, Ph.D.",
          position: "Co-Project Leader",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummyHR",
          linkedinLink: "https://www.linkedin.com/in/dummyHR",
        },
      ],
    },
    {
      name: "Project Staff",
      teams: [
        {
          name: "a/Prof. Shemaiah Gail Placencia",
          position: "Project Staff",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummyContent",
          linkedinLink: "https://www.linkedin.com/in/dummyContent",
        },
        {
          name: "a/Prof. Jon Henly O. Santillan",
          position: "Project Staff",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummySEO",
          linkedinLink: "https://www.linkedin.com/in/dummySEO",
        },
        {
          name: "Jo-an A. Garcia",
          position: "Project Staff",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummyContent",
          linkedinLink: "https://www.linkedin.com/in/dummyContent",
        },
        {
          name: "Carol Q. Balgos",
          position: "Project Staff",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummySEO",
          linkedinLink: "https://www.linkedin.com/in/dummySEO",
        },
        {
          name: "El Veena Grace A. Rosero",
          position: "Project Staff",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummySocial",
          linkedinLink: "https://www.linkedin.com/in/dummySocial",
        },
      ],
    },
    {
      name: "Research Assistants",
      teams: [
        {
          name: "Novy Aila B. Rivas",
          position: "Project Technical Assistant III",
          profileImage: "/test_profile.jpg",
          linkedinLink: "https://www.linkedin.com/in/novy-aila-rivas-1a989a241/",
        },
        {
          name: "Mark James S. Saguimpa",
          position: "Project Technical Assistant II",
          profileImage: "/test_profile.jpg",
          linkedinLink: "https://www.linkedin.com/in/saguimpamarkjames/",
        },
        {
          name: "John Noel A. Garcia",
          position: "Project Administrative Aide VI",
          profileImage: "/test_profile.jpg",
          linkedinLink: "https://www.linkedin.com/in/jnoel-g-jnag/",
        },
        {
          name: "Jeff Erxon B. Palen",
          position: "Project Technical Assistant II",
          profileImage: "/test_profile.jpg",
          linkedinLink: "https://www.linkedin.com/in/jefferxonpalen/",
        },
        {
          name: "Merc Ceasar S. Maiquilla",
          position: "Project Technical Assistant I",
          profileImage: "/test_profile.jpg",
          googleScholarLink: "https://scholar.google.com/citations?user=dummyInternational",
          linkedinLink: "https://www.linkedin.com/in/jefferxonpalen/",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          About Us
        </h1>

        {divisions.map((division, idx) => {
          // For "Project Staff" and "Research Assistants", display in 2 columns + 1 centered row
          if (
            division.name === "Project Staff" ||
            division.name === "Research Assistants"
          ) {
            return (
              <section key={idx} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {division.name}
                </h2>
                {/* First row -> 2 columns with 2 members each */}
                <div className="flex justify-center gap-6">
                  {/* Column 1: slice(0,2) */}
                  <div className="flex flex-col items-center space-y-6">
                    {division.teams.slice(0, 2).map((team, tIdx) => (
                      <ProfileCard team={team} key={tIdx} />
                    ))}
                  </div>

                  {/* Column 2: slice(2,4) */}
                  <div className="flex flex-col items-center space-y-6">
                    {division.teams.slice(2, 4).map((team, tIdx) => (
                      <ProfileCard team={team} key={tIdx} />
                    ))}
                  </div>
                </div>

                {/* Second row -> the 5th member in center */}
                <div className="flex justify-center mt-6">
                  {division.teams.slice(4).map((team, tIdx) => (
                    <ProfileCard team={team} key={tIdx} />
                  ))}
                </div>
              </section>
            )
          } else {
            // For other divisions, keep the simpler layout or a single row
            return (
              <section key={idx} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {division.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {division.teams.map((team, tIdx) => (
                    <ProfileCard team={team} key={tIdx} />
                  ))}
                </div>
              </section>
            )
          }
        })}
      </div>
    </div>
  )
}

// Reusable card component
function ProfileCard({ team }) {
  return (
    <Card className="w-[300px] p-2 hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48 mb-2">
        <Image
          src={team.profileImage}
          alt={team.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-semibold text-gray-700 text-center">{team.name}</h3>
      <p className="text-gray-500 text-center">{team.position}</p>
      <div className="flex justify-center items-center space-x-4 p-2">
        {team.googleScholarLink && (
          <a
            href={team.googleScholarLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/google_scholar_icon.png"
              alt="Google Scholar"
              width={24}
              height={24}
              className="object-contain"
            />
          </a>
        )}
        {team.linkedinLink && (
          <a href={team.linkedinLink} target="_blank" rel="noopener noreferrer">
            <Image
              src="/li_logo.png"
              alt="LinkedIn"
              width={24}
              height={24}
              className="object-contain"
            />
          </a>
        )}
      </div>
    </Card>
  )
}

export default whoWe
