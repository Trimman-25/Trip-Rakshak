import React from 'react';

const SettingsScreen = ({ geofenceEnabled, setGeofenceEnabled }) => (
  <div className="settings-screen">
    <h2 className="settings-title">Settings</h2>
    
    <div className="settings-sections">
      <div className="settings-section">
        <h3 className="settings-section-title">Geofencing & Safety</h3>
        <div className="settings-options">
          {[
            { 
              label: 'Geofence Monitoring', 
              enabled: geofenceEnabled,
              onChange: () => setGeofenceEnabled(!geofenceEnabled)
            },
            { label: 'Zone Breach Alerts', enabled: true },
            { label: 'Auto Emergency Call', enabled: false },
            { label: 'Silent Monitoring', enabled: true },
          ].map((setting, index) => (
            <div key={index} className="setting-item">
              <div className="setting-info">
                <span className="setting-label">{setting.label}</span>
                {setting.label === 'Geofence Monitoring' && (
                  <span className="setting-description">
                    Monitor entry/exit from safe zones
                  </span>
                )}
              </div>
              <button 
                className={`toggle-switch ${setting.enabled ? 'toggle-switch-on' : 'toggle-switch-off'}`}
                onClick={setting.onChange}
              >
                <div className={`toggle-switch-handle ${setting.enabled ? 'toggle-switch-handle-on' : 'toggle-switch-handle-off'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Privacy & Location</h3>
        <div className="settings-options">
          {[
            { label: 'Location Sharing', enabled: true },
            { label: 'Data Analytics', enabled: false },
            { label: 'Offline Mode', enabled: true },
            { label: 'Background Tracking', enabled: true },
          ].map((setting, index) => (
            <div key={index} className="setting-item">
              <span className="setting-label">{setting.label}</span>
              <button className={`toggle-switch ${setting.enabled ? 'toggle-switch-on' : 'toggle-switch-off'}`}>
                <div className={`toggle-switch-handle ${setting.enabled ? 'toggle-switch-handle-on' : 'toggle-switch-handle-off'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Account</h3>
        <div className="account-options">
          <button className="account-option">
            <span className="account-option-text">Edit Profile</span>
          </button>
          <button className="account-option">
            <span className="account-option-text">Change Password</span>
          </button>
          <button className="account-option">
            <span className="account-option-text">Notification Settings</span>
          </button>
        </div>
      </div>

      <button className="signout-btn">
        Sign Out
      </button>
    </div>
  </div>
);

export default SettingsScreen;