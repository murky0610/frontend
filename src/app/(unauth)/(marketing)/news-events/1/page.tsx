import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Optional: for a back button

export default function InternshipProgramPage() {
  const item = {
    id: 1,
    title:
      'UPLB 4th Global Agribusiness Management and Entrepreneurship Conference and Expo (GAME 2024) DOST-PCAARRD-led Parallel Session',
    image: '/news-events/game-oral.jpg?height=400&width=600', // Adjusted size for page view
    date: 'August 2025',
    description:
      'AAVC Laboratory Project Staff members presented during the UPLB 4th Global Agribusiness Management and Entrepreneurship Conference and Expo (GAME 2024) DOST-PCAARRD-led Parallel Session. Asst. Prof. Shemaiah Gail P. Placencia from Project 1 presented “Willingness to adopt Industry 4.0 technologies among coffee and cacao-based farmers and MSMEs” and Ms. El Veena Grace A. Rosero from Project 2 presented “Assessing the Dynamics of the Coffee Value Chain in Davao del Sur: An Agent-Based Modeling Approach.” ',
    link: '#', // Link might be internal or external depending on content
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Optional Header Banner - Adapt as needed */}

      {/* Page Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Optional Back Link */}
          <Link href="/news-events" legacyBehavior>
            <a className="inline-flex items-center text-emerald-700 hover:text-emerald-900 mb-6 text-sm">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to News and Events
            </a>
          </Link>
          <div className=" mb-4">
            <div className="container mx-auto ">
              <h1 className="text-green-700 text-3xl font-bold">{item.title}</h1>
              <p className="text-green-700 text-sm mt-1"> {item.date}</p>
            </div>
          </div>
          {/* Image */}
          <div className="relative w-full h-64 md:h-96 mb-6 rounded-sm overflow-hidden shadow-md">
            <Image
              src={item.image || '/placeholder-large.svg'} // Use a larger placeholder if needed
              alt={item.title}
              fill
              className="object-cover"
              priority // Good to add priority for main content images
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-emerald max-w-none">
            {' '}
            {/* Using Tailwind Typography for styling */}
            {/* Title might be repeated here or rely on the banner */}
            {/* <h2 className="text-2xl font-semibold text-emerald-800 mb-4">{item.title}</h2> */}
            {/* <p className="text-sm text-gray-500 mb-4">Date: {item.date}</p> */}
            <p className="indent-6 leading-relaxed">{item.description}</p>
            {/* Add more paragraphs, lists, etc. here for the full article content */}
            {/* Example of adding more content */}
            {/* Optional Link/Button if applicable */}
            {item.link && item.link !== '#' && (
              <div className="mt-8">
                <Link href={item.link} legacyBehavior>
                  <a className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-sm shadow hover:bg-emerald-700 transition-colors">
                    Learn More / Apply Here
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
