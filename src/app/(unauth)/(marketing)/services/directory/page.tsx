"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type * as GeoJSON from "geojson"
import { X } from "lucide-react"
import { provinceData } from "./geojson-data"
// Interfaces as defined by the user
export interface DirectoryInterface {
  provinceName: string
  commodities: string[]
  entities: {
    commodityName: string
    ownerName: CommoditiesOwnersInterface
  }[]
}

export interface CommoditiesOwnersInterface {
  ownerName: string
  information: OwnersInformationInterface
}

export interface OwnersInformationInterface {
  coordinate: CoordinatesInterface
  email?: string
  phoneNumber?: number
  website?: string
  facebook?: string
  instagram?: string
  shopee?: string
  lazada?: string
}

export interface CoordinatesInterface {
  longitude: number
  latitude: number
}

// Define custom layer type that includes feature property
interface GeoJSONLayer extends L.Layer {
  feature: GeoJSON.Feature<GeoJSON.Geometry, { name: string }>
}

const MindanaoMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null)
  const geoJsonRef = useRef<L.GeoJSON | null>(null)
  const [selectedProvince, setSelectedProvince] = useState<DirectoryInterface | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Sample directory data using the defined interfaces
  const provinceDirectories: Record<string, DirectoryInterface> = {
    "Davao del Norte": {
      provinceName: "Davao del Norte",
      commodities: ["Banana Saba", "Cacao", "Coconut"],
      entities: [
        {
          commodityName: "Banana Saba",
          ownerName: {
            ownerName: "Cale88 Foods Corporation",
            information: {
              coordinate: { longitude: 125.5, latitude: 7.5 },
              email: "cale88@example.com",
              phoneNumber: 9123456789,
              website: "https://cale88.example.com",
            },
          },
        },
        {
          commodityName: "Banana Saba",
          ownerName: {
            ownerName: "Jef Banana Chips",
            information: {
              coordinate: { longitude: 125.4, latitude: 7.4 },
              phoneNumber: 9234567890,
              facebook: "jefbananachips",
            },
          },
        },
        {
          commodityName: "Cacao",
          ownerName: {
            ownerName: "Chokolate de San Isidro (CSI)",
            information: {
              coordinate: { longitude: 125.6, latitude: 7.6 },
              email: "csi@example.com",
              website: "https://csi.example.com",
            },
          },
        },
        {
          commodityName: "Cacao",
          ownerName: {
            ownerName: "Chocoloco, Inc.",
            information: {
              coordinate: { longitude: 125.55, latitude: 7.55 },
              instagram: "chocoloco_inc",
            },
          },
        },
        {
          commodityName: "Coconut",
          ownerName: {
            ownerName: "Raymundo's Homemade Products",
            information: {
              coordinate: { longitude: 125.45, latitude: 7.45 },
              shopee: "raymundohomemade",
              lazada: "raymundohomemade",
            },
          },
        },
      ],
    },
    "Davao de Oro": {
      provinceName: "Davao de Oro",
      commodities: ["Cacao", "Corn", "Guyabano", "Mangosteen", "Turmeric"],
      entities: [
        {
          commodityName: "Banana Saba",
          ownerName: {
            ownerName: "Cale88 Foods Corporation",
            information: {
              coordinate: { longitude: 125.5, latitude: 7.5 },
              email: "cale88@example.com",
              phoneNumber: 9123456789,
              website: "https://cale88.example.com",
            },
          },
        },
        {
          commodityName: "Banana Saba",
          ownerName: {
            ownerName: "Jef Banana Chips",
            information: {
              coordinate: { longitude: 125.4, latitude: 7.4 },
              phoneNumber: 9234567890,
              facebook: "jefbananachips",
            },
          },
        },
        {
          commodityName: "Cacao",
          ownerName: {
            ownerName: "Chokolate de San Isidro (CSI)",
            information: {
              coordinate: { longitude: 125.6, latitude: 7.6 },
              email: "csi@example.com",
              website: "https://csi.example.com",
            },
          },
        },
        {
          commodityName: "Cacao",
          ownerName: {
            ownerName: "Chocoloco, Inc.",
            information: {
              coordinate: { longitude: 125.55, latitude: 7.55 },
              instagram: "chocoloco_inc",
            },
          },
        },
        {
          commodityName: "Coconut",
          ownerName: {
            ownerName: "Raymundo's Homemade Products",
            information: {
              coordinate: { longitude: 125.45, latitude: 7.45 },
              shopee: "raymundohomemade",
              lazada: "raymundohomemade",
            },
          },
        },
      ],
    },
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    setIsLoading(true)

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([7.8, 125.0], 7)
    mapRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)

    // Style function
    const styleFeature = (): L.PathOptions => ({
      fillColor: "#FEB24C",
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    })

    // Highlight functions
    const highlightFeature = (e: L.LeafletEvent) => {
      const layer = e.target as L.Path
      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      })
      layer.bringToFront()
    }

    const resetHighlight = (e: L.LeafletEvent) => {
      if (e.target !== geoJsonRef.current?.getLayers()[0]) {
        geoJsonRef.current?.resetStyle(e.target)
      }
    }

    // Updated click handler with proper typing
    const onFeatureClick = (e: L.LeafletEvent) => {
      const layer = e.target as GeoJSONLayer & L.Polygon
      if (mapRef.current) {
        mapRef.current.fitBounds(layer.getBounds())
      }

      const provinceName = layer.feature.properties.name
      const provinceDirectory = provinceDirectories[provinceName]

      if (provinceDirectory) {
        setSelectedProvince(provinceDirectory)
      } else {
        setSelectedProvince(null)
      }
    }

    // Create GeoJSON layer
    const geoJson = L.geoJSON(provinceData, {
      style: styleFeature,
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: onFeatureClick,
        })
      },
    }).addTo(map)

    geoJsonRef.current = geoJson
    setIsLoading(false)

    // Cleanup
    return () => {
      map.remove()
    }
  }, [])

  // Group entities by commodity for display
  const groupEntitiesByCommodity = (entities: DirectoryInterface["entities"]) => {
    const grouped: Record<string, string[]> = {}

    entities.forEach((entity) => {
      if (!grouped[entity.commodityName]) {
        grouped[entity.commodityName] = []
      }
      grouped[entity.commodityName].push(entity.ownerName.ownerName)
    })

    return grouped
  }

  const renderInfoContent = () => {
    if (!selectedProvince) return "Click on a province to see details."

    const { provinceName, commodities, entities } = selectedProvince
    const groupedEntities = groupEntitiesByCommodity(entities)

    return (
      <>
        <h4 className="text-xl font-semibold mb-3">{provinceName}</h4>
        <div className="mb-4">
          <h5 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Commodities</h5>
          {commodities.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {commodities.map((item, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No commodities listed</p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3">
          <h5 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Businesses</h5>
          {Object.entries(groupedEntities).map(([commodity, owners]) => (
            <div key={commodity} className="mb-4">
              <h6 className="font-medium text-gray-700 mb-2">{commodity}</h6>
              {owners.length > 0 ? (
                <ul className="space-y-2">
                  {owners.map((owner, index) => (
                    <li key={index} className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                      {owner}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No businesses listed</p>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }

  // Render owner details when clicked (could be expanded in future)
  const renderOwnerDetails = (owner: CommoditiesOwnersInterface) => {
    const { ownerName, information } = owner
    return (
      <div className="mt-2 p-3 bg-gray-50 rounded">
        <h6 className="font-semibold">{ownerName}</h6>
        {information.email && <p>Email: {information.email}</p>}
        {information.phoneNumber && <p>Phone: {information.phoneNumber}</p>}
        {information.website && <p>Website: {information.website}</p>}
        {information.facebook && <p>Facebook: {information.facebook}</p>}
        {information.instagram && <p>Instagram: {information.instagram}</p>}
        {information.shopee && <p>Shopee: {information.shopee}</p>}
        {information.lazada && <p>Lazada: {information.lazada}</p>}
        <p>
          Location: {information.coordinate.latitude}, {information.coordinate.longitude}
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[90vh] flex flex-col md:flex-row">
      <div className="absolute top-4 left-4 right-4 md:left-[370px] md:right-auto z-10 flex">
        <div className="bg-white rounded-md shadow-md w-full md:w-[400px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search provinces or commodities..."
              className="w-full p-3 pl-10 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Information Panel (Left Side on Desktop) */}
      {selectedProvince && (
        <div className="w-full md:w-[350px] md:max-w-[400px] bg-white shadow-lg z-10 overflow-y-auto h-[300px] md:h-full">
          <div className="p-4">
            <button
              onClick={() => setSelectedProvince(null)}
              className="mb-2 text-gray-500 hover:text-gray-700 absolute top-2 right-2"
            >
              <X size={18} />
            </button>
            <div className="text-gray-700">{renderInfoContent()}</div>
          </div>
        </div>
      )}

      {/* Map Container (Right Side or Full Width if no province selected) */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 z-20 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-700">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapContainerRef} className="flex-1 h-full" />
    </div>
  )
}

export default MindanaoMap
