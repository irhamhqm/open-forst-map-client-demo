export const sivalnusCoordToSilvanusGeo = ({ coordinates, type }) => {
  return {
    type: "Feature",
    geometry: {
      type,
      coordinates,
      pilot: "indonesia",
    },
  };
};

// pass LatLng as string, easier to work with because the data returned from leaflet-geom
// can vary
export const parseStringToSilvanusCoord = (payload) => {
  const arr = payload.split("),");
  const res = arr.map((str) => {
    const temp = str.match(/LatLng\((.*)/);
    return temp ? temp[1].replace(")", "") : "";
  });

  return [res.map((val) => ({ lat: Number(val[0]), lon: Number(val[1]) }))];
};
