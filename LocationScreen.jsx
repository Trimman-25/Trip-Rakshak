import React, { useState, useEffect } from 'react';

const ESP32Screen = () => {
  const [esp32Data, setEsp32Data] = useState(null);
  const [esp32History, setEsp32History] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('online');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock data generation
  const generateMockData = () => {
    const baseLatitude = 12.8229;
    const baseLongitude = 80.0440;
    
    // Add small random variations to simulate GPS drift
    const latVariation = (Math.random() - 0.5) * 0.001; // ±0.0005 degrees (~50m)
    const lonVariation = (Math.random() - 0.5) * 0.001;
    
    const mockData = {
      id: `MSG_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      source: `ESP32_${Math.floor(Math.random() * 5) + 1}`,
      timestamp: Date.now(),
      data: JSON.stringify({
        temperature: (Math.random() * 10 + 25).toFixed(1), // 25-35°C
        humidity: (Math.random() * 30 + 50).toFixed(1), // 50-80%
        pressure: (Math.random() * 50 + 1000).toFixed(1), // 1000-1050 hPa
        latitude: (baseLatitude + latVariation).toFixed(6),
        longitude: (baseLongitude + lonVariation).toFixed(6),
        altitude: (Math.random() * 20 + 10).toFixed(1), // 10-30m above sea level
        rssi: Math.floor(Math.random() * 40) - 80, // -80 to -40 dBm
        batteryLevel: Math.floor(Math.random() * 30) + 70, // 70-100%
        nodeId: Math.floor(Math.random() * 255),
        messageType: Math.random() > 0.7 ? 'BROADCAST' : 'SENSOR_DATA'
      })
    };
    
    return mockData;
  };

  // Generate mock history
  const generateMockHistory = () => {
    const history = [];
    for (let i = 0; i < 10; i++) {
      const timestamp = Date.now() - (i * 30000); // 30 seconds apart
      history.push({
        ...generateMockData(),
        timestamp: timestamp,
        id: `MSG_${timestamp}_${i}`
      });
    }
    return history.reverse();
  };

  // Mock API functions
  const fetchLatestData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
    
    try {
      const mockData = generateMockData();
      setEsp32Data(mockData);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch ESP32 data: ${err.message}`);
    }
  };

  const fetchHistory = async () => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
    
    try {
      const mockHistory = generateMockHistory();
      setEsp32History(mockHistory);
    } catch (err) {
      console.error('Error fetching ESP32 history:', err);
    }
  };

  const fetchConnectionStatus = async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      // Randomly simulate connection status changes
      const statuses = ['online', 'online', 'online', 'offline']; // 75% online
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setConnectionStatus(randomStatus);
    } catch (err) {
      setConnectionStatus('disconnected');
    }
  };

  // Parse data string to object
  const parseDataString = (dataString) => {
    try {
      return JSON.parse(dataString);
    } catch {
      return { raw: dataString };
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Get connection status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Refresh all data
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchLatestData(),
      fetchHistory(),
      fetchConnectionStatus()
    ]);
    setLoading(false);
  };

  // Auto-refresh effect
  useEffect(() => {
    const fetchData = async () => {
      await refreshData();
    };

    fetchData();

    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchData, 3000); // Refresh every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  if (loading && !esp32Data) {
    return (
      <div className="esp32-screen">
        <div className="screen-header">
          <h2>ESP32 LoRa Mesh Data</h2>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Connecting to ESP32...</p>
        </div>
      </div>
    );
  }

  const parsedData = esp32Data ? parseDataString(esp32Data.data) : null;

  return (
    <div className="esp32-screen">
      <div className="screen-header">
        <h2>ESP32 LoRa Mesh Data</h2>
        <div className="header-controls">
          <label className="auto-refresh-toggle">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto Refresh
          </label>
          <button 
            className="refresh-button"
            onClick={refreshData}
            disabled={loading}
            title="Manual refresh"
          >
            <span className={`refresh-icon ${loading ? 'spinning' : ''}`}>🔄</span>
          </button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="connection-status-card">
        <div className="status-header">
          <h3>ESP32 Connection Status</h3>
          <div className="connection-indicator">
            <span className={`status-dot ${connectionStatus}`}></span>
            <span className="status-text">{connectionStatus.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Latest Data Card */}
      {esp32Data ? (
        <div className="data-card">
          <div className="card-header">
            <h3>Latest Message</h3>
            <div className="message-time">
              {formatTimestamp(esp32Data.timestamp)}
            </div>
          </div>
          
          <div className="data-content">
            <div className="data-row">
              <span className="data-label">Message ID:</span>
              <span className="data-value">{esp32Data.id}</span>
            </div>
            
            <div className="data-row">
              <span className="data-label">Source:</span>
              <span className="data-value">{esp32Data.source}</span>
            </div>
            
            {parsedData && (
              <>
                {/* Location Data */}
                {parsedData.latitude && parsedData.longitude && (
                  <div className="location-section">
                    <h4 className="section-title">📍 Location</h4>
                    <div className="data-row">
                      <span className="data-label">Latitude:</span>
                      <span className="data-value coordinate">{parsedData.latitude}°N</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Longitude:</span>
                      <span className="data-value coordinate">{parsedData.longitude}°E</span>
                    </div>
                    {parsedData.altitude && (
                      <div className="data-row">
                        <span className="data-label">Altitude:</span>
                        <span className="data-value">{parsedData.altitude}m</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Sensor Data */}
                <div className="sensor-section">
                  <h4 className="section-title">🌡️ Sensors</h4>
                  {parsedData.temperature && (
                    <div className="data-row">
                      <span className="data-label">Temperature:</span>
                      <span className="data-value sensor-value">{parsedData.temperature}°C</span>
                    </div>
                  )}
                  {parsedData.humidity && (
                    <div className="data-row">
                      <span className="data-label">Humidity:</span>
                      <span className="data-value sensor-value">{parsedData.humidity}%</span>
                    </div>
                  )}
                  {parsedData.pressure && (
                    <div className="data-row">
                      <span className="data-label">Pressure:</span>
                      <span className="data-value sensor-value">{parsedData.pressure} hPa</span>
                    </div>
                  )}
                </div>

                {/* Network Data */}
                <div className="network-section">
                  <h4 className="section-title">📡 Network</h4>
                  {parsedData.nodeId && (
                    <div className="data-row">
                      <span className="data-label">Node ID:</span>
                      <span className="data-value">{parsedData.nodeId}</span>
                    </div>
                  )}
                  {parsedData.rssi && (
                    <div className="data-row">
                      <span className="data-label">Signal Strength:</span>
                      <span className="data-value">{parsedData.rssi} dBm</span>
                    </div>
                  )}
                  {parsedData.batteryLevel && (
                    <div className="data-row">
                      <span className="data-label">Battery:</span>
                      <span className="data-value battery-level">{parsedData.batteryLevel}%</span>
                    </div>
                  )}
                  {parsedData.messageType && (
                    <div className="data-row">
                      <span className="data-label">Message Type:</span>
                      <span className="data-value message-type">{parsedData.messageType}</span>
                    </div>
                  )}
                </div>
              </>
            )}
            
            <div className="data-row">
              <span className="data-label">Received:</span>
              <span className="data-value">{formatTimestamp(esp32Data.timestamp)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data-card">
          <div className="no-data-icon">📡</div>
          <h3>No Data Received</h3>
          <p>{error || 'Waiting for ESP32 to send data...'}</p>
        </div>
      )}

      {/* Data History */}
      {esp32History.length > 0 && (
        <div className="history-card">
          <div className="card-header">
            <h3>Recent Messages</h3>
            <span className="history-count">{esp32History.length} messages</span>
          </div>
          
          <div className="history-list">
            {esp32History.map((message) => {
              const historyData = parseDataString(message.data);
              return (
                <div key={message.id} className="history-item">
                  <div className="history-header">
                    <span className="message-id">#{message.id.split('_').pop()}</span>
                    <span className="message-source">{message.source}</span>
                    <span className="message-time">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="history-summary">
                    {historyData.latitude && historyData.longitude && (
                      <span className="location-preview">
                        📍 {historyData.latitude}, {historyData.longitude}
                      </span>
                    )}
                    {historyData.temperature && (
                      <span className="temp-preview">🌡️ {historyData.temperature}°C</span>
                    )}
                    {historyData.batteryLevel && (
                      <span className="battery-preview">🔋 {historyData.batteryLevel}%</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="info-section">
        <div className="info-card">
          <h4>📶 LoRa Mesh Network</h4>
          <p>Receiving GPS coordinates and sensor data from ESP32 devices via LoRa mesh communication. Location: Chennai area (12.8229°N, 80.0440°E).</p>
        </div>
        
        <div className="info-card">
          <h4>🔄 Auto-Refresh</h4>
          <p>Enable auto-refresh to automatically fetch new data every 3 seconds. Mock data includes GPS, temperature, humidity, and network status.</p>
        </div>
      </div>

      <style jsx>{`
        .esp32-screen {
          padding: 20px;
          max-width: 100%;
          background: #f8fafc;
          min-height: calc(100vh - 120px);
        }

        .screen-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }

        .screen-header h2 {
          margin: 0;
          color: #2d3748;
          font-size: 24px;
          font-weight: 600;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .auto-refresh-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }

        .auto-refresh-toggle input {
          margin: 0;
        }

        .refresh-button {
          background: #4299e1;
          border: none;
          border-radius: 8px;
          padding: 8px 12px;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .refresh-button:hover {
          background: #3182ce;
        }

        .refresh-button:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }

        .refresh-icon {
          font-size: 16px;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .connection-status-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-header h3 {
          margin: 0;
          color: #2d3748;
          font-size: 18px;
        }

        .connection-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-dot.online {
          background: #48bb78;
          animation: pulse 2s infinite;
        }

        .status-dot.offline {
          background: #f56565;
        }

        .status-dot.disconnected {
          background: #a0aec0;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .status-text {
          font-weight: 600;
          font-size: 14px;
        }

        .data-card, .history-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-header h3 {
          margin: 0;
          color: #2d3748;
          font-size: 18px;
        }

        .message-time, .history-count {
          color: #718096;
          font-size: 12px;
          font-weight: 500;
        }

        .data-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .section-title {
          margin: 15px 0 10px 0;
          color: #2d3748;
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 5px;
        }

        .location-section, .sensor-section, .network-section {
          background: #f7fafc;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
        }

        .data-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
        }

        .data-row:last-child {
          border-bottom: none;
        }

        .data-label {
          color: #4a5568;
          font-weight: 500;
          font-size: 14px;
        }

        .data-value {
          color: #2d3748;
          font-size: 14px;
        }

        .coordinate {
          font-family: monospace;
          font-weight: 600;
          color: #2b6cb0;
        }

        .sensor-value {
          font-weight: 600;
          color: #2f855a;
        }

        .battery-level {
          font-weight: 600;
          color: #2d3748;
        }

        .message-type {
          font-size: 12px;
          background: #edf2f7;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }

        .message-data {
          font-family: monospace;
          background: #f7fafc;
          padding: 4px 8px;
          border-radius: 4px;
          max-width: 60%;
          word-break: break-word;
        }

        .no-data-card {
          background: white;
          border-radius: 12px;
          padding: 40px 20px;
          text-align: center;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .no-data-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .no-data-card h3 {
          margin: 0 0 10px 0;
          color: #2d3748;
        }

        .no-data-card p {
          margin: 0;
          color: #718096;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .history-item {
          background: #f7fafc;
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #e2e8f0;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .message-id {
          color: #4299e1;
          font-weight: 600;
          font-size: 12px;
        }

        .message-source {
          color: #805ad5;
          font-weight: 500;
          font-size: 12px;
        }

        .history-summary {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .location-preview, .temp-preview, .battery-preview {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 4px;
          background: #edf2f7;
          color: #4a5568;
          font-weight: 500;
        }

        .location-preview {
          background: #bee3f8;
          color: #2b6cb0;
        }

        .temp-preview {
          background: #c6f6d5;
          color: #2f855a;
        }

        .battery-preview {
          background: #fef5e7;
          color: #c05621;
        }

        .info-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
        }

        .info-card {
          background: white;
          border-radius: 8px;
          padding: 15px;
          border-left: 4px solid #4299e1;
        }

        .info-card h4 {
          margin: 0 0 8px 0;
          color: #2d3748;
          font-size: 14px;
          font-weight: 600;
        }

        .info-card p {
          margin: 0;
          color: #4a5568;
          font-size: 13px;
          line-height: 1.4;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          background: white;
          border-radius: 12px;
          margin-top: 20px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #4299e1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .esp32-screen {
            padding: 15px;
          }
          
          .screen-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
          
          .data-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .history-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default ESP32Screen;