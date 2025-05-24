/* eslint-disable @typescript-eslint/no-explicit-any */
// /components/client/ComplementProjects.js
"use client"

import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from "react-leaflet"; // useMap removed as map instance is directly used
import L, { LatLngExpression, LatLngTuple, Layer, Map as LeafletMap } from 'leaflet';
import { displayDirectories, displayCommoditiesInProvince } from "@/api/api"; // Assuming these are your API functions
import { ProvinceCommodityMap, OwnerInfo, CommodityMap } from "@/interface/directory.inteface"; // Assuming these are your interfaces
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useState, useEffect, useMemo, useCallback } from "react"; // Added useCallback
import type * as GeoJSONTypes from "geojson";

import { provinceData as davaoRegionGeoJSON } from "@/app/(unauth)/(marketing)/services/directory/geojson-data";

// Shadcn/ui components
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
}

interface OwnerWithContext extends OwnerInfo {
    commodity: string;
    province: string;
}

const defaults = {
    zoom: 8,
}

// --- Helper function for commodity colors (from previous step) ---
const predefinedCommodityColors: { [key: string]: string } = {
    // Existing colors
    "Cacao": "#795548",
    "Coffee": "#A1887F",
    "Coconut": "#4CAF50",
    "Banana": "#FFEB3B",
    "Mango": "#FF9800",
    "Durian": "#8BC34A",
    "Processed Fruits": "#FFC107",
    "Livestock": "#E91E63",
    "Aquaculture": "#2196F3",
    
    // Newly added commodities with generated colors
    "Banana - Saba": "#AE8D13",
    "Calamansi": "#1D7A3C",
    "Cashew": "#C4722D",
    "Cassava": "#9C27B0",
    "Chili": "#D32F2F",
    "Corn": "#FFC400",
    "Ginger": "#795548",
    "Guava": "#43A047",
    "Guyabano": "#7CB342",
    "Jackfruit": "#F57C00",
    "Macapuno": "#AFB42B",
    "Mangosteen": "#8E24AA",
    "Marang": "#5D4037",
    "Moringa": "#689F38",
    "Peanut": "#6D4C41",
    "Pineapple": "#FBC02D",
    "Sweetpotato": "#FF6F00",
    "Taro": "#4CAF50",
    "Turmeric": "#FFA000",
    "Ube": "#7B1FA2"
};
const generateCommodityColor = (commodityName: string): string => {
    let hash = 0;
    for (let i = 0; i < commodityName.length; i++) {
        hash = commodityName.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "000000".substring(0, 6 - color.length) + color;
};
const getCommodityMarkerColor = (commodityName: string): string => {
    return predefinedCommodityColors[commodityName] || generateCommodityColor(commodityName);
};
// --- End of Helper function ---

const ComplementaryProjects = (propsMap: MapProps) => { // Renamed props to propsMap to avoid conflict
    const { zoom = defaults.zoom, posix } = propsMap;
    const [fetchedDirectoryData, setFetchedDirectoryData] = useState<ProvinceCommodityMap | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProvinceOnMap, setSelectedProvinceOnMap] = useState<string | null>(null); // Province selected by clicking map
    const [selectedOwner, setSelectedOwner] = useState<OwnerWithContext | null>(null);
    const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null); // Renamed 'map' to 'mapInstance'

    // --- New states for filters ---
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFilterCommodities, setSelectedFilterCommodities] = useState<Set<string>>(new Set());
    const [selectedFilterProvinces, setSelectedFilterProvinces] = useState<Set<string>>(new Set());

    // --- Derived lists for filter options ---
    const allAvailableProvinces = useMemo(() => {
        if (!davaoRegionGeoJSON || !davaoRegionGeoJSON.features) return [];
        return davaoRegionGeoJSON.features.map(feature => feature?.properties?.name).sort();
    }, []); // davaoRegionGeoJSON is static

    const allAvailableCommodities = useMemo(() => {
        if (!fetchedDirectoryData) return [];
        const commodities = new Set<string>();
        Object.values(fetchedDirectoryData).forEach(provinceCommodities => {
            Object.keys(provinceCommodities).forEach(commodity => commodities.add(commodity));
        });
        return Array.from(commodities).sort();
    }, [fetchedDirectoryData]);

    console.log("fetchedDirectory data: ", fetchedDirectoryData);


    useEffect(() => {
        const loadDirectories = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await displayDirectories();
                console.log("this is the directories values: ", response);
                setFetchedDirectoryData(response);
            } catch (err) {
                console.error("Error fetching directory data:", err);
                setError("Failed to load directory data.");
            } finally {
                setIsLoading(false);
            }
        };
        loadDirectories();

        // This API call seems to just log, ensure it's useful or remove
        // displayCommoditiesInProvince().then(response => {
        //     console.log("this is the loadCommoditiesProvince: ", response);
        // }).catch(error => console.error(error));
    }, []);

    useEffect(() => {
        setSelectedOwner(null); // Clear owner details if selected province on map changes
    }, [selectedProvinceOnMap]);


    const geoJSONStyle = useCallback((feature?: GeoJSONTypes.Feature): L.PathOptions => {
        const defaultStyle: L.PathOptions = {
            fillColor: "grey", weight: 2, opacity: 4, color: 'grey', dashArray: '4', fillOpacity: 0.1
        };
        const highlightStyle: L.PathOptions = {
            fillColor: "yellow", weight: 3, opacity: 1, color: '#FF0000', dashArray: '', fillOpacity: 0.7
        };
  // Check if this province is in the selected filters
    if (feature?.properties?.name && selectedFilterProvinces.has(feature.properties.name)) {
        return highlightStyle;
    }
        return defaultStyle;
    }, [selectedFilterProvinces]);


// Update the province click handler to manage filters
const onEachFeature = useCallback((feature: GeoJSONTypes.Feature, layer: Layer) => {
    if (feature.properties && feature.properties.name) {
        const provinceName = feature.properties.name;
        layer.on({
            click: () => {
                setSelectedFilterProvinces(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(provinceName)) {
                        newSet.delete(provinceName);
                    } else {
                        newSet.add(provinceName);
                    }
                    return newSet;
                });
            }
        });
    }
}, []);
// setSelectedProvinceOnMap is stable

    // --- Filter handlers ---
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCommodityFilterChange = (commodity: string, checked: boolean) => {
        setSelectedFilterCommodities(prev => {
            const newSet = new Set(prev);
            if (checked) newSet.add(commodity);
            else newSet.delete(commodity);
            return newSet;
        });
    };

const handleProvinceFilterChange = (province: string, checked: boolean) => {
    setSelectedFilterProvinces(prev => {
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

    const provincesToIterate = Array.from(selectedFilterProvinces);
        provincesToIterate.forEach(provinceName => {
            if (!Object.prototype.hasOwnProperty.call(fetchedDirectoryData, provinceName)) return;

            const commodityMap: CommodityMap = fetchedDirectoryData[provinceName];
            for (const commodityName in commodityMap) {
                if (selectedFilterCommodities.size > 0 && !selectedFilterCommodities.has(commodityName)) {
                    continue; // Skip if commodity not in filter
                }

                if (Object.prototype.hasOwnProperty.call(commodityMap, commodityName)) {
                    const owners: OwnerInfo[] = commodityMap[commodityName];
                    const markerColor = getCommodityMarkerColor(commodityName);

                    owners.forEach((owner) => {
                        // Apply search term filter
                        if (searchTerm && !owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return; // Skip if owner name doesn't match search
                        }

                        if (owner.latitude != null && owner.longitude != null &&
                            !isNaN(Number(owner.latitude)) && !isNaN(Number(owner.longitude))) {

                            const ownerWithContext: OwnerWithContext = {
                                ...owner,
                                commodity: commodityName,
                                province: provinceName
                            };

                            const customMarkerIcon = new L.DivIcon({
                                html: `<svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
                                         <path d="M13 0C6.373 0 1 5.703 1 13.2C1 22.000 13 38 13 38S25 22.000 25 13.2C25 5.703 19.627 0 13 0Z" fill="${markerColor}" stroke="#FFFFFF" stroke-width="1.5"/>
                                         <circle cx="13" cy="13" r="5" fill="white" fill-opacity="0.5"/>
                                       </svg>`,
                                className: '',
                                iconSize: [26, 38],
                                iconAnchor: [13, 38],
                                popupAnchor: [0, -40]
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
                                                mapInstance.flyTo([owner.latitude, owner.longitude], Math.max(mapInstance.getZoom() || 13, 13));
                                            }
                                        },
                                    }}
                                >
                                    <Popup>
                                        <b>{owner.owner_name}</b><br />
                                        Commodity: {commodityName}<br />
                                        Province: {provinceName}
                                    </Popup>
                                </Marker>
                            );
                        }
                    });
                }
            }
        });
        return markers;
    }, [fetchedDirectoryData, selectedFilterProvinces, selectedFilterCommodities, searchTerm, mapInstance]);

    const handleOwnerSelectFromSidebar = (owner: OwnerWithContext) => {
        setSelectedOwner(owner);
        if (mapInstance && owner.latitude != null && owner.longitude != null) {
            mapInstance.flyTo([owner.latitude, owner.longitude], Math.max(mapInstance.getZoom() || 15, 15));
        }
    };

    const renderSidebarContent = () => {
        const [firstSelectedProvince] = selectedFilterProvinces;
        // Content for when an owner is selected
        if (selectedOwner) {
            return (
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>
                             <button
                                onClick={() => setSelectedOwner(null)}
                                className="mb-3 text-sm text-blue-600 hover:underline font-normal"
                            >
                                &larr; Back to {selectedOwner.province} / Search Results
                            </button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h4 className="text-lg font-semibold">{selectedOwner.owner_name}</h4>
                        <p><strong>Commodity:</strong> {selectedOwner.commodity}</p>
                        <p><strong>Province:</strong> {selectedOwner.province}</p>
                        {selectedOwner.email && <p><strong>Email:</strong> {selectedOwner.email}</p>}
                        {!selectedOwner.email && (selectedOwner as any).emai && <p><strong>Email:</strong> {(selectedOwner as any).emai}</p>}
                        {selectedOwner.number && <p><strong>Number:</strong> {selectedOwner.number}</p>}
                        {selectedOwner.website && (
                            <p><strong>Website:</strong>{' '}
                                <a href={!String(selectedOwner.website).startsWith('http') ? `http://${selectedOwner.website}` : String(selectedOwner.website)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {selectedOwner.website}
                                </a>
                            </p>
                        )}
                        {/* Add other social media links similarly */}
                    </CardContent>
                </Card>
            );
        }

        // Content for when a province is clicked on the map (and no specific owner)
        // This lists commodities for the *map-selected* province, respecting commodity filters and search
      if (firstSelectedProvince && fetchedDirectoryData && !selectedOwner) {
            const provinceCommodities = fetchedDirectoryData[firstSelectedProvince];
            if (!provinceCommodities || Object.keys(provinceCommodities).length === 0) {
                return <p>No commodities listed for {selectedProvinceOnMap}.</p>;
            }

            let hasVisibleOwners = false;

            const listContent = Object.entries(provinceCommodities)
                .filter(([commodityName, _]) => selectedFilterCommodities.size === 0 || selectedFilterCommodities.has(commodityName))
                .map(([commodityName, owners]) => {
                    const filteredOwners = owners.filter(owner => searchTerm === "" || owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase()));
                    if (filteredOwners.length === 0) return null;
                    hasVisibleOwners = true;
                    return (
                        <div key={commodityName} className="mb-3">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                                <span style={{
                                    height: '10px', width: '10px', backgroundColor: getCommodityMarkerColor(commodityName),
                                    borderRadius: '50%', display: 'inline-block', marginRight: '8px', border: '1px solid #ccc'
                                }}></span>
                                <h5 className="text-sm font-semibold text-gray-700">{commodityName}</h5>
                            </div>
                            <ul className="list-disc list-inside pl-2">
                                {filteredOwners.map((owner, index) => {
                                    const ownerWithContext: OwnerWithContext = {
                                        ...owner, commodity: commodityName, province: selectedProvinceOnMap,
                                    };
                                    return (
                                        <li key={`${commodityName}-${owner.owner_name}-${index}`}
                                            className="text-xs text-blue-700 hover:underline cursor-pointer"
                                            onClick={() => handleOwnerSelectFromSidebar(ownerWithContext)}
                                        >
                                            {owner.owner_name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                }).filter(Boolean);

            return (
                 <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{selectedProvinceOnMap}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h4 className="text-md font-semibold mb-1">COMMODITIES</h4>
                        {hasVisibleOwners ? listContent : <p className="text-xs text-gray-500">No businesses match current filters for this commodity.</p>}
                         <button
                            onClick={() => setSelectedProvinceOnMap(null)}
                            className="mt-3 text-sm text-blue-600 hover:underline"
                        >
                            &larr; Clear province selection
                        </button>
                    </CardContent>
                </Card>
            );
        }
        
        // Default message if no province or owner selected, or just general info based on filters
        if (!selectedOwner && !selectedProvinceOnMap) {
             // Display a summary based on current filters if no specific province is map-selected
            const filteredDataSummary: JSX.Element[] = [];
            let itemsFound = false;

            const provincesToDisplay = selectedFilterProvinces.size > 0 ? Array.from(selectedFilterProvinces) : allAvailableProvinces;

            provincesToDisplay.forEach(provName => {
                const provinceData = fetchedDirectoryData?.[provName];
                if (!provinceData) return;

                Object.entries(provinceData).forEach(([commName, ownersList]) => {
                    if (selectedFilterCommodities.size > 0 && !selectedFilterCommodities.has(commName)) return;
                    
                    const matchingOwners = ownersList.filter(owner => searchTerm === "" || owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase()));
                    if (matchingOwners.length > 0) {
                        itemsFound = true;
                        // Simple indication, could be more detailed
                        // filteredDataSummary.push(<p key={`${provName}-${commName}`} className="text-xs">{provName} - {commName}: {matchingOwners.length} found</p>);
                    }
                });
            });
            
            if (searchTerm || selectedFilterCommodities.size > 0 || selectedFilterProvinces.size > 0) {
                 return (
                     <Card>
                        <CardHeader><CardTitle>Filtered Results</CardTitle></CardHeader>
                        <CardContent>
                            {itemsFound ? 
                                <p>Businesses matching your filters are shown on the map.</p> : 
                                <p>No businesses match your current filter criteria. Try adjusting your filters or search term.</p>
                            }
                            <p className="text-xs mt-2">Select a province on the map for more details or click a marker.</p>
                        </CardContent>
                     </Card>
                 );
            }
        }


        return <p className="text-sm text-gray-600">Select a province on the map or use filters to find businesses.</p>;
    };


    return (
        <div className="flex" style={{ width: "100%", height: "calc(100vh - 70px)" /* Adjust based on your navbar */ }}>
            {/* Sidebar */}
            <div className="w-1/3 lg:w-1/4 p-3 bg-gray-50 border-r border-gray-200">
                <ScrollArea className="h-full pr-2">
                    <div className="space-y-4">
                        {/* Search Input */}
                        <Card>
                            <CardHeader className="pb-2 pt-4">
                                <Label htmlFor="search-directory" className="font-semibold text-sm">Search by Name</Label>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <Input
                                    id="search-directory"
                                    type="text"
                                    placeholder="Enter owner name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full"
                                />
                            </CardContent>
                        </Card>

                        {/* Filters */}
                        <Accordion type="multiple" defaultValue={['filter-provinces', 'filter-commodities']} className="w-full">
                            <AccordionItem value="filter-provinces">
                                <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">Filter by Province</AccordionTrigger>
                                <AccordionContent className="pb-1">
                                    <ScrollArea className="h-[150px] pr-3"> {/* Adjust height as needed */}
                                        <div className="space-y-2 pl-1">
                                        {allAvailableProvinces.length > 0 ? allAvailableProvinces.map(province => (
                                            <div key={province} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`prov-${province}`}
                                                    checked={selectedFilterProvinces.has(province)}
                                                    onCheckedChange={(checked) => handleProvinceFilterChange(province, !!checked)}
                                                />
                                                <Label htmlFor={`prov-${province}`} className="text-xs font-normal cursor-pointer">
                                                    {province}
                                                </Label>
                                            </div>
                                        )) : <p className="text-xs text-gray-500">No provinces loaded.</p>}
                                        </div>
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="filter-commodities">
                                <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">Filter by Commodity</AccordionTrigger>
                                <AccordionContent className="pb-1">
                                     <ScrollArea className="h-[200px] pr-3"> {/* Adjust height as needed */}
                                        <div className="space-y-2 pl-1">
                                        {allAvailableCommodities.length > 0 ? allAvailableCommodities.map(commodity => (
                                            <div key={commodity} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`comm-${commodity}`}
                                                    checked={selectedFilterCommodities.has(commodity)}
                                                    onCheckedChange={(checked) => handleCommodityFilterChange(commodity, !!checked)}
                                                />
                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span style={{
                                                        height: '10px', width: '10px',
                                                        backgroundColor: getCommodityMarkerColor(commodity),
                                                        borderRadius: '50%', display: 'inline-block',
                                                        marginRight: '6px', border: '1px solid #ccc'
                                                    }}></span>
                                                    <Label htmlFor={`comm-${commodity}`} className="text-xs font-normal cursor-pointer">
                                                        {commodity}
                                                    </Label>
                                                </div>
                                            </div>
                                        )) : <p className="text-xs text-gray-500">No commodities loaded yet.</p>}
                                        </div>
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        
                        {/* Display Area for selected item or province details */}
                        <div className="mt-4">
                            {renderSidebarContent()}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Map Area */}
            <div className="w-2/3 lg:w-3/4" style={{ position: "relative" }}>
                {isLoading && <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1001, background: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>Loading directory data...</p>}
                {error && <p style={{ position: 'absolute', top: 10, left: 10, zIndex: 1001, background: 'rgba(255,0,0,0.7)', color: 'white', padding: '10px', borderRadius: '5px' }}>Error: {error}</p>}

                <MapContainer
                    center={posix}
                    zoom={zoom}
                    style={{ height: "100%", width: "100%" }}
                    whenCreated={setMapInstance} // Use renamed state setter
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {davaoRegionGeoJSON && (
                        <GeoJSON
                            key={selectedProvinceOnMap || 'geojson-key-force-update'} // Force re-render if selectedProvinceOnMap changes style
                            data={davaoRegionGeoJSON as GeoJSONTypes.GeoJsonObject}
                            style={geoJSONStyle}
                            onEachFeature={onEachFeature}
                        />
                    )}
                    {directoryMarkers}
                </MapContainer>
            </div>
        </div>
    )
}

export default ComplementaryProjects;