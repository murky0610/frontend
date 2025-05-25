import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NewsAndEventsComponent() {
  // Manually added news and events data
  const newsAndEvents = [
    {
      id: 1,
      title:
        'UPLB 4th Global Agribusiness Management and Entrepreneurship Conference and Expo (GAME 2024) DOST-PCAARRD-led Parallel Session',
      image: '/news-events/game-oral.jpg?height=400&width=600', // Adjusted size for page view
      date: 'January 16, 2025',
      description:
        'AAVC Laboratory Project Staff members presented during the UPLB 4th Global Agribusiness Management and Entrepreneurship Conference and Expo (GAME 2024) DOST-PCAARRD-led Parallel Session. Asst. Prof. Shemaiah Gail P. Placencia from Project 1 presented “Willingness to adopt Industry 4.0 technologies among coffee and cacao-based farmers and MSMEs” and Ms. El Veena Grace A. Rosero from Project 2 presented “Assessing the Dynamics of the Coffee Value Chain in Davao del Sur: An Agent-Based Modeling Approach.” ',
      link: '/news-events/1', // Link might be internal or external depending on content
    },
    {
      id: 2,
      title: 'SMAARRDEC 37th Regional Symposium on Research, Development and Extension Highlights',
      image: '/news-events/smardec.jpg?height=400&width=600', // Adjusted size for page view
      date: 'November 20, 2024',
      description:
        'During the Southern Mindanao Agriculture, Aquatic and Natural Resources Research & Development Consortium (SMAARRDEC) 37th Regional Symposium on Research, Development and Extension Highlights Mr. Mark James Saguimpa submitted the abstract of the study “The Effect of Elevation on the Technical Efficiency of Robusta Coffee Farmers in Sultan Kudarat, Philippines” for the Research Category, which was eventually featured in the Book of Abstracts. Other researchers, Ms. Alessa Keith E. Carbonell and Mr. Jeff Erxon B. Palen were also present during the event, as shown in Figure 21. Meanwhile, Ms. Novy Aila B. Rivas competed for the Poster Category, explaining her study “Identifying Optimal Market Choices to Increase the Profitability of Coffee Farmers in Sultan Kudarat through Modeling and Scenario Analysis.” The poster highlights that the coffee farmers’ profitability is significantly influenced by product pricing in different markets, the coffee product choice to sell, and the value-adding costs. It is recommended to produce high-quality beans to increase market opportunities, secure higher prices, and reduce processing costs. ',
      link: '/news-events/2', // Link might be internal or external depending on content
    },
    {
      id: 3,
      title:
        '17th UP Mindanao Supply Chain Management Forum: Sustainable Growth and Optimization in Agricultural Value Chains',
      image: '/news-events/17th.jpg?height=400&width=600', // Adjusted size for page view
      date: 'October 10, 2024',
      description: `
        The oral presentations include The Effect of Elevation on the Technical Efficiency of Robusta Coffee Farmers in Sultan Kudarat, Philippines by Mr. Mark James S. Saguimpa, Factors Influencing Market Outlet Choice of Coffee Farmers in Sultan Kudarat, Philippines by Mr. Adrianne John A. Nuñeza, Effects of Farm Management Practices on Technical Efficiency: A Case of Cacao Farmers in Laak, Davao de Oro, and Veruela, Agusan del Sur by Ms. Alessa Keith E. Carbonell, Exploring Profitability of Small-Scale Cavendish Banana Growers through Allocating Banana Yield to Different Banana Classes: an SCND Modeling and Simulation Approach by Ms. Novy Aila B. Rivas, and Maximizing Profitability for Cavendish Banana Farmers through the Development of a Cost Calculator and Market Optimizer Application by Mr. Alex John C. Labanon.
      During the first session, Mr. Saguimpa emphasized that a Robusta coffee farm’s yield improves with increased fertilizer inputs and planted trees, and enhanced technical skills and knowledge. He also noted that access to additional postharvest facilities, expanded credit, and better market access are critical for achieving higher yields. Furthermore, farms situated at medium altitudes (501 to 1,000 meters above sea level) demonstrated significantly improved technical efficiency. Key recommendations include enhancing access to inputs, markets, and infrastructure, and promoting sustainable farming practices, such as agroforestry, to improve productivity and environmental resilience. According to Mr. Nuñeza, coffee farmers who have the lesser likelihood of choosing direct buyers as their market outlet choice relative to traders are those who buy their own fertilizers, identify low prices, poor road infrastructure, and high transportation costs as their main challenge, have access to post-harvest facilities, and are located in Lebak. Meanwhile, coffee farmers who have the greater likelihood of choosing direct buyers as their market outlet choice relative to traders are those who have access to credit and identify high price as a reason for selling in a market outlet. Recommendations include expedition of farm-to-market road infrastructure and post-harvest facilities for accessibility and convenience, provision of credit and subsidy access to farmers, and provision of timely and accessible market price information.
    Moreover, during the second session, Ms. Carbonell posited that the significant factors affecting the technical efficiency of cacao farmers in Laak and Veruela, using the baseline data, are the number of trees, pod sleeving, fermenting, being a female farmer, educational attainment, and IP affiliation. Meanwhile, the significant factors affecting the technical efficiency of cacao farmers in Laak and Veruela, using the end-line data, are the number of trees, fermenting, and being a female farmer. Recommendations include improving farming techniques, pest management strategies, and market access, and promotion of pod-sleeving and fermentation. Ms. Rivas reported that non-contractual markets have higher market prices for all banana classes than contractual markets; however, due to the price volatility of non-contractual markets, farmers can experience losses. There is also a slight increase in the monthly profit of Cavendish banana farmers when selling feed-grade banana flour when the demand for flour is high. Farmers can also gain higher profit when processing only rejects into flour than when processing cluster and rejects simultaneously. As such, to maximize profits, farmers should improve farming practices to improve quality (i.e., Class A). Recommendations include more data validation, integrating harvest dynamics and other factors such as pests and diseases. Mr. Labanon reported that the applications can be beneficial for Cavendish banana farmers to empower them to have better decision-making skills. The application can also improve the financial outcomes of farmers to track their costs and ensuring the optimal selling of their products. Recommendations include conducting beta testing of the applications to Cavendish banana farmers and using their feedback to improve the interface and functions of the application.
    
        `,
      link: '/news-events/3', // Link might be internal or external depending on content
    },
    {
      id: 4,
      title: 'Mindanao Research Symposium on the Future of Agri-food Systems',
      image: '/news-events/mindanao-symposium.jpg?height=400&width=600', // Adjusted size for page view
      date: 'August 22, 2024',
      description: `
        During the Southern Mindanao Agriculture, Aquatic and Natural Resources Research & Development Consortium (SMAARRDEC) 37th Regional Symposium on Research, Development and Extension Highlights Mr. Mark James Saguimpa submitted the abstract of the study “The Effect of Elevation on the Technical Efficiency of Robusta Coffee Farmers in Sultan Kudarat, Philippines” for the Research Category, which was eventually featured in the Book of Abstracts. Other researchers, Ms. Alessa Keith E. Carbonell and Mr. Jeff Erxon B. Palen were also present during the event, as shown in Figure 21. Meanwhile, Ms. Novy Aila B. Rivas competed for the Poster Category, explaining her study “Identifying Optimal Market Choices to Increase the Profitability of Coffee Farmers in Sultan Kudarat through Modeling and Scenario Analysis.” The poster highlights that the coffee farmers’ profitability is significantly influenced by product pricing in different markets, the coffee product choice to sell, and the value-adding costs. It is recommended to produce high-quality beans to increase market opportunities, secure higher prices, and reduce processing costs. 
        `,
      link: '/news-events/4', // Link might be internal or external depending on content
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">NEWS AND EVENTS</h1>
          <div className="h-1 w-full bg-white/20 mt-2"></div>
        </div>
      </div>

      {/* News and Events Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsAndEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <Link href={item.link}>
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-emerald-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-6">{item.description}</p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-emerald-700 text-sm font-medium hover:text-emerald-800 hover:underline"
                  >
                    READ MORE <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
