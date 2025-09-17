import React from 'react';
import { X } from 'lucide-react';

const GeofenceAlert = ({ 
  showGeofenceAlert, 
  setShowGeofenceAlert, 
  lastGeofenceAlert, 
  geofenceStatus 
}) => {
  const getGeofenceStatusColor = () => {
    switch (geofenceStatus) {
      case 'safe': return 'geofence-safe';
      case 'buffer': return 'geofence-buffer';
      case 'caution': return 'geofence-caution';
      case 'danger': return 'geofence-danger';
      default: return 'geofence-safe';
    }
  };

  if (!showGeofenceAlert || !lastGeofenceAlert) return null;

  return (
    <div className={`geofence-alert ${getGeofenceStatusColor()}`}>
      <div className="geofence-alert-content">
        <div className="geofence-alert-icon">
          {lastGeofenceAlert.type === 'danger' ? '🚨' : '⚠️'}
        </div>
        <div className="geofence-alert-text">
          <p className="geofence-alert-message">{lastGeofenceAlert.message}</p>
          <p className="geofence-alert-time">{lastGeofenceAlert.time}</p>
        </div>
      </div>
      <button 
        onClick={() => setShowGeofenceAlert(false)}
        className="geofence-alert-close"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default GeofenceAlert;