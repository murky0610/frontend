import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Optional: for a back button

export default function Page2ndNews() {
  const item = {
    id: 1,
    title: 'SMAARRDEC 37th Regional Symposium on Research, Development and Extension Highlights',
    image: '/news-events/smardec.jpg?height=400&width=600', // Adjusted size for page view
    date: 'November 20, 2024',
    description: (
      <>
        <p className="indent-8 mb-4">
          During the Southern Mindanao Agriculture, Aquatic and Natural Resources Research &
          Development Consortium (SMAARRDEC) 37th Regional Symposium on Research, Development and
          Extension Highlights Mr. Mark James Saguimpa submitted the abstract of the study “The
          Effect of Elevation on the Technical Efficiency of Robusta Coffee Farmers in Sultan
          Kudarat, Philippines” for the Research Category, which was eventually featured in the Book
          of Abstracts. Other researchers, Ms. Alessa Keith E. Carbonell and Mr. Jeff Erxon B. Palen
          were also present during the event, as shown in Figure 21.
        </p>
        <p className="indent-8 mb-4">
          Meanwhile, Ms. Novy Aila B. Rivas competed for the Poster Category, explaining her study
          “Identifying Optimal Market Choices to Increase the Profitability of Coffee Farmers in
          Sultan Kudarat through Modeling and Scenario Analysis.” The poster highlights that the
          coffee farmers’ profitability is significantly influenced by product pricing in different
          markets, the coffee product choice to sell, and the value-adding costs. It is recommended
          to produce high-quality beans to increase market opportunities, secure higher prices, and
          reduce processing costs.
        </p>
      </>
    ),
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
            <p className="leading-relaxed">{item.description}</p>
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
