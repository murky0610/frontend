/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Publication data
const publications = [
  {
    title:
      "Productivity and technical efficiency of Robusta coffee farms at varying elevation categories in Sultan Kudarat, Philippines: implications on sustainability",
    type: "Paper",
    technology: "Technology",
    crop: "Coffee",
    authors: "Saguimpa, M.J.S., Digal, L.N.",
    abstract:
      "Elevation can affect agricultural outputs, affecting farms' productivity and efficiency. This article identified the significant production inputs influencing productivity and factors influencing technical efficiency (TE) and determined the average TE scores of Robusta coffee farms at varying elevations in Sultan Kudarat, Philippines. Cross-sectional data from the Mahintana Foundation, Inc. using random stratified sampling and power analysis from September 9, 2021, to January 13, 2022, were used to analyze 604 farms from areas ranging from 0.33 to 1284.18 above mean sea level (amsl), classified as low, medium, and high elevation. Open-Data-Kit-based (ODK) mobile data collection systems were utilized to precisely determine the farms' coordinates and elevation. Using stochastic frontier analysis, results showed that increasing the total fertilizer amount and total trees by 1% significantly increased yield by 0.20% and 0.79%, respectively. Meanwhile, increasing the total land area by 1%, including areas unutilized for coffee farming, decreases total yield by 0.11%. Regarding TE, results showed that TE decreases by approximately 0.58% at high elevations. Meanwhile, increasing net income from coffee farming alone by 1% significantly increases TE by 0.00008%. With an average TE of 0.60, 0.77, and 0.63 in low, medium, and high elevations, farms may be incentivized to improve farming practices to increase their TE further. TE improvement recommendations include promoting coffee-agroforestry systems and ecolabelling at medium elevations, such as shade-grown coffee, to promote sustainable production in Robusta coffee farms by assigning a premium to consumers demanding environmental conservation.",
    link: "https://link.springer.com/article/10.1007/s11629-024-8746-1",
  },
  {
    title:
      "Exploring Product Diversification: The Case of Contract and Non-contract Farmers in the Philippine Cavendish Banana Value Chain (International Journal on Food System Dynamics)",
    type: "Paper",
    technology: "Value Adding",
    crop: "Cavendish Banana",
    authors: "Limpoco, Marie Analiz April A. & Digal, Larry N., 2023.",
    abstract:
      "Uncertainties arising from market fluctuations limit choices of banana famers under contracts. However, they can opt not to renew their contracts with multi-national firms to sell to spot market or diversify. This paper examines optimal portfolio of Cavendish banana products of contract and non-contract farmers under uncertainty. We explore the effect of diversification by including banana flour from rejects aside from fresh banana. Constrained M-estimation of parameters and robust portfolio optimization results show that (1) non-contract farms benefit more from diversifying compared to contract farms; and (2) prices are higher for non-contract farms but profits are lower compared to contract farms.",
    link: "https://brill.com/view/journals/fsd/14/4/article-p419_5.xml",
  },
  {
    title:
      "Comparative analysis of women-led and agrarian reform beneficiaries cooperatives in Davao City: Cocoa value chain using a gender lens in the face of vulnerability (Consultative Group on International Agricultural Research)",
    type: "Paper",
    technology: "Value Adding",
    crop: "Cacao",
    authors:
      "Lopez, Mitchiko Ariola; Lapitan, Aileen V.; Aranas, Mia Barbara D.; Faylon, Rassel P.; Anastacio, Nico Jayson C.; Predo, Canesio D.; Flores, Emmanuel. 2023.",
    abstract:
      "This paper presents a comparative study using a gender lens in examining how two groups engaged in the cocoa value chain in Davao City, Philippines, addressed challenges and leveraged innovative strategies amidst a backdrop of vulnerability. The first group is a womenled cooperative, while the other group is a cooperative of Agrarian Reform Beneficiaries (ARB) operating for 35 and 30 years, respectively, within conflict and nonconflict areas. A rapid value-chain assessment was conducted through a series of focus group discussions and key informant interviews with members/officers of the cooperatives. The assessment was also supported by the available secondary data. Results highlight the unique roles and contributions of women in Davao City's cocoa value chain. A women-led cooperative has a one-of-a-kind innovation of buying and consolidating cocoa pods from tagged trees rather than wet or dried beans to ascertain 'tree-to-bar' quality standards. It is a way of navigating various challenges in cocoa production—accessibility of needed services, lack of postharvest facilities, and marketing difficulties within a community in transition from conflict. The ARB cooperative with its access to diverse services, and capital (financial, equipment, facilities) has diversified from dried fermented cocoa beans to a wide array of value-added products involving mostly women workers. Innovation thrives when women workers and/or leaders have agency and power. Innovations are eased by persistent gender sensitivity and mainstreaming efforts. Recommendations leading to desired transformative change in agri-food systems in this part of the world are also discussed in the paper.",
    link: "https://cgspace.cgiar.org/server/api/core/bitstreams/ba176ba6-7ebb-476f-86d8-21607c00c07e/content",
  },
  {
    title:
      "Smallholder Inclusion Through Cooperative Contract Farming of Cavendish Banana Farmers in Davao del Norte, Philippines: A Meta-Frontier Analysis (Agribusiness)",
    type: "Paper",
    technology: "Clustering",
    crop: "Cavendish Banana",
    authors: "Sarmiento, J. M., Rola-Rubzen, M.F., Fogarty, J. Digal, L.",
    abstract:
      "As the third‐highest global supplier of Cavendish bananas, the Philippine banana industry has a vital role in rural development. We compared farmers' technical efficiency (TE) and production performance across different contract farming arrangements: individual contracts, cooperative contracts, and growers without a contract. Using a random sample of 186 farmers in Davao del Norte, Philippines, we used meta‐frontier Data Envelopment Analysis to calculate TE scores and then use a truncated regression with bootstrapping to model the efficiency sources. We applied propensity score matching to minimize observable bias resulting from self‐selection among farmers participating in contract farming. The results across returns‐to‐scale assumptions and matching methods reveal that cooperative contract farmers have significantly higher TE and revenue performance than individual and noncontract farmers, primarily due to high export‐quality production and associated premium prices. Individual contract farmers were also more technically efficient and had higher returns than noncontract farmers. Smallholder farmers tend to participate more in cooperative contract farming. Thus, cooperative contracts should include smallholder farmers in export value chains to improve smallholder farmer income. This strategy will lead to the formation of inclusive agrifood value chains in Mindanao, Philippines.",
    link: "https://www.researchgate.net/publication/350612935_Factors_Affecting_Participation_in_Contract_Farming_of_Smallholder_Cavendish_Banana_Farmers_in_the_Philippines",
  },
  {
    title:
      "Choice of agri-credit source among Cavendish banana farmers: evidence from Southern Philippines (Southeastern Philippines Journal of Research and Development)",
    type: "Paper",
    technology: "Value Adding",
    crop: "Cavendish Banana",
    authors: "Loquias, M., Placencia, S. G., & Digal, L.",
    abstract:
      "The Cavendish banana industry presents various opportunities for the Philippine agricultural sector; however, the threats of high development, production, and maintenance costs and the persisting Fusarium Wilt issue impede farmers from harnessing these opportunities. With the high production cost, agricultural credit becomes the fastest solution to sustain production. This study examines the factors affecting the choice of agri-credit source of smallholder Cavendish banana farmers in the Philippines. Using a multinomial regression model, survey data from 187 Cavendish banana farmers in Davao del Norte, Philippines, were analyzed to determine the factors influencing the choice of credit source. The credit sources were classified as categorical variables with 'no credit' as the base outcome. Results showed that factors such as education, contract arrangement, and level of barangay infrastructure significantly affected the choice of credit source of the farmers. Key findings also show that farmers who loaned from formal sources had higher output and farm incomes than those who had no credit and those who loaned from informal credit. The results can potentially aid the government in crafting policies and interventions relating to improved access to formal credit. Very few studies have explored the credit choice of farmers in the context of an important export commodity such as the Cavendish banana industry. As such, this study can add to the body of knowledge on agricultural finance, especially in the context of an export industry.",
    link: "https://journal.usep.edu.ph/index.php/Southeastern_Philippines_Journal/article/view/455/143",
  },
]

export default function PublicationsPage() {
  return (
    <div className="container mx-auto py-10">
         <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Published Papers</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
          Explore the papers we've published and the impact we're making across fields.
          </p>
        </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {publications.map((publication, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">{publication.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{publication.type}</Badge>
                <Badge variant="secondary">{publication.technology}</Badge>
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                  {publication.crop}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground mb-4">{publication.authors}</p>
              <p className="text-sm text-muted-foreground">{publication.abstract}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={publication.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  View Full Paper <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
