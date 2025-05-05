// // Install necessary dependencies:
// // npm install leaflet @types/leaflet react-leaflet
// "use client"
// import { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// interface ProvinceProperties {
//   name: string;
//   commodities: string[];
//   entities: {
//     [key: string]: string[];
//   };
// }

// // Define custom layer type that includes feature property
// interface GeoJSONLayer extends L.Layer {
//     feature: GeoJSON.Feature<GeoJSON.Geometry, ProvinceProperties>;
//   }

// const MindanaoMap: React.FC = () => {
//   const mapRef = useRef<L.Map | null>(null);
//   const geoJsonRef = useRef<L.GeoJSON | null>(null);
//   const [selectedProvince, setSelectedProvince] = useState<ProvinceProperties | null>(null);
//   const mapContainerRef = useRef<HTMLDivElement>(null);

//   // Sample GeoJSON data (replace with your actual data)
//   const provinceData: GeoJSON.FeatureCollection = {
//     "type": "FeatureCollection",
//     "features": [
//         {
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [
//                             125.83071547434157,
//                             7.354265605545954
//                         ],
//                         [
//                             125.67676842672509,
//                             7.264634529241802
//                         ],
//                         [
//                             125.28892133281899,
//                             7.595815645601065
//                         ],
//                         [
//                             125.3742908147099,
//                             7.997755137816821
//                         ],
//                         [
//                             125.67544095189405,
//                             7.996715962426966
//                         ],
//                         [
//                             125.83071547434157,
//                             7.354265605545954
//                         ]
//                     ]
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "source": "https://simplemaps.com",
//                 "id": "PHDAV",
//                 "name": "Davao del Norte",
//                 "commodities": ["Banana Saba", "Cacao", "Coconut"],
//                 "entities": {
//                     "banana_saba_owners": ["Cale88 Foods Corporation", "Jef Banana Chips"],
//                     "cacao_owners": ["Chokolate de San Isidro (CSI)", "Chocoloco, Inc.", "Derya Tablia"],
//                     "coconut_owners": ["Raymundo's Homemade Products", "Hijo Resources Corporation"]
//                 } 
//             },
//             "id": 0
//         },
//         {
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [
//                             125.17650129624062,
//                             6.56332971495239
//                         ],
//                         [
//                             125.14970502617048,
//                             6.782221920446089
//                         ],
//                         [
//                             125.30277062505455,
//                             7.017349774093344
//                         ],
//                         [
//                             125.50993899552716,
//                             7.015570347179691
//                         ],
//                         [
//                             125.66732831878355,
//                             5.9501406589810895
//                         ],
//                         [
//                             125.30647638399384,
//                             5.583575862001599
//                         ],
//                         [
//                             125.52518598732915,
//                             6.0515689050453165
//                         ],
//                         [
//                             125.1408079452604,
//                             6.434871184373312
//                         ],
//                         [
//                             125.17650129624062,
//                             6.56332971495239
//                         ]
//                     ]
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "source": "https://simplemaps.com",
//                 "id": "PHDVO",
//                 "name": "Davao Occidental"
//             },
//             "id": 2
//         },
//         {
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [
//                             125.28892133281899,
//                             7.595815645601065
//                         ],
//                         [
//                             125.67676842672509,
//                             7.264634529241802
//                         ],
//                         [
//                             125.50993899552716,
//                             7.015570347179691
//                         ],
//                         [
//                             125.30277062505455,
//                             7.017349774093344
//                         ],
//                         [
//                             125.26597003082107,
//                             7.578428757612773
//                         ],
//                         [
//                             125.28892133281899,
//                             7.595815645601065
//                         ]
//                     ]
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "source": "https://simplemaps.com",
//                 "id": "PHDAS",
//                 "name": "Davao del Sur",
//                     "commodities": [
//                       "Banana Saba", "Calamansi", "Cacao", "Cassava", "Cashew", "Chili",
//                       "Coconut", "Coffee", "Durian", "Ginger", "Guava", "Guyabano",
//                       "Jackfruit", "Macapuno", "Mango", "Marang", "Moringa", "Mangosteen",
//                       "Peanut", "Pineapple", "Sweetpotato", "Taro", "Turmeric", "Ube"
//                     ],
//                     "entities": {
//                       "banana_saba_owners": [
//                         "Cale88 Foods Corporation",
//                         "Jef Banana Chips",
//                         "Eng Seng Food Products",
//                         "Frux Food Products",
//                         "KF Nutri Foods International, Inc.",
//                         "Safepac Corporation"
//                       ],
//                       "calamansi_owners": [
//                         "Safepac Corporation"
//                       ],
//                       "cacao_owners": [
//                         "AG Pacific Nutriceutical Corp.",
//                         "Auro - Filipinas Oro de Cacao, Inc. (FODCI)",
//                         "Cacao Culture Farms",
//                         "Cacao de Davao",
//                         "Chocoloco, Inc.",
//                         "Chokolate de San Isidro (CSI)",
//                         "Cocolibre Corporation",
//                         "Comval Tropical Harvest Trading Co., Inc.",
//                         "Coscao Chocolate",
//                         "CSI Trade Ventures",
//                         "Derya Tablia",
//                         "Ecoveritas Agricultural Technical Assistance Services",
//                         "Eng Seng Food Products",
//                         "EPL Cacao Products",
//                         "FARDECO Agricultural Multipurpose Cooperative",
//                         "Free Food Coconut Marketing",
//                         "Isabella Tree of Life Coconut by-products Wholeselling",
//                         "Kennemer Foods International",
//                         "Keto OPC",
//                         "Laak Multipurpose Cooperative",
//                         "LilaMaya, Inc.",
//                         "Lomerados Agri-Supplies Trading",
//                         "M&D Prize Foods Philippines, Inc.",
//                         "Malabog Integrated Enterprises Development Cooperative",
//                         "Malagos Agri-Ventures Corporation",
//                         "Mama Earth Cacao, Inc.",
//                         "Maragusan Growers Multipurpose Cooperative",
//                         "Maragusan Multipurpose Cooperative",
//                         "MS3 Agri-Ventures Corp.",
//                         "Nutrarich Nutraceuticals Innovations",
//                         "Rosario's Delicacies",
//                         "Saloy Organic Farmers Organization",
//                         "Sitio Quimasog Farmers Association (SQUIFA)"
//                       ],
//                       "cassava_owners": [
//                         "Frux Food Products",
//                         "KF Nutri Foods International, Inc."
//                       ],
//                       "cashew_owners": [
//                         "Eng Seng Food Products"
//                       ],
//                       "chili_owners": [
//                         "Ayana's Siling Kinamayo",
//                         "El Tigre Food Products",
//                         "Free Food Coconut Marketing"
//                       ],
//                       "coconut_owners": [
//                         "AG Pacific Nutriceutical Corp.",
//                         "AHYA Coco Organic Food Manufacturing Corp.",
//                         "Cocolibre Corporation",
//                         "Cocolife Multipurpose Cooperative",
//                         "Coscao Chocolate",
//                         "Free Food Coconut Marketing",
//                         "Healthy Sweets Mindanao, Corp.",
//                         "Hijo Resources Corporation",
//                         "Isabella Tree of Life Coconut by-products Wholeselling",
//                         "Lao Integrated Farms, Inc.",
//                         "Noelle Enterprises",
//                         "Raymundo's Homemade Products"
//                       ],
//                       "coffee_owners": [
//                         "Balutakay Coffee Farmers Agriculture Cooperative (BACOFA COOP)"
//                       ],
//                       "durian_owners": [
//                         "Apo ni Lola Durian Delicacies",
//                         "Eng Seng Food Products",
//                         "Noelle Enterprises",
//                         "RGDR Rhoda's Milky Durian",
//                         "Rosario's Delicacies"
//                       ],
//                       "ginger_owners": [
//                         "Frux Food Products"
//                       ],
//                       "guava_owners": [
//                         "Safepac Corporation"
//                       ],
//                       "guyabano_owners": [
//                         "JNC Herbal Products",
//                         "Noelle Enterprises",
//                         "Safepac Corporation"
//                       ],
//                       "jackfruit_owners": [
//                         "Rosario's Delicacies"
//                       ],
//                       "macapuno_owners": [
//                         "RGDR Rhoda's Milky Durian"
//                       ],
//                       "mango_owners": [
//                         "Safepac Corporation"
//                       ],
//                       "marang_owners": [
//                         "Apo ni Lola Durian Delicacies",
//                         "Rosario's Delicacies"
//                       ],
//                       "moringa_owners": [
//                         "Frux Food Products"
//                       ],
//                       "mangosteen_owners": [
//                         "Apo ni Lola Durian Delicacies",
//                         "JNC Herbal Products",
//                         "RGDR Rhoda's Milky Durian",
//                         "Safepac Corporation"
//                       ],
//                       "peanut_owners": [
//                         "Frux Food Products",
//                         "KGC Disposable and Plasticware Products Trading"
//                       ],
//                       "pineapple_owners": [
//                         "Noelle Enterprises"
//                       ],
//                       "sweetpotato_owners": [
//                         "Eng Seng Food Products"
//                       ],
//                       "taro_owners": [
//                         "Frux Food Products"
//                       ],
//                       "turmeric_owners": [
//                         "Frux Food Products",
//                         "JNC Herbal Products",
//                         "Lao Integrated Farms, Inc."
//                       ],
//                       "ube_owners": [
//                         "KF Nutri Foods International, Inc."
//                       ]
//                     }
                
//             },
//             "id": 3
//         },
//         {
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [
//                             125.83071547434157,
//                             7.354265605545954
//                         ],
//                         [
//                             125.67544095189405,
//                             7.996715962426966
//                         ],
//                         [
//                             126.18302697005294,
//                             7.994964475718016
//                         ],
//                         [
//                             126.2936145409048,
//                             7.298883012408007
//                         ],
//                         [
//                             125.95427491761029,
//                             7.047406406563554
//                         ],
//                         [
//                             125.83071547434157,
//                             7.354265605545954
//                         ]
//                     ]
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "source": "https://simplemaps.com",
//                 "id": "PHCOM",
//                 "name": "Davao de Oro",
//                 "commodities": ["Cacao", "Corn", "Guyabano", "Mangosteen", "Turmeric"],
//                 "entities": {
//                     "corn_owners": ["JNC Herbal Products"],
//                     "cacao_owners": ["Comval Tropical Harvest Trading Co., Inc.", "Laak Multipurpose Cooperative", "Maragusan Growers Multipurpose Cooperative","Maragusan Multipurpose Cooperative"],
//                     "guyabano_owners": ["JNC Herbal Products "],
//                     "mangosteen_owners": ["JNC Herbal Products"],
//                     "turmeric_owners": ["JNC Herbal Products"]
//                 }  
//             },
//             "id": 4
//         },
//         {
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [
//                             126.29118573729332,
//                             7.995842922911495
//                         ],
//                         [
//                             126.38347414934434,
//                             7.899562825422427
//                         ],
//                         [
//                             126.61231529512442,
//                             7.257879887551459
//                         ],
//                         [
//                             126.07911216955354,
//                             6.842515293649765
//                         ],
//                         [
//                             125.95427491761029,
//                             7.047406406563554
//                         ],
//                         [
//                             126.2936145409048,
//                             7.298883012408007
//                         ],
//                         [
//                             126.18302697005294,
//                             7.994964475718016
//                         ],
//                         [
//                             126.29118573729332,
//                             7.995842922911495
//                         ]
//                     ]
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "source": "https://simplemaps.com",
//                 "id": "PHDAO",
//                 "name": "Davao Oriental",
//                 "commodities" : ["Chili"],
//                 "entities": {
//                     "chili_owners": ["El Tigre Food Products", "Ayana's Siling Kinamayo"]
//                 } 
           
//             },
//             "id": 7
//         }
//     ]
// };


//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize map
//     const map = L.map(mapContainerRef.current).setView([7.8, 125.0], 7);
//     mapRef.current = map;

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);

//     // Style function
//     const styleFeature = (): L.PathOptions => ({
//       fillColor: '#FEB24C',
//       weight: 2,
//       opacity: 1,
//       color: 'white',
//       dashArray: '3',
//       fillOpacity: 0.7
//     });

//     // Highlight functions
//     const highlightFeature = (e: L.LeafletEvent) => {
//       const layer = e.target as L.Path;
//       layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//       });
//       layer.bringToFront();
//     };

//     const resetHighlight = (e: L.LeafletEvent) => {
//       if (e.target !== geoJsonRef.current?.getLayers()[0]) {
//         geoJsonRef.current?.resetStyle(e.target);
//       }
//     };

//  // Updated click handler with proper typing
//  const onFeatureClick = (e: L.LeafletEvent) => {
//     const layer = e.target as GeoJSONLayer & L.Polygon;
//     if (mapRef.current) {
//       mapRef.current.fitBounds(layer.getBounds());
//     }
//     setSelectedProvince(layer.feature.properties);
//   };

//     // Create GeoJSON layer
//     const geoJson = L.geoJSON(provinceData, {
//       style: styleFeature,
//       onEachFeature: (feature, layer) => {
//         layer.on({
//           mouseover: highlightFeature,
//           mouseout: resetHighlight,
//           click: onFeatureClick
//         });
//       }
//     }).addTo(map);

//     geoJsonRef.current = geoJson;

//     // Cleanup
//     return () => {
//       map.remove();
//     };
//   }, []);

//   const renderInfoContent = () => {
//     if (!selectedProvince) return 'Click on a province to see details.';

//     const { name, commodities, entities } = selectedProvince;
    
//     return (
//       <>
//         <h4 className="text-lg font-semibold mb-2">{name}</h4>
//         <div className="mb-4">
//           <h5 className="font-medium mb-1">Commodities:</h5>
//           {commodities.length > 0 ? (
//             <ul className="list-disc pl-4">
//               {commodities.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No commodities listed</p>
//           )}
//         </div>
//         {Object.entries(entities).map(([key, values]) => (
//           <div key={key} className="mb-4">
//             <h5 className="font-medium mb-1">
//               {key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())}:
//             </h5>
//             {values.length > 0 ? (
//               <ul className="list-disc pl-4">
//                 {values.map((entity, index) => (
//                   <li key={index}>{entity}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No entities listed</p>
//             )}
//           </div>
//         ))}
//       </>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div 
//         ref={mapContainerRef} 
//         className="w-full h-[60vh] mb-4 border border-gray-300 rounded-lg"
//       />
      
//       <div className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
//         <h4 className="text-lg font-semibold mb-4">Mindanao Province Information</h4>
//         <div className="text-gray-700">
//           {renderInfoContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MindanaoMap;