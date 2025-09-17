import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const SOSModal = ({ 
  showSOSModal, 
  setShowSOSModal, 
  sosCountdown, 
  sosActive, 
  selectedEmergencyType,
  startSOSCountdown, 
  cancelSOS, 
  emergencyTypes 
}) => {
  if (!showSOSModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-content">
            <div>
              <h2 className="modal-title">🚨 Emergency SOS</h2>
              <p className="modal-subtitle">Select emergency type</p>
            </div>
            <button 
              onClick={() => setShowSOSModal(false)}
              className="modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {sosCountdown > 0 && (
          <div className="sos-countdown-container">
            <div className="sos-countdown-circle animate-pulse">
              {sosCountdown}
            </div>
            <h3 className="sos-countdown-title">
              Activating {selectedEmergencyType?.title}
            </h3>
            <p className="sos-countdown-text">
              Emergency services will be contacted automatically
            </p>
            <button 
              onClick={cancelSOS}
              className="cancel-sos-btn"
            >
              Cancel SOS
            </button>
          </div>
        )}

        {sosActive && (
          <div className="sos-active-container">
            <div className="sos-active-circle animate-pulse">
              🚨
            </div>
            <h3 className="sos-active-title">SOS ACTIVATED</h3>
            <div className="sos-status-card">
              <p className="sos-emergency-type">
                Emergency Type: <span className="sos-emergency-type-name">{selectedEmergencyType?.title}</span>
              </p>
              <div className="sos-status-list">
                <div className="sos-status-item">
                  <CheckCircle className="icon-green" size={20} />
                  <span className="sos-status-text">Location shared with authorities</span>
                </div>
                <div className="sos-status-item">
                  <CheckCircle className="icon-green" size={20} />
                  <span className="sos-status-text">Emergency contacts notified</span>
                </div>
                <div className="sos-status-item">
                  <CheckCircle className="icon-green" size={20} />
                  <span className="sos-status-text">Nearest services identified</span>
                </div>
              </div>
            </div>
            <p className="sos-help-text">
              Help is on the way. Stay calm and stay where you are.
            </p>
          </div>
        )}

        {!sosCountdown && !sosActive && (
          <div className="emergency-types-container">
            <p className="emergency-types-instruction">
              Hold any emergency button for 3 seconds to activate
            </p>
            
            {emergencyTypes.map((type) => (
              <button
                key={type.id}
                onMouseDown={() => startSOSCountdown(type)}
                onMouseUp={cancelSOS}
                onMouseLeave={cancelSOS}
                onTouchStart={() => startSOSCountdown(type)}
                onTouchEnd={cancelSOS}
                className={`emergency-btn ${type.cssClass}`}
              >
                <div className="emergency-btn-emoji">{type.emoji}</div>
                <div className="emergency-btn-content">
                  <h3 className="emergency-btn-title">{type.title}</h3>
                  <p className="emergency-btn-desc">{type.description}</p>
                </div>
              </button>
            ))}

            <div className="emergency-tip">
              <p className="emergency-tip-text">
                💡 Hold down any button above for 3 seconds to activate emergency response. 
                Release to cancel before activation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSModal;