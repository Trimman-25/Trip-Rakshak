
import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Search, Navigation, Locate, Plus, Minus } from 'lucide-react';

const GoogleMapsModal = ({ 
  showMap, 
  setShowMap, 
  currentCityData, 
  backendConnected 
}) => {
  const [inputLat, setInputLat] = useState('');
  const [inputLng, setInputLng] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 12.8229, lng: 80.0440 });
  const [zoom, setZoom] = useState(15);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize Google Map
  useEffect(() => {
    if (showMap && window.google && mapRef.current) {
      initializeMap();
    }
  }, [showMap, mapCenter, zoom]);

  // Load Google Maps API
  useEffect(() => {
    if (!window.google && showMap) {
      loadGoogleMapsAPI();
    }
  }, [showMap]);

  const loadGoogleMapsAPI = () => {
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAUnRwqCbo2M82AXCj__gOtN9KOGp1tPuE&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (mapRef.current) {
        initializeMap();
      }
    };
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!window.google || !mapRef.current) return;

    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: zoom,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#3b82f6' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: false
    });

    // Add marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
    
    markerRef.current = new window.google.maps.Marker({
      position: mapCenter,
      map: googleMapRef.current,
      title: 'Selected Location',
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
            <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 24 16 24s16-15.2 16-24c0-8.8-7.2-16-16-16z" fill="#ef4444"/>
            <circle cx="16" cy="16" r="8" fill="white"/>
            <circle cx="16" cy="16" r="4" fill="#ef4444"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 40),
        anchor: new window.google.maps.Point(16, 40)
      }
    });

    // Get address for current location
    if (backendConnected) {
      getReverseGeocode(mapCenter.lat, mapCenter.lng);
    }
  };

  const getReverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`http://localhost:8080/api/geocode/reverse/${lat}/${lng}`);
      if (response.ok) {
        const data = await response.json();
        setAddress(data.formatted_address);
      }
    } catch (error) {
      console.error('Failed to get address:', error);
    }
  };

  const handleSearch = async () => {
    if (!inputLat || !inputLng) {
      setError('Please enter both latitude and longitude');
      return;
    }

    const lat = parseFloat(inputLat);
    const lng = parseFloat(inputLng);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Please enter valid numeric coordinates');
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError('Invalid coordinates. Lat: -90 to 90, Lng: -180 to 180');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      const newCenter = { lat, lng };
      setMapCenter(newCenter);
      
      if (googleMapRef.current) {
        googleMapRef.current.setCenter(newCenter);
        if (markerRef.current) {
          markerRef.current.setPosition(newCenter);
        }
      }

      if (backendConnected) {
        await getReverseGeocode(lat, lng);
      }
    } catch (error) {
      setError('Failed to load location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (currentCityData) {
      setInputLat(currentCityData.lat.toString());
      setInputLng(currentCityData.lng.toString());
      setMapCenter({ lat: currentCityData.lat, lng: currentCityData.lng });
      
      if (googleMapRef.current) {
        googleMapRef.current.setCenter({ lat: currentCityData.lat, lng: currentCityData.lng });
        if (markerRef.current) {
          markerRef.current.setPosition({ lat: currentCityData.lat, lng: currentCityData.lng });
        }
      }
    }
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 1, 20);
    setZoom(newZoom);
    if (googleMapRef.current) {
      googleMapRef.current.setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 1, 1);
    setZoom(newZoom);
    if (googleMapRef.current) {
      googleMapRef.current.setZoom(newZoom);
    }
  };

  if (!showMap) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        width: '95vw',
        height: '90vh',
        maxWidth: '1400px',
        maxHeight: '900px',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: 0, marginBottom: '8px' }}>
                Google Maps Location Viewer
              </h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
                Enter coordinates to view location on map
              </p>
            </div>
            <button 
              onClick={() => setShowMap(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto auto auto',
            gap: '12px',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Latitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 12.8229"
                value={inputLat}
                onChange={(e) => setInputLat(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Longitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 80.0440"
                value={inputLng}
                onChange={(e) => setInputLng(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              style={{
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              <Search size={16} />
              {isLoading ? 'Loading...' : 'Search'}
            </button>
            <button
              onClick={handleCurrentLocation}
              style={{
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Use current location"
            >
              <Locate size={16} />
            </button>
          </div>

          {error && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#fef2f2',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Map Container */}
        <div style={{ position: 'relative', flex: 1 }}>
          <div 
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
          />

          {/* Map Controls */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 10
          }}>
            <button
              onClick={handleZoomIn}
              style={{
                width: '48px',
                height: '48px',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#374151'
              }}
            >
              <Plus size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              style={{
                width: '48px',
                height: '48px',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#374151'
              }}
            >
              <Minus size={20} />
            </button>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20
            }}>
              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid #f3f4f6',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>
                  Loading location...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid #e5e7eb',
          background: '#f9fafb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={16} color="#6b7280" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                Current Location: {mapCenter.lat.toFixed(6)}°, {mapCenter.lng.toFixed(6)}°
              </div>
              {address && (
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                  {address}
                </div>
              )}
            </div>
          </div>
          <div style={{
            background: backendConnected ? '#dcfce7' : '#fed7d7',
            color: backendConnected ? '#166534' : '#991b1b',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {backendConnected ? '● Backend Connected' : '● Backend Offline'}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default GoogleMapsModal;