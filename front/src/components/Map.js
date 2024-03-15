import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPros } from "../reducers/users.reducer";
import { selectCurrentUser } from "../reducers/authUser.reducer";
import "../styles/map.css";

function Map() {
  const pros = useSelector(selectPros);
  const [geocodePros, setGeocodePros] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const [actualLocation, setActualLocation] = useState({
    center: [
      currentUser.address.location.long,
      currentUser.address.location.lat,
    ],
    zoom: 10000,
  });
  const [isMapVisible, setIsMapVisible] = useState(false);

  const handleToggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };

  useEffect(() => {
    if (pros) {
      const updatedGeocodePros = pros.map((proMarker) => ({
        geocode: [
          proMarker.address.location.long,
          proMarker.address.location.lat,
        ],
        popUp: proMarker.lastname,
      }));

      setGeocodePros(updatedGeocodePros);
    }
  }, [pros]);

  const markers = [
    {
      geocode: actualLocation.center,
      popUp: "Hello, that's me !",
    },
  ];

  return (
    <section className="mapContainer">
      <button className="toggleMap" onClick={handleToggleMap}>
        {isMapVisible ? "Cacher la Carte" : "Afficher la Carte"}
      </button>
      {isMapVisible && (
        <MapContainer
          className="map"
          key={`${actualLocation.center[0]}-${actualLocation.center[1]}`}
          center={actualLocation.center}
          zoom={actualLocation.zoom}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geocodePros.map((proMarker, index) => (
            <Marker key={index} position={proMarker.geocode}>
              <Popup>{proMarker.popUp}</Popup>
            </Marker>
          ))}
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </section>
  );
}

export default Map;
