import React from 'react';
import { Shield, Wifi, WifiOff, Battery, Signal } from 'lucide-react';

const StatusBar = ({ isOnline, batteryLevel, signalStrength }) => (
  <div className="status-bar">
    <div className="status-bar-left">
      <Shield size={18} className="animate-pulse" />
      <span className="status-bar-title">Trip Rakshak</span>
    </div>
    <div className="status-bar-right">
      {isOnline ? <Wifi size={16} /> : <WifiOff size={16} className="network-offline" />}
      <div className="battery-indicator">
        <Signal size={16} />
        <div className="signal-bars">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`signal-bar ${i < signalStrength ? 'signal-bar-active' : 'signal-bar-inactive'}`}
            />
          ))}
        </div>
      </div>
      <div className="battery-indicator">
        <Battery size={16} />
        <span className="battery-text">{batteryLevel}%</span>
      </div>
    </div>
  </div>
);

export default StatusBar;