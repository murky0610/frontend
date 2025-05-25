// import { promises as fs } from 'fs';

// export default async function Page() {
//   const file = await fs.readFile(process.cwd() + '/app/data/philippineRegions.json', 'utf8');
//   const data = JSON.parse(file);
//   // Extract the names of all regions

//   const regionNames = data.features.map((feature: string) => feature.properties.name);
//   return (
//     <div>
//       <h1>Philippine Regions</h1>
//       <ul>
//         {regionNames.map((name, index) => (
//           <li key={index}>{name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
