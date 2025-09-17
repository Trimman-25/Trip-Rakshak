// apiService.js - Create this file in your client/src folder

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  // Generic request method with better error handling
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        mode: 'cors', // Explicitly set CORS mode
        ...options,
      };

      console.log(`🔄 Making ${config.method || 'GET'} request to:`, url);
      console.log('📋 Request config:', config);

      const response = await fetch(url, config);
      
      console.log(`📡 Response status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Response received:', data);
      return data;
    } catch (error) {
      console.error('❌ API request failed:', {
        endpoint,
        error: error.message,
        url: `${API_BASE_URL}${endpoint}`
      });
      
      // Check if it's a network error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('🌐 Network error - Backend might be down or CORS issue');
      }
      
      throw error;
    }
  }

  // Health check with more detailed logging
  async healthCheck() {
    console.log('🏥 Testing backend connection...');
    try {
      const result = await this.makeRequest('/health');
      console.log('✅ Backend health check successful');
      return result;
    } catch (error) {
      console.error('❌ Backend health check failed:', error.message);
      throw error;
    }
  }

  // Test connection
  async testConnection() {
    console.log('🔌 Testing API connection...');
    return this.makeRequest('');
  }

  // Get emergency contacts
  async getEmergencyContacts() {
    return this.makeRequest('/emergency-contacts');
  }

  // Send SOS alert
  async sendSOSAlert(alertData) {
    return this.makeRequest('/sos-alert', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  }

  // Send geofence alert
  async sendGeofenceAlert(alertData) {
    return this.makeRequest('/geofence-alert', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  }

  // Get user location (mock for now)
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString()
            });
          },
          (error) => {
            console.warn('⚠️ Geolocation error:', error);
            // Fallback to mock location
            resolve({
              latitude: 25.5788, // Shillong coordinates
              longitude: 91.8933,
              timestamp: new Date().toISOString(),
              mock: true
            });
          }
        );
      } else {
        // Fallback for browsers without geolocation
        resolve({
          latitude: 25.5788,
          longitude: 91.8933,
          timestamp: new Date().toISOString(),
          mock: true
        });
      }
    });
  }
}

// Export singleton instance
export default new ApiService();