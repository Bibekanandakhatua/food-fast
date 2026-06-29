import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapSection.css';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapSection = () => {
  const position = [51.505, -0.09]; // Default coordinates (London)
  
  // Custom dark theme for Leaflet via CSS filter
  return (
    <div className="map-section" id="map-section">
      <div className="map-info">
        <h3>Our Prime Locations</h3>
        <p>Find our premium boutique restaurants across the city.</p>
        <div className="location-list">
          <div className="location-item active">
            <span>Central Hub</span>
            <p>123 Dining St, Soho</p>
          </div>
          <div className="location-item">
            <span>East Wing</span>
            <p>45 Gourmet Ave, Shoreditch</p>
          </div>
        </div>
      </div>
      <div className="map-container-wrapper">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="leaflet-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              FoodFast Premium Hub <br /> Soho, London.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapSection;
