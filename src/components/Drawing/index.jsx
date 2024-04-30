import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useGeomanControls } from "react-leaflet-geoman-v2";

export default function Drawing({ onCreate }) {
  let layer;

  useGeomanControls({
    options: {
      drawText: false,
      drawCircle: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawMarker: false,
    },
    onCreate: (e) => {
      if (e.shape === "Polygon") {
        if (layer) {
          // pass LatLng as string, easier to work with because the data returned from leaflet-geom
          // can vary
          layer.remove();
        }
        layer = e.layer.getElement();
        onCreate({
          coordinates: e.layer.getLatLngs().toString(),
          type: "Polygon",
        });
      } else if (e.shape === "Rectangle") {
        if (layer) {
          layer.remove();
        }
        layer = e.layer.getElement();
        onCreate({
          coordinates: e.layer.getLatLngs().toString(),
          type: "Rectangle",
        });
      } else if (e.shape === "Circle") {
        if (layer) {
          layer.remove();
        }
        layer = e.layer.getElement();
        onCreate({
          coordinates: e.layer.getLatLng().toString(),
          type: "Circle",
        });
      }
    },
    onEdit: (e) => {
      if (e.shape === "Polygon") {
        onCreate({
          coordinates: e.layer.getLatLngs().toString(),
          type: "Polygon",
        });
      } else if (e.shape === "Rectangle") {
        onCreate({
          coordinates: e.layer.getLatLngs().toString(),
          type: "Rectangle",
        });
      } else if (e.shape === "Circle") {
        onCreate({
          coordinates: e.layer.getLatLng().toString(),
          type: "Circle",
        });
      }
    },
    // eventDebugFn: console.log,
  });
  return null;
}
