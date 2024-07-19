import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";

function Map({ lat, lng }) {
  //console.log("map", items);

  const defaultLat = 0;
  const defaultLng = 0;
  const centerLat = lat !== undefined ? lat : defaultLat;
  const centerLng = lng !== undefined ? lng : defaultLng;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={12}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
