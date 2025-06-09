/* eslint-disable @typescript-eslint/no-explicit-any */
// /components/client/ComplementProjects.js
'use client';

import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from 'react-leaflet';
import L, { LatLngExpression, LatLngTuple, Layer, Map as LeafletMap } from 'leaflet';
import { displayDirectories } from '@/api/api'; // Assuming these are your API functions
import { ProvinceCommodityMap, OwnerInfo, CommodityMap } from '@/interface/directory.inteface'; // Assuming these are your interfaces
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useState, useEffect, useMemo, useCallback } from 'react';
import type * as GeoJSONTypes from 'geojson';

import { provinceData as davaoRegionGeoJSON } from '@/app/(unauth)/(marketing)/services/directory/geojson-data';

// Shadcn/ui components
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
// UI/UX MOD: Added Loader2, MapPin, Search icons. Removed EqualApproximatelyIcon as it's unused.
import { Globe, Mail, Phone, Search, MapPin, Loader2, Facebook, Instagram } from 'lucide-react';

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

interface OwnerWithContext extends OwnerInfo {
  commodity: string;
  province: string;
}

const defaults = {
  zoom: 8,
};

// --- Helper function for commodity colors (from previous step) ---
const predefinedCommodityColors: { [key: string]: string } = {
  Cacao: '#795548',
  Coffee: '#A1887F',
  Coconut: '#4CAF50',
  'Banana - Saba': '#FFEB3B',
  Mango: '#FF9800',
  Durian: '#8BC34A',
  Calamansi: '#1D7A3C',
  Cashew: '#C4722D',
  Cassava: '#9C27B0',
  Chili: '#D32F2F',
  Corn: '#FFC400',
  Ginger: '#795548',
  Guava: '#43A047',
  Guyabano: '#7CB342',
  Jackfruit: '#F57C00',
  Macapuno: '#AFB42B',
  Mangosteen: '#8E24AA',
  Marang: '#5D4037',
  Moringa: '#689F38',
  Peanut: '#6D4C41',
  Pineapple: '#FBC02D',
  Sweetpotato: '#FF6F00',
  Taro: '#4CAF50',
  Turmeric: '#FFA000',
  Ube: '#7B1FA2',
};
const generateCommodityColor = (commodityName: string): string => {
  let hash = 0;
  for (let i = 0; i < commodityName.length; i++) {
    hash = commodityName.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '000000'.substring(0, 6 - color.length) + color;
};
const getCommodityMarkerColor = (commodityName: string): string => {
  return predefinedCommodityColors[commodityName] || generateCommodityColor(commodityName);
};

const ICON_BASE_PATH = '/commodities';
const commodityIconMap: Record<string, string> = {
  'Banana - Saba': 'banana-saba.png',
  Cacao: 'cacao.png',
  Calamansi: 'calamansi.png',
  Cashew: 'cashew.png',
  Cassava: 'cassava.png',
  Chili: 'chili.png',
  Coconut: 'coconut.png',
  Coffee: 'coffee.png',
  Corn: 'corn.png',
  Durian: 'durian.png',
  Ginger: 'ginger.png',
  Guava: 'guava.png',
  Guyabano: 'guyabano.png',
  Jackfruit: 'jackfruit.png',
  Macapuno: 'macapuno.png',
  Mango: 'mango.png',
  Mangosteen: 'mangosteen.png',
  Marang: 'marang.png',
  Moringa: 'moringa.png',
  Peanut: 'peanut.png',
  Pineapple: 'pineapple.png',
  Sweetpotato: 'sweet-potato.png',
  Taro: 'taro.png',
  Turmeric: 'turmeric.png',
  Ube: 'ube.png',
};
const getCommodityIconSrc = (commodity: string): string => {
  const filename = commodityIconMap[commodity];
  return filename ? `${ICON_BASE_PATH}/${filename}` : '';
};
// --- End of Helper function ---

const ComplementaryProjects = (propsMap: MapProps) => {
  const { zoom = defaults.zoom, posix } = propsMap;
  const [fetchedDirectoryData, setFetchedDirectoryData] = useState<ProvinceCommodityMap | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvinceOnMap, setSelectedProvinceOnMap] = useState<string | null>(null); // This state's role has diminished; primarily for GeoJSON key & clearing owner.
  const [selectedOwner, setSelectedOwner] = useState<OwnerWithContext | null>(null);
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  // const [commodityProvince, setSelectedCommodityProvince] = useState<string| null>(null); // Unused in current logic
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilterCommodities, setSelectedFilterCommodities] = useState<Set<string>>(
    new Set(),
  );
  const [selectedFilterProvinces, setSelectedFilterProvinces] = useState<Set<string>>(new Set());

  const allAvailableProvinces = useMemo(() => {
    if (!davaoRegionGeoJSON || !davaoRegionGeoJSON.features) return [];
    return davaoRegionGeoJSON.features.map((feature) => feature?.properties?.name).sort();
  }, []);

  const allAvailableCommodities = useMemo(() => {
    if (!fetchedDirectoryData) return [];
    const commodities = new Set<string>();
    Object.values(fetchedDirectoryData).forEach((provinceCommodities) => {
      Object.keys(provinceCommodities).forEach((commodity) => commodities.add(commodity));
    });
    return Array.from(commodities).sort();
  }, [fetchedDirectoryData]);

  useEffect(() => {
    const loadDirectories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await displayDirectories();
        setFetchedDirectoryData(response);
      } catch (err) {
        console.error('Error fetching directory data:', err);
        setError('Failed to load directory data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadDirectories();
  }, []);

  useEffect(() => {
    setSelectedOwner(null);
  }, [selectedProvinceOnMap]); // Clears owner details if the *map-specific* selected province changes (though this state is less central now)
  // Also consider clearing selectedOwner if selectedFilterProvinces changes drastically. For now, this is minor.

  const geoJSONStyle = useCallback(
    (feature?: GeoJSONTypes.Feature): L.PathOptions => {
      const defaultStyle: L.PathOptions = {
        fillColor: 'grey',
        weight: 1,
        opacity: 0.7,
        color: 'grey',
        dashArray: '4',
        fillOpacity: 0.2,
      };
      const highlightStyle: L.PathOptions = {
        // Used when province is in selectedFilterProvinces
        fillColor: '#FDE047',
        weight: 2,
        opacity: 1,
        color: '#F59E0B',
        dashArray: '',
        fillOpacity: 0.3, // Yellow-ish highlight
      };
      const hoverStyle: L.PathOptions = {
        // Optional: for mouseover, if not using just tooltip
        fillColor: '#FDE047',
        weight: 2,
        opacity: 1,
        color: '#D97706',
        fillOpacity: 0.4,
      };

      if (feature?.properties?.name && selectedFilterProvinces.has(feature.properties.name)) {
        return highlightStyle;
      }
      return defaultStyle;
    },
    [selectedFilterProvinces],
  );

  const onEachFeature = useCallback((feature: GeoJSONTypes.Feature, layer: Layer) => {
    if (feature.properties && feature.properties.name) {
      const provinceName = feature.properties.name;
      // UI/UX MOD: Bind tooltip to show province name on hover
      layer.bindTooltip(provinceName, {
        sticky: false, // True makes it follow mouse, false pins it to feature center
        direction: 'top',
        offset: [0, -5], // Adjust as needed
        className: 'leaflet-tooltip-custom', // Optional: for custom styling
      });

      layer.on({
        click: () => {
          setSelectedFilterProvinces((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(provinceName)) {
              newSet.delete(provinceName);
            } else {
              newSet.add(provinceName);
            }
            return newSet;
          });
          // setSelectedProvinceOnMap(provinceName); // This was removed, selection for details driven by selectedFilterProvinces
        },
        // Optional: Add mouseover/mouseout for style changes if desired beyond tooltip
        // mouseover: (e) => { L.GeoJSON.prototype.setStyle.call(layer, geoJSONStyle(feature, true)); }, // Example: needs adjustment
        // mouseout: (e) => { L.GeoJSON.prototype.setStyle.call(layer, geoJSONStyle(feature, false)); }
      });
    }
  }, []); // geoJSONStyle can be added if used for hover effects directly here

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCommodityFilterChange = (commodity: string, checked: boolean) => {
    setSelectedFilterCommodities((prev) => {
      const newSet = new Set(prev);
      if (checked) newSet.add(commodity);
      else newSet.delete(commodity);
      return newSet;
    });
  };

  const handleProvinceFilterChange = (province: string, checked: boolean) => {
    setSelectedFilterProvinces((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(province);
      } else {
        newSet.delete(province);
      }
      return newSet;
    });
  };

  const directoryMarkers = useMemo(() => {
    if (!fetchedDirectoryData) return [];
    const markers: JSX.Element[] = [];
    let markerKey = 0;

    // Iterate based on selectedFilterProvinces if any, otherwise all available provinces if no specific filter applied.
    // However, for markers, we strictly show based on selectedFilterProvinces. If empty, no province-filtered markers.
    // If you want to show ALL markers when selectedFilterProvinces is empty, this logic needs adjustment.
    // Current logic: Markers only show for provinces explicitly in selectedFilterProvinces.
    // If selectedFilterProvinces is empty, no markers are shown.
    // To show all markers if selectedFilterProvinces is empty:
    // const provincesToIterate = selectedFilterProvinces.size > 0 ? Array.from(selectedFilterProvinces) : allAvailableProvinces;
    // For now, sticking to current behavior: iterate only selectedFilterProvinces. If it's empty, no markers from this loop.

    const provincesToIterate = Array.from(selectedFilterProvinces);

    provincesToIterate.forEach((provinceName) => {
      if (!Object.prototype.hasOwnProperty.call(fetchedDirectoryData, provinceName)) return;

      const commodityMap: CommodityMap = fetchedDirectoryData[provinceName];
      for (const commodityName in commodityMap) {
        if (selectedFilterCommodities.size > 0 && !selectedFilterCommodities.has(commodityName)) {
          continue;
        }

        if (Object.prototype.hasOwnProperty.call(commodityMap, commodityName)) {
          const owners: OwnerInfo[] = commodityMap[commodityName];
          const markerColor = getCommodityMarkerColor(commodityName);

          owners.forEach((owner) => {
            if (searchTerm && !owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return;
            }

            if (
              owner.latitude != null &&
              owner.longitude != null &&
              !isNaN(Number(owner.latitude)) &&
              !isNaN(Number(owner.longitude))
            ) {
              const ownerWithContext: OwnerWithContext = {
                ...owner,
                commodity: commodityName,
                province: provinceName,
              };

              const customMarkerIcon = new L.DivIcon({
                html: `<svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
                                         <path d="M13 0C6.373 0 1 5.703 1 13.2C1 22.000 13 38 13 38S25 22.000 25 13.2C25 5.703 19.627 0 13 0Z" fill="${markerColor}" stroke="#FFFFFF" stroke-width="1.5"/>
                                         <circle cx="13" cy="13" r="5" fill="white" fill-opacity="0.5"/>
                                       </svg>`,
                className: 'custom-div-icon', // Add a class for potential global styling
                iconSize: [26, 38],
                iconAnchor: [13, 38],
                popupAnchor: [0, -40],
              });

              markers.push(
                <Marker
                  key={`owner-marker-${provinceName}-${commodityName}-${owner.owner_name}-${markerKey++}`}
                  position={[owner.latitude, owner.longitude]}
                  icon={customMarkerIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedOwner(ownerWithContext);
                      if (mapInstance && owner.latitude && owner.longitude) {
                        mapInstance.flyTo(
                          [owner.latitude, owner.longitude],
                          Math.max(mapInstance.getZoom() || 13, 14),
                        ); // Slightly higher zoom on click
                      }
                    },
                  }}
                >
                  {/* <Tooltip direction="top" offset={[0, -38]} opacity={1}>
                                        {owner.owner_name}<br/>
                                        <span style={{color: markerColor, fontWeight:'bold'}}>{commodityName}</span>
                                    </Tooltip> */}
                  {/* UI/UX MOD: Enhanced Popup Content */}
                  <Popup>
                    <div className="space-y-1 p-1">
                      <h3 className="font-semibold text-md">{owner.owner_name}</h3>
                      <div className="flex items-center space-x-1.5">
                        <Image
                          src={getCommodityIconSrc(commodityName)}
                          alt={commodityName}
                          width={16}
                          height={16}
                        />
                        <span style={{ color: markerColor, fontWeight: 'bold' }}>
                          {commodityName}
                        </span>
                      </div>

                      {/* Optional: Add a button to show full details in sidebar if not already shown */}
                      {/* <button onClick={() => setSelectedOwner(ownerWithContext)} className="text-xs text-blue-500 hover:underline">View Details</button> */}
                    </div>
                  </Popup>
                </Marker>,
              );
            }
          });
        }
      }
    });
    return markers;
  }, [
    fetchedDirectoryData,
    selectedFilterProvinces,
    selectedFilterCommodities,
    searchTerm,
    mapInstance,
  ]);

  const handleOwnerSelectFromSidebar = (owner: OwnerWithContext) => {
    setSelectedOwner(owner);
    if (mapInstance && owner.latitude != null && owner.longitude != null) {
      mapInstance.flyTo(
        [owner.latitude, owner.longitude],
        Math.max(mapInstance.getZoom() || 15, 15),
      );
    }
  };

  const renderSidebarContent = () => {
    // UI/UX MOD: Use the first province from the `selectedFilterProvinces` Set to drive the "province details" view
    const [firstSelectedProvinceFromFilter] = selectedFilterProvinces;

    if (selectedOwner) {
      return (
        <Card className="mb-4 shadow-md">
          <CardHeader className="pb-3 pt-4">
            <CardTitle>
              <button
                onClick={() => setSelectedOwner(null)}
                className="mb-2 text-sm text-blue-600 hover:underline font-normal flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to {selectedOwner.province || 'results'}
              </button>
            </CardTitle>
          </CardHeader>
          {/* UI/UX MOD: Improved layout for owner details */}
          <CardContent className="space-y-3 text-sm">
            <h4 className="text-lg font-semibold text-gray-800">{selectedOwner.owner_name}</h4>

            <div className="flex items-start space-x-2 pt-1">
              <Image
                src={getCommodityIconSrc(selectedOwner.commodity)}
                alt={selectedOwner.commodity}
                width={20}
                height={20}
                className="mt-0.5"
              />
              <div>
                <span className="font-medium text-gray-500 block">Commodity</span>
                <span className="text-gray-700">{selectedOwner.commodity}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <span className="font-medium text-gray-500 block">Province</span>
                <span className="text-gray-700">{selectedOwner.province}</span>
              </div>
            </div>

            {(selectedOwner.email || (selectedOwner as any).emai) && (
              <div className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-500 block">Email</span>
                  <a
                    href={`mailto:${selectedOwner.email || (selectedOwner as any).emai}`}
                    className="text-blue-600 hover:underline break-all"
                  >
                    {selectedOwner.email || (selectedOwner as any).emai}
                  </a>
                </div>
              </div>
            )}
            {selectedOwner.number && (
                  <div className="flex items-start space-x-2">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-gray-500 block">Phone</span>
                     {selectedOwner.number
                      .split(/;/) // Split by semicolon
                      .map((num, index) => (
                        <div key={index}>
                          <a href={`tel:${num.trim()}`} className="text-blue-600 hover:underline">
                            {num.trim()}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            {selectedOwner.website && (
              <div className="flex items-start space-x-2">
                <Globe className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-500 block">Website</span>
                  <a
                    href={
                      !String(selectedOwner.website).startsWith('http')
                        ? `http://${selectedOwner.website}`
                        : String(selectedOwner.website)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {selectedOwner.website}
                  </a>
                </div>
              </div>
            )}
 {selectedOwner.facebook && (
              <div className="flex items-start space-x-2">
                <Facebook className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-500 block">Facebook Page</span>
                  <a
                    href={
                      !String(selectedOwner.facebook).startsWith('http')
                        ? `http://${selectedOwner.facebook}`
                        : String(selectedOwner.facebook)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {selectedOwner.facebook}
                  </a>
                </div>
              </div>
            )}
             {selectedOwner.instagram && (
              <div className="flex items-start space-x-2">
                <Instagram className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-gray-500 block">Instagram Page</span>
                  <a
                    href={
                      !String(selectedOwner.instagram).startsWith('http')
                        ? `http://${selectedOwner.instagram}`
                        : String(selectedOwner.instagram)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {selectedOwner.instagram}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    // UI/UX MOD: Logic for showing details of the first province in selectedFilterProvinces
    if (firstSelectedProvinceFromFilter && fetchedDirectoryData && !selectedOwner) {
      const provinceCommodities = fetchedDirectoryData[firstSelectedProvinceFromFilter];
      if (!provinceCommodities || Object.keys(provinceCommodities).length === 0) {
        return (
          <Card className="mb-4 shadow-md">
            <CardHeader>
              <CardTitle>{firstSelectedProvinceFromFilter}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No commodities listed for {firstSelectedProvinceFromFilter}.</p>
            </CardContent>
          </Card>
        );
      }
      let hasVisibleOwners = false;

      const listContent = Object.entries(provinceCommodities)
        .filter(
          ([commodityName, _]) =>
            selectedFilterCommodities.size === 0 || selectedFilterCommodities.has(commodityName),
        )
        .map(([commodityName, owners]) => {
          const filteredOwners = owners.filter(
            (owner) =>
              searchTerm === '' ||
              owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          if (filteredOwners.length === 0) return null;
          hasVisibleOwners = true;
          return (
            <div key={commodityName} className="mb-3">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span
                  style={{
                    height: '10px',
                    width: '10px',
                    backgroundColor: getCommodityMarkerColor(commodityName),
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                    border: '1px solid #ccc',
                  }}
                ></span>
                <h5 className="text-sm font-semibold text-gray-700">{commodityName}</h5>
              </div>
              <ul className="list-inside pl-1 space-y-1">
                {' '}
                {/* UI/UX MOD: Removed list-disc, using custom layout */}
                {filteredOwners.map((owner, index) => {
                  const ownerWithContext: OwnerWithContext = {
                    ...owner,
                    commodity: commodityName,
                    // UI/UX MOD: Use firstSelectedProvinceFromFilter consistently
                    province: firstSelectedProvinceFromFilter,
                  };
                  return (
                    <li
                      key={`${commodityName}-${owner.owner_name}-${index}`}
                      className="text-xs text-blue-700 hover:text-blue-800 hover:underline cursor-pointer ml-5"
                      onClick={() => handleOwnerSelectFromSidebar(ownerWithContext)}
                    >
                      {owner.owner_name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
        .filter(Boolean);

      return (
        <Card className="mb-4 shadow-md">
          <CardHeader className="pb-3 pt-4">
            {/* UI/UX MOD: Title is the province from filter */}
            <CardTitle className="text-xl">{firstSelectedProvinceFromFilter}</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-md font-semibold mb-2 text-gray-600">COMMODITIES</h4>
            {hasVisibleOwners ? (
              <ScrollArea className="h-[200px] pr-2">{listContent}</ScrollArea>
            ) : (
              <p className="text-xs text-gray-500">
                No businesses match current filters for this commodity in{' '}
                {firstSelectedProvinceFromFilter}.
              </p>
            )}
            {/* UI/UX MOD: Button clears this specific province from filters */}
            <button
              onClick={() => handleProvinceFilterChange(firstSelectedProvinceFromFilter, false)}
              className="mt-4 text-sm text-red-600 hover:underline flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              Clear {firstSelectedProvinceFromFilter} filter
            </button>
          </CardContent>
        </Card>
      );
    }

    if (!selectedOwner && !firstSelectedProvinceFromFilter) {
      // No specific owner, no specific province from filter selected to show details
      let itemsFoundOnMap = false;
      if (fetchedDirectoryData) {
        const provincesToScan =
          selectedFilterProvinces.size > 0
            ? Array.from(selectedFilterProvinces)
            : allAvailableProvinces;
        for (const provName of provincesToScan) {
          const provinceData = fetchedDirectoryData[provName];
          if (!provinceData) continue;
          for (const commName in provinceData) {
            if (selectedFilterCommodities.size > 0 && !selectedFilterCommodities.has(commName))
              continue;
            const matchingOwners = provinceData[commName].filter(
              (owner) =>
                searchTerm === '' ||
                owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            if (matchingOwners.length > 0) {
              itemsFoundOnMap = true;
              break;
            }
          }
          if (itemsFoundOnMap) break;
        }
      }

      if (searchTerm || selectedFilterCommodities.size > 0 || selectedFilterProvinces.size > 0) {
        return (
          <Card className="shadow-md">
            <CardHeader className="pb-3 pt-4">
              <CardTitle>Filtered Results</CardTitle>
            </CardHeader>
            <CardContent>
              {itemsFoundOnMap ? (
                <p className="text-sm text-gray-700">
                  Businesses matching your filters are shown on the map.
                </p>
              ) : (
                <p className="text-sm text-gray-700">
                  No businesses match your current filter criteria. Try adjusting your filters or
                  search term.
                </p>
              )}
              <p className="text-xs mt-2 text-gray-500">
                Select a province on the map for more details or click a marker.
              </p>
            </CardContent>
          </Card>
        );
      }
    }

    return (
      <Card className="shadow-md">
        <CardHeader className="pb-3 pt-4">
          <CardTitle>Welcome!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Select a province on the map or use the filters to find businesses and agricultural
            projects.
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      className="relative"
      style={{
        width: '100%',
        height: 'calc(100vh - 70px)' /* Adjust based on your navbar height */,
      }}
    >
      {/* Left Sidebar (Search and Details) */}
      <div className="absolute top-4 left-4 z-[1000] w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-1 mt-20">
        <ScrollArea className="h-full" viewportClassName="p-3">
          <div className="space-y-4">
            {/* Search Input Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2 pt-3">
                <Label htmlFor="search-directory" className="font-semibold text-sm text-gray-700">
                  Search by Name
                </Label>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <Input
                    id="search-directory"
                    type="text"
                    placeholder="Enter owner name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10" // Padded left for icon
                  />
                </div>
              </CardContent>
            </Card>

            {/* Display Area for selected item or province details */}
            <div className="mt-4">{renderSidebarContent()}</div>
          </div>
        </ScrollArea>
      </div>

      {/* UI/UX MOD: Right Sidebar (Filters) */}
      <div className="absolute top-4 right-4 z-[1000] w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-1">
        <ScrollArea className="h-full" viewportClassName="p-3">
          <div className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2 pt-3">
                <Label className="font-semibold text-sm text-gray-700">Filters</Label>
              </CardHeader>
              <CardContent className="pb-1 pt-2">
                {' '}
                {/* Adjusted padding for accordion container */}
                <Accordion
                  type="multiple"
                  defaultValue={['filter-provinces', 'filter-commodities']}
                  className="w-full"
                >
                  {/* UI/UX Idea: Add a "Clear All Filters" button here if desired */}
                  <AccordionItem value="filter-provinces">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3 text-gray-700">
                      Filter by Province
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      {/* UI/UX Idea: Add "Clear Province Filters" button */}
                      <ScrollArea className="h-[160px] pr-3">
                        <div className="space-y-2 pl-1">
                          {allAvailableProvinces.length > 0 ? (
                            allAvailableProvinces.map((province) => (
                              <div key={province} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`prov-${province}`}
                                  checked={selectedFilterProvinces.has(province)}
                                  onCheckedChange={(checked) =>
                                    handleProvinceFilterChange(province, !!checked)
                                  }
                                />
                                <Label
                                  htmlFor={`prov-${province}`}
                                  className="text-xs font-normal cursor-pointer text-gray-600 hover:text-gray-800"
                                >
                                  {province}
                                </Label>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-500">No provinces loaded.</p>
                          )}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="filter-commodities">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3 text-gray-700">
                      Filter by Commodity
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      {/* UI/UX Idea: Add "Clear Commodity Filters" button */}
                      <ScrollArea className="h-[200px] pr-3">
                        <div className="space-y-2 pl-1">
                          {allAvailableCommodities.length > 0 ? (
                            allAvailableCommodities.map((commodity) => (
                              <div key={commodity} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`comm-${commodity}`}
                                  checked={selectedFilterCommodities.has(commodity)}
                                  onCheckedChange={(checked) =>
                                    handleCommodityFilterChange(commodity, !!checked)
                                  }
                                />
                                <div className="flex items-center space-x-1.5">
                                  <span
                                    style={{
                                      height: '10px',
                                      width: '10px',
                                      backgroundColor: getCommodityMarkerColor(commodity),
                                      borderRadius: '50%',
                                      display: 'inline-block',
                                      border: '1px solid #ccc',
                                      flexShrink: 0,
                                    }}
                                  ></span>
                                  <Image
                                    src={getCommodityIconSrc(commodity)}
                                    alt={commodity}
                                    width={18}
                                    height={18}
                                    className="flexShrink:0"
                                  />
                                  <Label
                                    htmlFor={`comm-${commodity}`}
                                    className="text-xs font-normal cursor-pointer text-gray-600 hover:text-gray-800"
                                  >
                                    {commodity}
                                  </Label>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-500">No commodities loaded yet.</p>
                          )}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>

      {/* Map Area - takes full space, sidebars overlay this */}
      <div className="h-full w-full">
        {/* Loading Indicator */}
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1001,
              background: 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-lg font-medium text-gray-700">Loading directory data...</p>
          </div>
        )}
        {/* Error Message - Centered on top of map area */}
        {error && (
          <div
            role="alert"
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1002,
              background: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              padding: '12px 15px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Error: {error}
          </div>
        )}

        <MapContainer
          center={posix}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          whenCreated={setMapInstance}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {davaoRegionGeoJSON && (
            <GeoJSON
              key={`geojson-layer-${Array.from(selectedFilterProvinces).join('-')}`}
              data={davaoRegionGeoJSON as GeoJSONTypes.GeoJsonObject}
              style={geoJSONStyle}
              onEachFeature={onEachFeature}
            />
          )}
          {directoryMarkers}
        </MapContainer>
      </div>
    </div>
  );
};

export default ComplementaryProjects;