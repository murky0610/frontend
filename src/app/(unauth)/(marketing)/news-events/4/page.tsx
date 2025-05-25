import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Optional: for a back button

export default function Page4thNews() {
  const item = {
    id: 1,
    title: 'Mindanao Research Symposium on the Future of Agri-food Systems',
    image: '/news-events/mindanao-symposium.jpg?height=400&width=600', // Adjusted size for page view
    date: 'August 22, 2024  ',
    description: (
      <>
        <p className="indent-8 mb-4">
          The University of the Philippines Mindanao organized the Mindanao Symposium Series to
          foster discussions among various stakeholders about various issues affecting Mindanao and
          the rest of the country as well as help shape the agenda for research and development in
          shared areas of concern—namely, the agri-food system, bio-cultural diversity, innovative
          and sustainable environments, sports development, health, and innovation—for research
          institutions in the island and beyond.
        </p>
        <p className="indent-8 mb-4">
          For the inaugural session of the series, we have gathered various speakers to talk about
          their thoughts on the topic in a roundtable discussion, highlighting various intersecting
          issues like the role of technology, conflict, environmental trade-offs, public policy, and
          international collaborations in shaping the future of agri-food systems. The Symposium
          featured presentations from members of the newly launched Agri-Aqua Value Chain Laboratory
          in UP Mindanao led by Dr. Digal of the School of Management. Researchers and other
          stakeholders participated in the symposium to share their thoughts and research and help
          shape the research and development agenda for inclusive, resilient, and sustainable
          agri-food chains.
        </p>
        <p className="indent-8 mb-4">
          This exclusive session of the Agri-Aqua VC Lab shared the updated value chain studies
          focused on assessing key interventions, such as the push to adopt Industry 4.0
          technologies in agriculture, clustering strategies for smallholders, and demand analysis
          for value-added products across the three target commodities. A study on the pathways for
          adopting smallholder farmers and MSMEs was conducted to inform ongoing Fourth Industrial
          Revolution (FIRe) programs on the current state of the technology in agriculture and
          contribute by informing strategies to approaches. Long-time value chain interventions such
          as clustering and value-adding were also assessed in the context of a smallholder farmer
          group in a land reservation area in Davao de Oro. Demand-side analysis using point-of-sale
          data of banana ketchup, a processed product, was also conducted to provide insight into an
          essential segment in agri-food chains. The laboratory improved on a decision support
          platform for coffee farmers, integrating a new feature from the modeling and simulations
          performed on the coffee industry data using supply chain network design (SCND). These come
          together in a web application that will aid farmers in decision-making to increase their
          profits. Value chain research and development through the Agri-Aqua Value Chain Laboratory
          hopes to contribute to building inclusive, resilient, and sustainable agri-food systems
          (Table 38).
        </p>
        <p className="indent-8 mb-4">
          The same symposium also featured poster presentations where two young researchers mentored
          under the Agri-Aqua VC Lab had the opportunity to present their work. The first poster, by
          Adrianne John A. Nuñeza, featured the factors that influence the choice of markets by
          smallholder coffee farmers in Lebak and Kalamansig, Sultan Kudarat. Alessa Keith E.
          Carbonell also presented her study on the effect of irrigation on the technical efficiency
          of rice farmers in Mlang, Cotabato.
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
            <p>{item.description}</p>
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
