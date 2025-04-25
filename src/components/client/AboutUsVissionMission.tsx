export default function AboutUsVissionMission() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-gradient-to-r from-emerald-800 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-3 h-full">
  
          </div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Us
          </h1>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg transform transition-transform hover:scale-[1.02]">
              <h2 className="text-3xl font-bold text-emerald-800 mb-6 inline-flex items-center">
                <span className="bg-emerald-800 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  M
                </span>
                Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The Agri-Aqua Value Chain Laboratory (AAVC Lab) is committed to advancing research, technology, and
                collaboration in agricultural and aquatic value chains. Through continuous innovation, stakeholder
                engagement, and capacity building, we aim to develop sustainable, inclusive, and resilient solutions
                that enhance competitiveness, drive policy improvements, and support economic growth for communities.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg transform transition-transform hover:scale-[1.02]">
              <h2 className="text-3xl font-bold text-blue-800 mb-6 inline-flex items-center">
                <span className="bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  V
                </span>
                Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To be a leading knowledge hub in agri-aqua value chain development, driving innovation, sustainability,
                and inclusivity to create resilient and competitive agricultural systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Guiding Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-amber-500 transform transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Inclusivity</h3>
              <p className="text-gray-600 text-center">
                Ensuring all stakeholders, regardless of size or background, have equitable access to resources,
                opportunities, and benefits within the agri-aqua value chain.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-emerald-500 transform transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Resilience</h3>
              <p className="text-gray-600 text-center">
                Building adaptive capacity within agricultural systems to withstand, recover from, and thrive despite
                environmental, economic, and social challenges.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-teal-500 transform transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Sustainability</h3>
              <p className="text-gray-600 text-center">
                Developing practices and solutions that meet present needs while preserving resources and ecosystems for
                future generations across environmental, economic, and social dimensions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">CORE VALUES</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-lg p-6 text-center shadow-md transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-purple-800">Inclusive</h3>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center shadow-md transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-blue-800">Excellence</h3>
            </div>
            <div className="bg-cyan-50 rounded-lg p-6 text-center shadow-md transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-cyan-800">Innovative</h3>
            </div>
            <div className="bg-teal-50 rounded-lg p-6 text-center shadow-md transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-teal-800">Service Oriented</h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center shadow-md transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-green-800">Committed</h3>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6 text-center shadow-md transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-emerald-800">Collaborative</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Services Offered</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-amber-500 transform transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Trainings and Workhops</h3>
              <p className="text-gray-600 text-center">
              Join our hands-on trainings, workshops, and bootcamps to enhance your skills and knowledge in disease surveillance, analytics, and public health. Our interactive sessions are designed to equip you with practical tools and techniques that you can apply in real-world scenarios
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-emerald-500 transform transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Mobile Apps</h3>
              <p className="text-gray-600 text-center">
              Mobile apps such as Market Profit Optimizer and Cost Calculator for commodities of Cacao, Coffee, and Cavendish Banana
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-teal-500 transform transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Repository</h3>
              <p className="text-gray-600 text-center">
                Repository kay about para makita ang mga papers or something like that about VC Chain studies
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-teal-500 transform transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Directory</h3>
              <p className="text-gray-600 text-center">
                Directory kay para makita ang location and information sa Farmers and Buyers Via Mapping 
              </p>
            </div>
          </div>
          
    
        </div>
      </section>
      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} Agri-Aqua Value Chain Laboratory (AAVC Lab). All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  )
}
