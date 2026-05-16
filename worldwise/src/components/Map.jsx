import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useData } from "../context/Contextprovider";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";
function Map() {
  const { currCities } = useData();
  const [params] = useSearchParams();
  const lat = parseFloat(params.get("lat"));
  const lng = parseFloat(params.get("lng"));
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { isLoading, position, getPosition } = useGeolocation();
  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng],
  );
  useEffect(
    function () {
      if (position?.lat && position?.lng)
        setMapPosition([position.lat, position.lng]);
    },
    [position],
  );
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {currCities.map((c) => {
          return (
            <Marker key={c.id} position={[c.position.lat, c.position.lng]}>
              <Popup>
                <img
                  width="24px"
                  src={`https://flagcdn.com/256x192/${c.emoji}.webp`}
                  alt={c.country}
                />
                <span>{c.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition}></ChangeCenter>
        <Clickmap></Clickmap>
      </MapContainer>

      <Button
        type="position"
        onClick={() => {
          getPosition();
        }}
      >
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          <span>Use Your Position</span>
        )}
      </Button>
    </div>
  );
}
function Clickmap() {
  const navigate = useNavigate();
  const map = useMap();
  useMapEvents({
    click: (e) => {
      map.setView([e.latlng.lat, e.latlng.lng]);
      navigate(`form?lat=${e.latlng.lat}&&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
