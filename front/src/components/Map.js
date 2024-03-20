import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPros } from "../reducers/users.reducer";
import { selectCurrentUser } from "../reducers/authUser.reducer";
import "../styles/map.css";
import { Link } from "react-router-dom";
import { Icon } from "leaflet";

function Map() {
  const pros = useSelector(selectPros);
  const [geocodePros, setGeocodePros] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const [actualLocation, setActualLocation] = useState({
    center: [
      currentUser.address.location.long,
      currentUser.address.location.lat,
    ],
    zoom: 13,
  });
  const [isMapVisible, setIsMapVisible] = useState(true);

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
        popUp: (
          <div className="popup-content">
            <img src={proMarker.avatar.avatar_url} alt="Avatar" />
            <h2>
              {proMarker.firstname} {proMarker.lastname}
            </h2>
            <Link className="details-button" to={`/details/${proMarker.id}`}>
              Détails
            </Link>
          </div>
        ),
      }));

      setGeocodePros(updatedGeocodePros);
    }
  }, [pros]);

  const customMarkerIconBlue = new Icon({
    iconUrl: process.env.PUBLIC_URL + "/img/marker-blue.png",
    iconSize: [40, 50],
    iconAnchor: [15, 30],
  });

  const customMarkerIconRed = new Icon({
    iconUrl: process.env.PUBLIC_URL + "/img/marker-red.png",
    iconSize: [40, 50],
    iconAnchor: [15, 30],
  });

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
            <Marker
              key={index}
              position={proMarker.geocode}
              icon={customMarkerIconBlue}
            >
              <Popup>{proMarker.popUp}</Popup>
            </Marker>
          ))}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode}
              icon={customMarkerIconRed}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </section>
  );
}

export default Map;
