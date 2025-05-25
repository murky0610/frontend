import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Optional: for a back button

export default function Page3rdNews() {
  const item = {
    id: 1,
    title:
      '17th UP Mindanao Supply Chain Management Forum: Sustainable Growth and Optimization in Agricultural Value Chains',
    image: '/news-events/17th.jpg?height=400&width=600', // Adjusted size for page view
    date: 'October 10, 2024',
    description: (
      <>
        <p className="indent-8 mb-4">
          The oral presentations include The Effect of Elevation on the Technical Efficiency of
          Robusta Coffee Farmers in Sultan Kudarat, Philippines by Mr. Mark James S. Saguimpa,
          Factors Influencing Market Outlet Choice of Coffee Farmers in Sultan Kudarat, Philippines
          by Mr. Adrianne John A. Nuñeza, Effects of Farm Management Practices on Technical
          Efficiency: A Case of Cacao Farmers in Laak, Davao de Oro, and Veruela, Agusan del Sur by
          Ms. Alessa Keith E. Carbonell, Exploring Profitability of Small-Scale Cavendish Banana
          Growers through Allocating Banana Yield to Different Banana Classes: an SCND Modeling and
          Simulation Approach by Ms. Novy Aila B. Rivas, and Maximizing Profitability for Cavendish
          Banana Farmers through the Development of a Cost Calculator and Market Optimizer
          Application by Mr. Alex John C. Labanon.
        </p>
        <p className="indent-8 mb-4">
          During the first session, Mr. Saguimpa emphasized that a Robusta coffee farm’s yield
          improves with increased fertilizer inputs and planted trees, and enhanced technical skills
          and knowledge. He also noted that access to additional postharvest facilities, expanded
          credit, and better market access are critical for achieving higher yields. Furthermore,
          farms situated at medium altitudes (501 to 1,000 meters above sea level) demonstrated
          significantly improved technical efficiency. Key recommendations include enhancing access
          to inputs, markets, and infrastructure, and promoting sustainable farming practices, such
          as agroforestry, to improve productivity and environmental resilience.
        </p>{' '}
        <p className="indent-8 mb-4">
          According to Mr. Nuñeza, coffee farmers who have the lesser likelihood of choosing direct
          buyers as their market outlet choice relative to traders are those who buy their own
          fertilizers, identify low prices, poor road infrastructure, and high transportation costs
          as their main challenge, have access to post-harvest facilities, and are located in Lebak.
          Meanwhile, coffee farmers who have the greater likelihood of choosing direct buyers as
          their market outlet choice relative to traders are those who have access to credit and
          identify high price as a reason for selling in a market outlet. Recommendations include
          expedition of farm-to-market road infrastructure and post-harvest facilities for
          accessibility and convenience, provision of credit and subsidy access to farmers, and
          provision of timely and accessible market price information.
        </p>
        <p className="indent-8 mb-4">
          Moreover, during the second session, Ms. Carbonell posited that the significant factors
          affecting the technical efficiency of cacao farmers in Laak and Veruela, using the
          baseline data, are the number of trees, pod sleeving, fermenting, being a female farmer,
          educational attainment, and IP affiliation. Meanwhile, the significant factors affecting
          the technical efficiency of cacao farmers in Laak and Veruela, using the end-line data,
          are the number of trees, fermenting, and being a female farmer. Recommendations include
          improving farming techniques, pest management strategies, and market access, and promotion
          of pod-sleeving and fermentation.
        </p>
        <p className="indent-8 mb-4">
          Ms. Rivas reported that non-contractual markets have higher market prices for all banana
          classes than contractual markets; however, due to the price volatility of non-contractual
          markets, farmers can experience losses. There is also a slight increase in the monthly
          profit of Cavendish banana farmers when selling feed-grade banana flour when the demand
          for flour is high. Farmers can also gain higher profit when processing only rejects into
          flour than when processing cluster and rejects simultaneously. As such, to maximize
          profits, farmers should improve farming practices to improve quality (i.e., Class A).
          Recommendations include more data validation, integrating harvest dynamics and other
          factors such as pests and diseases.
        </p>
        <p className="indent-8 mb-4">
          Mr. Labanon reported that the applications can be beneficial for Cavendish banana farmers
          to empower them to have better decision-making skills. The application can also improve
          the financial outcomes of farmers to track their costs and ensuring the optimal selling of
          their products. Recommendations include conducting beta testing of the applications to
          Cavendish banana farmers and using their feedback to improve the interface and functions
          of the application.
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
