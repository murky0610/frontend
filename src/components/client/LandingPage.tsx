"use client"
import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Pane } from 'react-leaflet';
import type { GeoJsonObject, Feature, Geometry } from 'geojson';
import type { PathOptions } from 'leaflet';

import 'leaflet/dist/leaflet.css';

// GeoJSON data with region polygons
//import philippineRegions from '../data/philippineRegions.json';

const defaultCenter: [number, number] = [12.8797, 121.7740]; // Philippines approximate center
const defaultZoom = 6;

interface RegionFeatureProps {
  REGION_NAME: string;
}

// For clarity, define a type for features in your data
type RegionFeature = Feature<Geometry, RegionFeatureProps>;

export default function LandingPage() {
  // Keep track of which region is selected
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  /**
   * Style function for each feature
   */
  const regionStyle = (feature: RegionFeature | undefined): PathOptions => {
    if (feature?.properties.REGION_NAME === selectedRegion) {
      return {
        color: 'red',       // Outline (stroke) color
        weight: 3,
        fillColor: '#fff',
        fillOpacity: 0.1,
      };
    }
    return {
      color: '#666',       // Default outline color
      weight: 1,
      fillColor: '#ccc',
      fillOpacity: 0.2,
    };
  };

  /**
   * Handler for each feature in the GeoJSON
   */
  const onEachRegion = (feature: RegionFeature, layer: L.Layer) => {
    layer.on('click', () => {
      setSelectedRegion(feature.properties.REGION_NAME);
    });
  };

  return (
    <div>
      {/* Simple dropdown to pick a region */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="region-select">Select Region: </label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">-- None --</option>
          <option value="NCR">NCR</option>
          <option value="Region I">Region I</option>
          <option value="Region II">Region II</option>
          {/* Add more options matching your GeoJSON data */}
        </select>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 
          Use a separate Pane (optional) to control layering/zIndex 
          so region polygons appear above or below other layers if needed.
        */}
        {/* <Pane name="regions-pane" style={{ zIndex: 650 }}>
          <GeoJSON
            data={philippineRegions as GeoJsonObject}
            style={regionStyle}
            onEachFeature={onEachRegion}
          />
        </Pane> */}
      </MapContainer>
    </div>
  );
}
