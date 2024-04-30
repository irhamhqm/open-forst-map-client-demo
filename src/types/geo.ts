export type SilvanusCoord = { lat: number; lon: number };

export type PartialSilvanusGeoJson = {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: SilvanusCoord[][];
    pilot: string;
  };
};
