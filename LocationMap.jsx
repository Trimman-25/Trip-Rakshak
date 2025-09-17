import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationMap = ({ lat, lng, cityName, onClose }) => {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <button 
        onClick={onClose} 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: '#f87171',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
      
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[lat, lng]}>
          <Popup>{cityName || 'Current Location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
