export interface OwnerInfo {
  owner_name: string;
  longitude: number | null;
  latitude: number | null;
  email?: string;
  number?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  shopee?: string;
  lazada?: string;
}

/**
 * Map from a commodity name (e.g. "Coconut") to the array of owners
 */
export interface CommodityMap {
  [commodity: string]: OwnerInfo[];
}

/**
 * Top‐level map from province name (e.g. "Davao del Sur") to its CommodityMap
 */
export interface ProvinceCommodityMap {
  [province: string]: CommodityMap;
}
