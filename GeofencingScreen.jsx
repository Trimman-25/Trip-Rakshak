import React from 'react';
import { MapIcon, CheckCircle, AlertTriangle } from 'lucide-react';

const GeofencingScreen = ({ 
  currentCityData, 
  geofenceStatus, 
  geofenceEnabled, 
  setGeofenceEnabled,
  lastGeofenceAlert 
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

  const getGeofenceStatusText = () => {
    switch (geofenceStatus) {
      case 'safe': return '✓ SAFE ZONE';
      case 'buffer': return '● BUFFER ZONE';
      case 'caution': return '⚠ CAUTION ZONE';
      case 'danger': return '🚨 DANGER ZONE';
      default: return '✓ SAFE ZONE';
    }
  };

  return (
    <div className="geofencing-screen">
      <div className="geofencing-header">
        <h2 className="geofencing-title">Geofencing Monitor</h2>
        <p className="geofencing-subtitle">Real-time location safety tracking</p>
      </div>

      {/* Current Status Card */}
      <div className="geofence-status-card">
        <div className="geofence-status-header">
          <div className="geofence-status-info">
            <MapIcon className="icon-blue" size={24} />
            <div>
              <h3 className="geofence-status-title">Current Status</h3>
              <p className="geofence-status-location">{currentCityData.name}</p>
            </div>
          </div>
          <div className={`geofence-status-badge ${getGeofenceStatusColor()}`}>
            {getGeofenceStatusText()}
          </div>
        </div>
        
        <div className="geofence-status-details">
          <div className="geofence-detail-item">
            <span className="geofence-detail-label">Zone Type:</span>
            <span className="geofence-detail-value">{geofenceStatus.toUpperCase()}</span>
          </div>
          <div className="geofence-detail-item">
            <span className="geofence-detail-label">Last Update:</span>
            <span className="geofence-detail-value">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="geofence-detail-item">
            <span className="geofence-detail-label">Monitoring:</span>
            <span className="geofence-detail-value">{geofenceEnabled ? 'ACTIVE' : 'DISABLED'}</span>
          </div>
        </div>
      </div>

      {/* Zone Information */}
      <div className="geofence-zones-card">
        <h3 className="geofence-zones-title">Zone Information for {currentCityData.name}</h3>
        
        <div className="zone-categories">
          <div className="zone-category">
            <div className="zone-category-header">
              <div className="zone-category-indicator zone-indicator-safe"></div>
              <h4 className="zone-category-title">Safe Zones ({currentCityData.safeZones.length})</h4>
            </div>
            <div className="zone-list">
              {currentCityData.safeZones.map((zone, index) => (
                <div key={index} className="zone-item zone-safe">
                  <div className="zone-info">
                    <span className="zone-name">{zone.name}</span>
                    <span className="zone-details">{zone.radius}m radius • {zone.type}</span>
                    <span className="zone-coords">{zone.lat.toFixed(4)}°, {zone.lng.toFixed(4)}°</span>
                  </div>
                  <div className="zone-status">
                    <CheckCircle className="icon-green" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="zone-category">
            <div className="zone-category-header">
              <div className="zone-category-indicator zone-indicator-danger"></div>
              <h4 className="zone-category-title">Danger Zones ({currentCityData.dangerZones.length})</h4>
            </div>
            <div className="zone-list">
              {currentCityData.dangerZones.map((zone, index) => (
                <div key={index} className="zone-item zone-danger">
                  <div className="zone-info">
                    <span className="zone-name">{zone.name}</span>
                    <span className="zone-details">{zone.radius}m radius • {zone.type}</span>
                    <span className="zone-coords">{zone.lat.toFixed(4)}°, {zone.lng.toFixed(4)}°</span>
                  </div>
                  <div className="zone-status">
                    <AlertTriangle className="icon-red" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Geofence Settings */}
      <div className="geofence-settings-card">
        <h3 className="geofence-settings-title">Geofence Settings</h3>
        <div className="geofence-settings-options">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Enable Geofencing</span>
              <span className="setting-description">Monitor zone entry/exit</span>
            </div>
            <button 
              className={`toggle-switch ${geofenceEnabled ? 'toggle-switch-on' : 'toggle-switch-off'}`}
              onClick={() => setGeofenceEnabled(!geofenceEnabled)}
            >
              <div className={`toggle-switch-handle ${geofenceEnabled ? 'toggle-switch-handle-on' : 'toggle-switch-handle-off'}`}></div>
            </button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Zone Breach Alerts</span>
              <span className="setting-description">Get notified when entering danger zones</span>
            </div>
            <button className="toggle-switch toggle-switch-on">
              <div className="toggle-switch-handle toggle-switch-handle-on"></div>
            </button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Auto Emergency Call</span>
              <span className="setting-description">Automatically call emergency services in danger zones</span>
            </div>
            <button className="toggle-switch toggle-switch-off">
              <div className="toggle-switch-handle toggle-switch-handle-off"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {lastGeofenceAlert && (
        <div className="geofence-activity-card">
          <h3 className="geofence-activity-title">Recent Activity</h3>
          <div className="activity-item">
            <div className="activity-icon">
              {lastGeofenceAlert.type === 'danger' ? '🚨' : '⚠️'}
            </div>
            <div className="activity-info">
              <p className="activity-message">{lastGeofenceAlert.message}</p>
              <p className="activity-time">{lastGeofenceAlert.time}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeofencingScreen;