// // import React from 'react';
// // import { Shield, User, MapPin, Wifi, WifiOff, Navigation, Signal, Battery } from 'lucide-react';
// // import CitySelector from './CitySelector';

// // const HomeScreen = ({ 
// //   currentCityData, 
// //   geofenceStatus, 
// //   geofenceEnabled, 
// //   isOnline, 
// //   batteryLevel, 
// //   signalStrength,
// //   showCitySelector,
// //   setShowCitySelector,
// //   handleCityChange,
// //   cities,
// //   selectedCity
// // }) => {
// //   const getGeofenceStatusColor = () => {
// //     switch (geofenceStatus) {
// //       case 'safe': return 'geofence-safe';
// //       case 'buffer': return 'geofence-buffer';
// //       case 'caution': return 'geofence-caution';
// //       case 'danger': return 'geofence-danger';
// //       default: return 'geofence-safe';
// //     }
// //   };

// //   const getGeofenceStatusText = () => {
// //     switch (geofenceStatus) {
// //       case 'safe': return '✓ SAFE ZONE';
// //       case 'buffer': return '● BUFFER ZONE';
// //       case 'caution': return '⚠ CAUTION ZONE';
// //       case 'danger': return '🚨 DANGER ZONE';
// //       default: return '✓ SAFE ZONE';
// //     }
// //   };

// //   return (
// //     <div className="home-screen">
// //       {/* Hero Card */}
// //       <div className="hero-card">
// //         <div className="hero-header">
// //           <div>
// //             <h1 className="hero-title">Welcome Back!</h1>
// //             <p className="hero-subtitle">Your safety is our priority</p>
// //           </div>
// //           <div className="hero-icon-container">
// //             <Shield className="icon-white" size={28} />
// //           </div>
// //         </div>
        
// //         <div className="user-card">
// //           <div className="user-info">
// //             <div className="user-avatar">
// //               <User size={24} />
// //             </div>
// //             <div>
// //               <h2 className="user-name">John Doe</h2>
// //               <p className="user-id">Tourist ID: TR-2025-001234</p>
// //               <p className="user-validity">Valid until: Mar 15, 2025</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* City Selector */}
// //       <CitySelector 
// //         showCitySelector={showCitySelector}
// //         setShowCitySelector={setShowCitySelector}
// //         currentCityData={currentCityData}
// //         cities={cities}
// //         selectedCity={selectedCity}
// //         handleCityChange={handleCityChange}
// //       />

// //       {/* Location Card */}
// //       <div className="location-card">
// //         <div className="location-header">
// //           <div className="location-info">
// //             <MapPin className="icon-green" size={24} />
// //             <div>
// //               <h3 className="location-title">Current Location</h3>
// //               <p className="location-text">{currentCityData.name}</p>
// //             </div>
// //           </div>
// //           <div className={`safe-zone-badge ${getGeofenceStatusColor()}`}>
// //             {getGeofenceStatusText()}
// //           </div>
// //         </div>
        
// //         <div className="coordinates-container">
// //           <div className="coordinates-grid">
// //             <div>
// //               <p className="coordinate-value">{currentCityData.lat.toFixed(4)}°</p>
// //               <p className="coordinate-label">Latitude</p>
// //             </div>
// //             <div>
// //               <p className="coordinate-value">{currentCityData.lng.toFixed(4)}°</p>
// //               <p className="coordinate-label">Longitude</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Emergency Status Cards */}
// //       <div className="status-grid">
// //         <div className="status-card">
// //           <div className="status-card-header">
// //             <div className="status-card-info">
// //               {isOnline ? <Wifi className="icon-green" size={20} /> : <WifiOff className="icon-red" size={20} />}
// //               <span className="status-card-title">Network</span>
// //             </div>
// //             <div className={`status-indicator ${isOnline ? 'status-indicator-green' : 'status-indicator-red'} animate-pulse`}></div>
// //           </div>
// //           <p className={`status-text ${isOnline ? 'status-text-green' : 'status-text-red'}`}>
// //             {isOnline ? 'Connected' : 'Offline'}
// //           </p>
// //         </div>

// //         <div className="status-card">
// //           <div className="status-card-header">
// //             <div className="status-card-info">
// //               <Navigation className="icon-purple" size={20} />
// //               <span className="status-card-title">Geofence</span>
// //             </div>
// //             <div className={`status-indicator ${geofenceEnabled ? 'status-indicator-green' : 'status-indicator-gray'} animate-pulse`}></div>
// //           </div>
// //           <p className={`status-text ${geofenceEnabled ? 'status-text-green' : 'status-text-gray'}`}>
// //             {geofenceEnabled ? 'Active' : 'Disabled'}
// //           </p>
// //         </div>

// //         <div className="status-card">
// //           <div className="status-card-header">
// //             <div className="status-card-info">
// //               <Signal className="icon-blue" size={20} />
// //               <span className="status-card-title">Signal</span>
// //             </div>
// //             <div className="signal-bars">
// //               {[...Array(4)].map((_, i) => (
// //                 <div
// //                   key={i}
// //                   className={`signal-bar ${i < signalStrength ? 'signal-bar-active' : 'signal-bar-inactive'}`}
// //                   style={{backgroundColor: i < signalStrength ? '#3b82f6' : '#d1d5db'}}
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //           <p className="status-text status-text-blue">
// //             {signalStrength}/4 bars
// //           </p>
// //         </div>

// //         <div className="status-card">
// //           <div className="status-card-header">
// //             <div className="status-card-info">
// //               <Battery className="icon-orange" size={20} />
// //               <span className="status-card-title">Battery</span>
// //             </div>
// //             <div className={`status-indicator ${batteryLevel > 20 ? 'status-indicator-green' : 'status-indicator-red'}`}></div>
// //           </div>
// //           <p className={`status-text ${batteryLevel > 20 ? 'status-text-green' : 'status-text-red'}`}>
// //             {batteryLevel}%
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomeScreen;
// import React from 'react';
// import { Shield, User, MapPin, Wifi, WifiOff, Navigation, Signal, Battery } from 'lucide-react';
// import CitySelector from './CitySelector';
// import './HomeScreen.css'; // Import the dedicated CSS file

// const HomeScreen = ({ 
//   currentCityData, 
//   geofenceStatus, 
//   geofenceEnabled, 
//   isOnline, 
//   batteryLevel, 
//   signalStrength,
//   showCitySelector,
//   setShowCitySelector,
//   handleCityChange,
//   cities,
//   selectedCity
// }) => {
//   const getGeofenceStatusColor = () => {
//     switch (geofenceStatus) {
//       case 'safe': return 'geofence-safe';
//       case 'buffer': return 'geofence-buffer';
//       case 'caution': return 'geofence-caution';
//       case 'danger': return 'geofence-danger';
//       default: return 'geofence-safe';
//     }
//   };

//   const getGeofenceStatusText = () => {
//     switch (geofenceStatus) {
//       case 'safe': return '✓ SAFE ZONE';
//       case 'buffer': return '● BUFFER ZONE';
//       case 'caution': return '⚠ CAUTION ZONE';
//       case 'danger': return '🚨 DANGER ZONE';
//       default: return '✓ SAFE ZONE';
//     }
//   };

//   return (
//     <div className="home-screen">
//       {/* Hero Card */}
//       <div className="hero-card">
//         <div className="hero-header">
//           <div>
//             <h1 className="hero-title">Welcome Back!</h1>
//             <p className="hero-subtitle">Your safety is our priority</p>
//           </div>
//           <div className="hero-icon-container">
//             <Shield className="icon-white" size={28} />
//           </div>
//         </div>
        
//         <div className="user-card">
//           <div className="user-info">
//             <div className="user-avatar">
//               <User size={24} />
//             </div>
//             <div>
//               <h2 className="user-name">John Doe</h2>
//               <p className="user-id">Tourist ID: TR-2025-001234</p>
//               <p className="user-validity">Valid until: Mar 15, 2025</p>
//               <img src=''></img>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* City Selector */}
//       <CitySelector 
//         showCitySelector={showCitySelector}
//         setShowCitySelector={setShowCitySelector}
//         currentCityData={currentCityData}
//         cities={cities}
//         selectedCity={selectedCity}
//         handleCityChange={handleCityChange}
//       />

//       {/* Location Card */}
//       <div className="location-card">
//         <div className="location-header">
//           <div className="location-info">
//             <MapPin className="icon-green" size={24} />
//             <div>
//               <h3 className="location-title">Current Location</h3>
//               <p className="location-text">{currentCityData.name}</p>
//             </div>
//           </div>
//           <div className={`safe-zone-badge ${getGeofenceStatusColor()}`}>
//             {getGeofenceStatusText()}
//           </div>
//         </div>
        
//         <div className="coordinates-container">
//           <div className="coordinates-grid">
//             <div>
//               <p className="coordinate-value">{currentCityData.lat.toFixed(4)}°</p>
//               <p className="coordinate-label">Latitude</p>
//             </div>
//             <div>
//               <p className="coordinate-value">{currentCityData.lng.toFixed(4)}°</p>
//               <p className="coordinate-label">Longitude</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Emergency Status Cards */}
//       <div className="status-grid">
//         <div className="status-card">
//           <div className="status-card-header">
//             <div className="status-card-info">
//               {isOnline ? <Wifi className="icon-green" size={20} /> : <WifiOff className="icon-red" size={20} />}
//               <span className="status-card-title">Network</span>
//             </div>
//             <div className={`status-indicator ${isOnline ? 'status-indicator-green' : 'status-indicator-red'} animate-pulse`}></div>
//           </div>
//           <p className={`status-text ${isOnline ? 'status-text-green' : 'status-text-red'}`}>
//             {isOnline ? 'Connected' : 'Offline'}
//           </p>
//         </div>

//         <div className="status-card">
//           <div className="status-card-header">
//             <div className="status-card-info">
//               <Navigation className="icon-purple" size={20} />
//               <span className="status-card-title">Geofence</span>
//             </div>
//             <div className={`status-indicator ${geofenceEnabled ? 'status-indicator-green' : 'status-indicator-gray'} animate-pulse`}></div>
//           </div>
//           <p className={`status-text ${geofenceEnabled ? 'status-text-green' : 'status-text-gray'}`}>
//             {geofenceEnabled ? 'Active' : 'Disabled'}
//           </p>
//         </div>

//         <div className="status-card">
//           <div className="status-card-header">
//             <div className="status-card-info">
//               <Signal className="icon-blue" size={20} />
//               <span className="status-card-title">Signal</span>
//             </div>
//             <div className="signal-bars">
//               {[...Array(4)].map((_, i) => (
//                 <div
//                   key={i}
//                   className={`signal-bar ${i < signalStrength ? 'signal-bar-active' : 'signal-bar-inactive'}`}
//                   style={{backgroundColor: i < signalStrength ? '#3b82f6' : '#d1d5db'}}
//                 />
//               ))}
//             </div>
//           </div>
//           <p className="status-text status-text-blue">
//             {signalStrength}/4 bars
//           </p>
//         </div>

//         <div className="status-card">
//           <div className="status-card-header">
//             <div className="status-card-info">
//               <Battery className="icon-orange" size={20} />
//               <span className="status-card-title">Battery</span>
//             </div>
//             <div className={`status-indicator ${batteryLevel > 20 ? 'status-indicator-green' : 'status-indicator-red'}`}></div>
//           </div>
//           <p className={`status-text ${batteryLevel > 20 ? 'status-text-green' : 'status-text-red'}`}>
//             {batteryLevel}%
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeScreen;
// import React, { useState, useEffect } from 'react';
// import { Shield, User, MapPin, Wifi, WifiOff, Navigation, Signal, Battery, ChevronDown, Bell, Settings, Map, X, ZoomIn, ZoomOut, Locate } from 'lucide-react';

// // Mock MapModal component
// const MapModal = ({ showMap, setShowMap, currentCityData, geofenceStatus }) => {
//   if (!showMap) return null;
  
//   const [mapZoom, setMapZoom] = useState(12);
//   const [mapCenter, setMapCenter] = useState({ lat: currentCityData.lat, lng: currentCityData.lng });
  
//   const geofenceZones = [
//     { name: 'Tourist District', status: 'safe', radius: 500 },
//     { name: 'Shopping Area', status: 'safe', radius: 300 },
//     { name: 'Buffer Zone', status: 'buffer', radius: 800 },
//     { name: 'Caution Area', status: 'caution', radius: 200 }
//   ];
  
//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.8)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 2000,
//       backdropFilter: 'blur(10px)'
//     }}>
//       <div style={{
//         background: 'white',
//         borderRadius: '24px',
//         width: '90vw',
//         height: '85vh',
//         maxWidth: '1200px',
//         boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         {/* Map Header */}
//         <div style={{
//           padding: '24px',
//           borderBottom: '1px solid #e5e7eb',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           background: 'linear-gradient(135deg, #667eea, #764ba2)',
//           color: 'white'
//         }}>
//           <div>
//             <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, marginBottom: '4px' }}>Live Location Map</h2>
//             <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>{currentCityData.name}</p>
//           </div>
//           <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//             <div style={{
//               background: 'rgba(255, 255, 255, 0.2)',
//               padding: '8px 16px',
//               borderRadius: '20px',
//               fontSize: '14px',
//               fontWeight: '600'
//             }}>
//               Zoom: {mapZoom}x
//             </div>
//             <button 
//               onClick={() => setShowMap(false)}
//               style={{
//                 background: 'rgba(255, 255, 255, 0.2)',
//                 border: 'none',
//                 borderRadius: '12px',
//                 padding: '12px',
//                 color: 'white',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Map Controls */}
//         <div style={{
//           position: 'absolute',
//           top: '100px',
//           right: '24px',
//           zIndex: 10,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '8px'
//         }}>
//           <button 
//             onClick={() => setMapZoom(Math.min(mapZoom + 1, 20))}
//             style={{
//               background: 'white',
//               border: '1px solid #d1d5db',
//               borderRadius: '8px',
//               padding: '12px',
//               cursor: 'pointer',
//               boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//           >
//             <ZoomIn size={16} />
//           </button>
//           <button 
//             onClick={() => setMapZoom(Math.max(mapZoom - 1, 1))}
//             style={{
//               background: 'white',
//               border: '1px solid #d1d5db',
//               borderRadius: '8px',
//               padding: '12px',
//               cursor: 'pointer',
//               boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//           >
//             <ZoomOut size={16} />
//           </button>
//           <button 
//             onClick={() => setMapCenter({ lat: currentCityData.lat, lng: currentCityData.lng })}
//             style={{
//               background: '#3b82f6',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               padding: '12px',
//               cursor: 'pointer',
//               boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//           >
//             <Locate size={16} />
//           </button>
//         </div>

//         {/* Dummy Map Area */}
//         <div style={{
//           flex: 1,
//           position: 'relative',
//           background: 'linear-gradient(45deg, #e5f3ff 0%, #b3e5fc 25%, #81d4fa 50%, #4fc3f7 75%, #29b6f6 100%)',
//           overflow: 'hidden'
//         }}>
//           {/* Grid Pattern */}
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//             `,
//             backgroundSize: '50px 50px',
//             opacity: 0.3
//           }} />

//           {/* Streets */}
//           <div style={{
//             position: 'absolute',
//             top: '40%',
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: '#6b7280',
//             opacity: 0.6
//           }} />
//           <div style={{
//             position: 'absolute',
//             top: '60%',
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: '#6b7280',
//             opacity: 0.6
//           }} />
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             bottom: 0,
//             left: '30%',
//             width: '4px',
//             background: '#6b7280',
//             opacity: 0.6
//           }} />
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             bottom: 0,
//             left: '70%',
//             width: '4px',
//             background: '#6b7280',
//             opacity: 0.6
//           }} />

//           {/* Geofence Zones */}
//           {geofenceZones.map((zone, index) => (
//             <div
//               key={index}
//               style={{
//                 position: 'absolute',
//                 top: `${20 + index * 15}%`,
//                 left: `${15 + index * 20}%`,
//                 width: `${zone.radius / 10}px`,
//                 height: `${zone.radius / 10}px`,
//                 borderRadius: '50%',
//                 background: zone.status === 'safe' ? 'rgba(34, 197, 94, 0.2)' : 
//                            zone.status === 'buffer' ? 'rgba(251, 191, 36, 0.2)' :
//                            'rgba(239, 68, 68, 0.2)',
//                 border: `3px solid ${zone.status === 'safe' ? '#22c55e' : 
//                                    zone.status === 'buffer' ? '#fbbf24' : '#ef4444'}`,
//                 transform: 'translate(-50%, -50%)',
//                 animation: 'pulse 2s ease-in-out infinite'
//               }}
//             />
//           ))}

//           {/* Current Location Pin */}
//           <div style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             zIndex: 5
//           }}>
//             <div style={{
//               width: '20px',
//               height: '20px',
//               background: '#ef4444',
//               borderRadius: '50%',
//               border: '4px solid white',
//               boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
//               animation: 'bounce 1s ease-in-out infinite'
//             }} />
//             <div style={{
//               position: 'absolute',
//               top: '-40px',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               background: '#1f2937',
//               color: 'white',
//               padding: '8px 12px',
//               borderRadius: '8px',
//               fontSize: '12px',
//               fontWeight: '600',
//               whiteSpace: 'nowrap',
//               boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
//             }}>
//               You are here
//               <div style={{
//                 position: 'absolute',
//                 top: '100%',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: 0,
//                 height: 0,
//                 borderLeft: '6px solid transparent',
//                 borderRight: '6px solid transparent',
//                 borderTop: '6px solid #1f2937'
//               }} />
//             </div>
//           </div>

//           {/* Points of Interest */}
//           <div style={{
//             position: 'absolute',
//             top: '30%',
//             left: '60%',
//             transform: 'translate(-50%, -50%)'
//           }}>
//             <div style={{
//               width: '12px',
//               height: '12px',
//               background: '#10b981',
//               borderRadius: '50%',
//               border: '2px solid white',
//               boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
//             }} />
//           </div>
//           <div style={{
//             position: 'absolute',
//             top: '70%',
//             left: '40%',
//             transform: 'translate(-50%, -50%)'
//           }}>
//             <div style={{
//               width: '12px',
//               height: '12px',
//               background: '#3b82f6',
//               borderRadius: '50%',
//               border: '2px solid white',
//               boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
//             }} />
//           </div>
//         </div>

//         {/* Map Legend */}
//         <div style={{
//           position: 'absolute',
//           bottom: '24px',
//           left: '24px',
//           background: 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(10px)',
//           padding: '16px',
//           borderRadius: '12px',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//           border: '1px solid rgba(255, 255, 255, 0.2)'
//         }}>
//           <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Legend</h4>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%' }} />
//               <span style={{ fontSize: '12px', color: '#6b7280' }}>Safe Zone</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <div style={{ width: '12px', height: '12px', background: '#fbbf24', borderRadius: '50%' }} />
//               <span style={{ fontSize: '12px', color: '#6b7280' }}>Buffer Zone</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }} />
//               <span style={{ fontSize: '12px', color: '#6b7280' }}>Your Location</span>
//             </div>
//           </div>
//         </div>

//         {/* Coordinates Display */}
//         <div style={{
//           position: 'absolute',
//           bottom: '24px',
//           right: '24px',
//           background: 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(10px)',
//           padding: '16px',
//           borderRadius: '12px',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//           border: '1px solid rgba(255, 255, 255, 0.2)'
//         }}>
//           <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Coordinates</div>
//           <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
//             {currentCityData.lat.toFixed(6)}°, {currentCityData.lng.toFixed(6)}°
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
//           50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); }
//         }
//         @keyframes bounce {
//           0%, 100% { transform: translate(-50%, -50%) translateY(0); }
//           50% { transform: translate(-50%, -50%) translateY(-4px); }
//         }
//       `}</style>
//     </div>
//   );
// };
// const CitySelector = ({ showCitySelector, setShowCitySelector, currentCityData, cities, selectedCity, handleCityChange }) => {
//   if (!showCitySelector) return null;
  
//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.5)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000
//     }}>
//       <div style={{
//         background: 'white',
//         padding: '24px',
//         borderRadius: '20px',
//         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
//         minWidth: '280px'
//       }}>
//         <h3>Select City</h3>
//         {cities?.map(city => (
//           <button 
//             key={city.id} 
//             onClick={() => handleCityChange(city)}
//             style={{
//               width: '100%',
//               padding: '12px',
//               border: 'none',
//               background: selectedCity === city.id ? '#f3f4f6' : 'transparent',
//               textAlign: 'left',
//               cursor: 'pointer',
//               borderRadius: '8px',
//               marginBottom: '8px'
//             }}
//           >
//             {city.name}
//           </button>
//         ))}
//         <button 
//           onClick={() => setShowCitySelector(false)}
//           style={{
//             width: '100%',
//             padding: '12px',
//             background: '#667eea',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             marginTop: '16px'
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const HomeScreen = () => {
//   // Mock data and state
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [showCitySelector, setShowCitySelector] = useState(false);
//   const [showMap, setShowMap] = useState(false);
  
//   // Mock props with realistic data
//   const currentCityData = { name: "Chennai, Kattankulathur", lat: 12.8229, lng: 80.0440 };
//   const geofenceStatus = "safe";
//   const geofenceEnabled = true;
//   const isOnline = true;
//   const batteryLevel = 78;
//   const signalStrength = 3;
//   const cities = [
//     { id: 1, name: "Bangkok, Thailand" },
//     { id: 2, name: "Phuket, Thailand" },
//     { id: 3, name: "Chiang Mai, Thailand" }
//   ];
//   const selectedCity = 1;

//   const handleCityChange = (city) => {
//     setShowCitySelector(false);
//   };

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGeofenceStatusColor = () => {
//     switch (geofenceStatus) {
//       case 'safe': return { background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: 'white' };
//       case 'buffer': return { background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: 'white' };
//       case 'caution': return { background: 'linear-gradient(135deg, #fb923c, #ea580c)', color: 'white' };
//       case 'danger': return { background: 'linear-gradient(135deg, #f87171, #dc2626)', color: 'white' };
//       default: return { background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: 'white' };
//     }
//   };

//   const getGeofenceStatusText = () => {
//     switch (geofenceStatus) {
//       case 'safe': return '✓ SAFE ZONE';
//       case 'buffer': return '● BUFFER ZONE';
//       case 'caution': return '⚠ CAUTION ZONE';
//       case 'danger': return '🚨 DANGER ZONE';
//       default: return '✓ SAFE ZONE';
//     }
//   };

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const containerStyle = {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     gridTemplateRows: 'auto auto auto auto',
//     gap: '24px',
//     padding: '32px',
//     width: '100vw',
//     height: '100vh',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//     boxSizing: 'border-box',
//     overflow: 'auto'
//   };

//   const headerStyle = {
//     gridColumn: '1 / -1',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '0'
//   };

//   const heroCardStyle = {
//     gridColumn: '1 / 3',
//     gridRow: '2',
//     position: 'relative',
//     overflow: 'hidden',
//     borderRadius: '24px',
//     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
//     backdropFilter: 'blur(20px)',
//     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
//     padding: '40px',
//     color: 'white',
//     minHeight: '300px'
//   };

//   const locationCardStyle = {
//     gridColumn: '3',
//     gridRow: '2',
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(20px)',
//     padding: '32px',
//     borderRadius: '20px',
//     border: '1px solid rgba(255, 255, 255, 0.3)',
//     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//     transition: 'all 0.3s ease',
//     minHeight: '300px'
//   };

//   const statusCardStyle = {
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(20px)',
//     padding: '28px',
//     borderRadius: '20px',
//     border: '1px solid rgba(255, 255, 255, 0.3)',
//     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//     transition: 'all 0.3s ease',
//     position: 'relative',
//     minHeight: '180px',
//     display: 'flex',
//     flexDirection: 'column'
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Enhanced Header */}
//       <div style={headerStyle}>
//         <div style={{ color: 'white', textAlign: 'left' }}>
//           <div style={{ fontSize: '48px', fontWeight: '300', lineHeight: '1' }}>
//             {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//           </div>
//           <div style={{ fontSize: '18px', opacity: '0.8', marginTop: '8px' }}>
//             {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//           </div>
//         </div>
//         <div style={{ display: 'flex', gap: '12px' }}>
//           <button style={{
//             background: 'rgba(255, 255, 255, 0.2)',
//             border: 'none',
//             borderRadius: '12px',
//             padding: '12px',
//             color: 'white',
//             cursor: 'pointer',
//             position: 'relative'
//           }}>
//             <Bell size={20} />
//             <span style={{
//               position: 'absolute',
//               top: '-4px',
//               right: '-4px',
//               background: '#ff4757',
//               color: 'white',
//               borderRadius: '50%',
//               width: '18px',
//               height: '18px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '10px',
//               fontWeight: 'bold'
//             }}>2</span>
//           </button>
//           <button style={{
//             background: 'rgba(255, 255, 255, 0.2)',
//             border: 'none',
//             borderRadius: '12px',
//             padding: '12px',
//             color: 'white',
//             cursor: 'pointer'
//           }}>
//             <Settings size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Enhanced Hero Card */}
//       <div style={heroCardStyle}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-start',
//           marginBottom: '24px'
//         }}>
//           <div>
//             <h1 style={{
//               fontSize: '42px',
//               fontWeight: '700',
//               marginBottom: '12px',
//               textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
//             }}>
//               {getGreeting()}!
//             </h1>
//             <p style={{ fontSize: '18px', opacity: '0.9', fontWeight: '400', margin: 0 }}>
//               Stay safe and explore with confidence
//             </p>
//           </div>
//           <div style={{
//             background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
//             padding: '20px',
//             borderRadius: '20px',
//             boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             <Shield color="white" size={32} />
//           </div>
//         </div>
        
//         <div style={{
//           background: 'rgba(255, 255, 255, 0.15)',
//           padding: '24px',
//           borderRadius: '20px',
//           backdropFilter: 'blur(15px)',
//           border: '1px solid rgba(255, 255, 255, 0.2)'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//             <div style={{
//               position: 'relative',
//               background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
//               padding: '16px',
//               borderRadius: '50%',
//               boxShadow: '0 8px 24px rgba(78, 205, 196, 0.4)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>
//               <User size={28} color="white" />
//               <div style={{
//                 position: 'absolute',
//                 bottom: '2px',
//                 right: '2px',
//                 width: '14px',
//                 height: '14px',
//                 background: '#22c55e',
//                 border: '3px solid white',
//                 borderRadius: '50%'
//               }}></div>
//             </div>
//             <div style={{ flex: 1 }}>
//               <h2 style={{
//                 fontSize: '22px',
//                 fontWeight: '700',
//                 marginBottom: '6px',
//                 color: 'white'
//               }}>
//                 John Doe
//               </h2>
//               <p style={{
//                 fontSize: '14px',
//                 opacity: '0.8',
//                 color: 'white',
//                 margin: '0 0 8px 0'
//               }}>
//                 Tourist ID: TR-2025-001234
//               </p>
//               <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//                 <span style={{
//                   fontSize: '13px',
//                   opacity: '0.7',
//                   color: 'white'
//                 }}>
//                   Valid until:
//                 </span>
//                 <span style={{
//                   fontSize: '13px',
//                   fontWeight: '600',
//                   background: 'rgba(34, 197, 94, 0.2)',
//                   padding: '4px 10px',
//                   borderRadius: '12px',
//                   color: '#22c55e',
//                   border: '1px solid rgba(34, 197, 94, 0.3)'
//                 }}>
//                   Mar 15, 2025
//                 </span>
//               </div>
//             </div>
//             <button style={{
//               background: 'rgba(255, 255, 255, 0.2)',
//               border: '2px solid rgba(255, 255, 255, 0.3)',
//               borderRadius: '12px',
//               padding: '12px',
//               cursor: 'pointer',
//               color: 'white',
//               fontWeight: 'bold',
//               fontSize: '12px',
//               width: '56px',
//               height: '56px'
//             }}>
//               QR
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* City Selector Card */}
//       <div 
//         onClick={() => setShowCitySelector(true)}
//         style={{
//           gridColumn: '1 / -1',
//           gridRow: '3',
//           background: 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(20px)',
//           padding: '24px',
//           borderRadius: '20px',
//           border: '1px solid rgba(255, 255, 255, 0.3)',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '20px',
//           maxHeight: '80px'
//         }}
//       >
//         <MapPin color="#3b82f6" size={20} />
//         <div style={{ flex: 1 }}>
//           <div style={{
//             fontSize: '13px',
//             color: '#6b7280',
//             fontWeight: '500',
//             marginBottom: '4px'
//           }}>
//             Current Destination
//           </div>
//           <div style={{
//             fontSize: '18px',
//             fontWeight: '700',
//             color: '#1f2937'
//           }}>
//             {currentCityData.name}
//           </div>
//         </div>
//         <ChevronDown color="#6b7280" size={20} />
//       </div>

//       <CitySelector 
//         showCitySelector={showCitySelector}
//         setShowCitySelector={setShowCitySelector}
//         currentCityData={currentCityData}
//         cities={cities}
//         selectedCity={selectedCity}
//         handleCityChange={handleCityChange}
//       />

//       <MapModal 
//         showMap={showMap}
//         setShowMap={setShowMap}
//         currentCityData={currentCityData}
//         geofenceStatus={geofenceStatus}
//       />

//       {/* Enhanced Location Card */}
//       <div style={{
//         ...locationCardStyle,
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '20px'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <div style={{
//               background: 'linear-gradient(135deg, #10b981, #059669)',
//               padding: '12px',
//               borderRadius: '50%',
//               boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>
//               <MapPin color="white" size={24} />
//             </div>
//             <div>
//               <h3 style={{
//                 fontSize: '20px',
//                 fontWeight: '700',
//                 marginBottom: '4px',
//                 color: '#1f2937'
//               }}>
//                 Live Location
//               </h3>
//               <p style={{
//                 color: '#6b7280',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 margin: 0
//               }}>
//                 Real-time GPS tracking
//               </p>
//             </div>
//           </div>
//           <div style={{
//             ...getGeofenceStatusColor(),
//             padding: '12px 18px',
//             borderRadius: '25px',
//             fontSize: '12px',
//             fontWeight: '700',
//             textTransform: 'uppercase',
//             letterSpacing: '0.5px',
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
//           }}>
//             {getGeofenceStatusText()}
//           </div>
//         </div>
        
//         <div style={{ marginTop: '20px' }}>
//           <button 
//             onClick={() => setShowMap(true)}
//             style={{
//             background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
//             color: 'white',
//             border: 'none',
//             padding: '12px 20px',
//             borderRadius: '12px',
//             fontSize: '14px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             marginBottom: '16px',
//             boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
//           }}>
//             <Map size={16} />
//             View on Map
//           </button>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: '20px'
//           }}>
//             <div style={{
//               textAlign: 'center',
//               background: 'rgba(59, 130, 246, 0.1)',
//               padding: '16px',
//               borderRadius: '16px',
//               border: '1px solid rgba(59, 130, 246, 0.2)'
//             }}>
//               <p style={{
//                 fontSize: '18px',
//                 fontWeight: '800',
//                 color: '#1f2937',
//                 marginBottom: '6px'
//               }}>
//                 {currentCityData.lat.toFixed(6)}°
//               </p>
//               <p style={{
//                 fontSize: '12px',
//                 color: '#6b7280',
//                 fontWeight: '600',
//                 textTransform: 'uppercase',
//                 letterSpacing: '0.5px',
//                 margin: 0
//               }}>
//                 Latitude
//               </p>
//             </div>
//             <div style={{
//               textAlign: 'center',
//               background: 'rgba(59, 130, 246, 0.1)',
//               padding: '16px',
//               borderRadius: '16px',
//               border: '1px solid rgba(59, 130, 246, 0.2)'
//             }}>
//               <p style={{
//                 fontSize: '18px',
//                 fontWeight: '800',
//                 color: '#1f2937',
//                 marginBottom: '6px'
//               }}>
//                 {currentCityData.lng.toFixed(6)}°
//               </p>
//               <p style={{
//                 fontSize: '12px',
//                 color: '#6b7280',
//                 fontWeight: '600',
//                 textTransform: 'uppercase',
//                 letterSpacing: '0.5px',
//                 margin: 0
//               }}>
//                 Longitude
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Status Section */}
//       <div style={{ 
//         gridColumn: '1 / -1',
//         gridRow: '4',
//         marginTop: '0'
//       }}>
//         <h3 style={{
//           color: 'white',
//           fontSize: '20px',
//           fontWeight: '700',
//           marginBottom: '16px',
//           textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
//         }}>
//           System Status
//         </h3>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(4, 1fr)',
//           gap: '24px'
//         }}>
//           {/* Network Card */}
//           <div style={statusCardStyle}>
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: '3px',
//               background: 'linear-gradient(90deg, #667eea, #764ba2)',
//               borderRadius: '20px 20px 0 0'
//             }}></div>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <div style={{
//                   padding: '8px',
//                   borderRadius: '12px',
//                   background: 'rgba(0, 0, 0, 0.05)'
//                 }}>
//                   {isOnline ? <Wifi color="#10b981" size={20} /> : <WifiOff color="#ef4444" size={20} />}
//                 </div>
//                 <span style={{
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   color: '#6b7280',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.5px'
//                 }}>
//                   Network
//                 </span>
//               </div>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: isOnline ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #f87171, #dc2626)',
//                 boxShadow: isOnline ? '0 0 15px rgba(34, 197, 94, 0.5)' : '0 0 15px rgba(220, 38, 38, 0.5)'
//               }}></div>
//             </div>
//             <p style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               margin: '0 0 8px 0',
//               color: isOnline ? '#16a34a' : '#dc2626'
//             }}>
//               {isOnline ? 'Connected' : 'Offline'}
//             </p>
//             <div style={{
//               fontSize: '12px',
//               color: '#9ca3af',
//               fontWeight: '500'
//             }}>
//               {isOnline ? '4G LTE • Strong Signal' : 'No Connection'}
//             </div>
//           </div>

//           {/* Geofence Card */}
//           <div style={statusCardStyle}>
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: '3px',
//               background: 'linear-gradient(90deg, #667eea, #764ba2)',
//               borderRadius: '20px 20px 0 0'
//             }}></div>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <div style={{
//                   padding: '8px',
//                   borderRadius: '12px',
//                   background: 'rgba(0, 0, 0, 0.05)'
//                 }}>
//                   <Navigation color="#8b5cf6" size={20} />
//                 </div>
//                 <span style={{
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   color: '#6b7280',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.5px'
//                 }}>
//                   Geofence
//                 </span>
//               </div>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: geofenceEnabled ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
//                 boxShadow: geofenceEnabled ? '0 0 15px rgba(34, 197, 94, 0.5)' : '0 0 15px rgba(156, 163, 175, 0.3)'
//               }}></div>
//             </div>
//             <p style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               margin: '0 0 8px 0',
//               color: geofenceEnabled ? '#16a34a' : '#6b7280'
//             }}>
//               {geofenceEnabled ? 'Active' : 'Disabled'}
//             </p>
//             <div style={{
//               fontSize: '12px',
//               color: '#9ca3af',
//               fontWeight: '500'
//             }}>
//               {geofenceEnabled ? 'Monitoring boundaries' : 'Not monitoring'}
//             </div>
//           </div>

//           {/* Signal Card */}
//           <div style={statusCardStyle}>
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: '3px',
//               background: 'linear-gradient(90deg, #667eea, #764ba2)',
//               borderRadius: '20px 20px 0 0'
//             }}></div>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <div style={{
//                   padding: '8px',
//                   borderRadius: '12px',
//                   background: 'rgba(0, 0, 0, 0.05)'
//                 }}>
//                   <Signal color="#3b82f6" size={20} />
//                 </div>
//                 <span style={{
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   color: '#6b7280',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.5px'
//                 }}>
//                   Signal
//                 </span>
//               </div>
//               <div style={{
//                 display: 'flex',
//                 gap: '3px',
//                 alignItems: 'end',
//                 height: '16px'
//               }}>
//                 {[6, 8, 10, 12].map((height, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       width: '4px',
//                       height: `${height}px`,
//                       background: i < signalStrength ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : '#d1d5db',
//                       borderRadius: '2px',
//                       boxShadow: i < signalStrength ? '0 0 8px rgba(59, 130, 246, 0.4)' : 'none'
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//             <p style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               margin: '0 0 8px 0',
//               color: '#2563eb'
//             }}>
//               {signalStrength}/4 bars
//             </p>
//             <div style={{
//               fontSize: '12px',
//               color: '#9ca3af',
//               fontWeight: '500'
//             }}>
//               {signalStrength >= 3 ? 'Excellent' : signalStrength >= 2 ? 'Good' : 'Fair'}
//             </div>
//           </div>

//           {/* Battery Card */}
//           <div style={statusCardStyle}>
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: '3px',
//               background: 'linear-gradient(90deg, #667eea, #764ba2)',
//               borderRadius: '20px 20px 0 0'
//             }}></div>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <div style={{
//                   padding: '8px',
//                   borderRadius: '12px',
//                   background: 'rgba(0, 0, 0, 0.05)'
//                 }}>
//                   <Battery color="#f59e0b" size={20} />
//                 </div>
//                 <span style={{
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   color: '#6b7280',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.5px'
//                 }}>
//                   Battery
//                 </span>
//               </div>
//               <div style={{
//                 width: '30px',
//                 height: '14px',
//                 border: '2px solid #d1d5db',
//                 borderRadius: '3px',
//                 position: 'relative',
//                 background: '#f3f4f6'
//               }}>
//                 <div style={{
//                   position: 'absolute',
//                   top: '4px',
//                   right: '-4px',
//                   width: '2px',
//                   height: '6px',
//                   background: '#d1d5db',
//                   borderRadius: '0 2px 2px 0'
//                 }}></div>
//                 <div style={{
//                   height: '100%',
//                   width: `${batteryLevel}%`,
//                   background: batteryLevel > 20 ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #f87171, #dc2626)',
//                   borderRadius: '1px',
//                   transition: 'width 0.3s ease'
//                 }}></div>
//               </div>
//             </div>
//             <p style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               margin: '0 0 8px 0',
//               color: batteryLevel > 20 ? '#16a34a' : '#dc2626'
//             }}>
//               {batteryLevel}%
//             </p>
//             <div style={{
//               fontSize: '12px',
//               color: '#9ca3af',
//               fontWeight: '500'
//             }}>
//               {batteryLevel > 50 ? 'Good' : batteryLevel > 20 ? 'Low' : 'Critical'}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeScreen;
import React, { useState, useEffect } from 'react';
import { Shield, User, MapPin, Wifi, WifiOff, Navigation, Signal, Battery, ChevronDown, Bell, Settings, Map } from 'lucide-react';
import GoogleMapsComponent from './GoogleMapsComponent'; // Import your existing GoogleMapsComponent

const CitySelector = ({ showCitySelector, setShowCitySelector, currentCityData, cities, selectedCity, handleCityChange }) => {
  if (!showCitySelector) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        minWidth: '280px'
      }}>
        <h3>Select City</h3>
        {cities?.map(city => (
          <button 
            key={city.id} 
            onClick={() => handleCityChange(city)}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              background: selectedCity === city.id ? '#f3f4f6' : 'transparent',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '8px',
              marginBottom: '8px'
            }}
          >
            {city.name}
          </button>
        ))}
        <button 
          onClick={() => setShowCitySelector(false)}
          style={{
            width: '100%',
            padding: '12px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const HomeScreen = ({ 
  currentCityData, 
  geofenceStatus, 
  geofenceEnabled, 
  isOnline, 
  batteryLevel, 
  signalStrength, 
  selectedCity, 
  showCitySelector, 
  setShowCitySelector, 
  handleCityChange, 
  cities, 
  backendConnected,
  locationData 
}) => {
  // State for map visibility
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMap, setShowMap] = useState(false);

  const handleCityChangeWrapper = (city) => {
    setShowCitySelector(false);
    if (handleCityChange) {
      handleCityChange(city);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGeofenceStatusColor = () => {
    switch (geofenceStatus) {
      case 'safe': return { background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: 'white' };
      case 'buffer': return { background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: 'white' };
      case 'caution': return { background: 'linear-gradient(135deg, #fb923c, #ea580c)', color: 'white' };
      case 'danger': return { background: 'linear-gradient(135deg, #f87171, #dc2626)', color: 'white' };
      default: return { background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: 'white' };
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

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto auto auto auto',
    gap: '24px',
    padding: '32px',
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
    overflow: 'auto'
  };

  const headerStyle = {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0'
  };

  const heroCardStyle = {
    gridColumn: '1 / 3',
    gridRow: '2',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(20px)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    padding: '40px',
    color: 'white',
    minHeight: '300px'
  };

  const locationCardStyle = {
    gridColumn: '3',
    gridRow: '2',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '32px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    minHeight: '300px'
  };

  const statusCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '28px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'column'
  };

  // Use locationData if available, otherwise fall back to currentCityData
  const displayLocation = locationData || currentCityData;

  return (
    <div style={containerStyle}>
      {/* Enhanced Header */}
      <div style={headerStyle}>
        <div style={{ color: 'white', textAlign: 'left' }}>
          <div style={{ fontSize: '48px', fontWeight: '300', lineHeight: '1' }}>
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ fontSize: '18px', opacity: '0.8', marginTop: '8px' }}>
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            color: 'white',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ff4757',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>2</span>
          </button>
          <button style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            color: 'white',
            cursor: 'pointer'
          }}>
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Enhanced Hero Card */}
      <div style={heroCardStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '12px',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
            }}>
              {getGreeting()}!
            </h1>
            <p style={{ fontSize: '18px', opacity: '0.9', fontWeight: '400', margin: 0 }}>
              Stay safe and explore with confidence
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield color="white" size={32} />
          </div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '24px',
          borderRadius: '20px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
              padding: '16px',
              borderRadius: '50%',
              boxShadow: '0 8px 24px rgba(78, 205, 196, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={28} color="white" />
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '14px',
                height: '14px',
                background: '#22c55e',
                border: '3px solid white',
                borderRadius: '50%'
              }}></div>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '6px',
                color: 'white'
              }}>
                John Doe
              </h2>
              <p style={{
                fontSize: '14px',
                opacity: '0.8',
                color: 'white',
                margin: '0 0 8px 0'
              }}>
                Tourist ID: TR-2025-001234
              </p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{
                  fontSize: '13px',
                  opacity: '0.7',
                  color: 'white'
                }}>
                  Valid until:
                </span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  background: 'rgba(34, 197, 94, 0.2)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                  Mar 15, 2025
                </span>
              </div>
            </div>
            <button style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              width: '56px',
              height: '56px'
            }}>
              QR
            </button>
          </div>
        </div>
      </div>

      {/* City Selector Card */}
      <div 
        onClick={() => setShowCitySelector(true)}
        style={{
          gridColumn: '1 / -1',
          gridRow: '3',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          maxHeight: '80px'
        }}
      >
        <MapPin color="#3b82f6" size={20} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '13px',
            color: '#6b7280',
            fontWeight: '500',
            marginBottom: '4px'
          }}>
            Current Destination
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1f2937'
          }}>
            {displayLocation.name || displayLocation.address || 'Unknown Location'}
          </div>
        </div>
        <ChevronDown color="#6b7280" size={20} />
      </div>

      <CitySelector 
        showCitySelector={showCitySelector}
        setShowCitySelector={setShowCitySelector}
        currentCityData={currentCityData}
        cities={cities}
        selectedCity={selectedCity}
        handleCityChange={handleCityChangeWrapper}
      />

      {/* Replace the mock MapModal with your GoogleMapsComponent */}
      <GoogleMapsComponent 
        showMap={showMap}
        setShowMap={setShowMap}
        currentCityData={currentCityData}
        geofenceStatus={geofenceStatus}
        backendConnected={backendConnected}
        locationData={locationData}
      />

      {/* Enhanced Location Card */}
      <div style={{
        ...locationCardStyle,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              padding: '12px',
              borderRadius: '50%',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MapPin color="white" size={24} />
            </div>
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '4px',
                color: '#1f2937'
              }}>
                Live Location
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                fontWeight: '500',
                margin: 0
              }}>
                Real-time GPS tracking
              </p>
            </div>
          </div>
          <div style={{
            ...getGeofenceStatusColor(),
            padding: '12px 18px',
            borderRadius: '25px',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            {getGeofenceStatusText()}
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => setShowMap(true)}
            style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
          }}>
            <Map size={16} />
            View on Google Maps
          </button>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            <div style={{
              textAlign: 'center',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <p style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '6px'
              }}>
                {displayLocation.lat ? displayLocation.lat.toFixed(6) : currentCityData.lat.toFixed(6)}°
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: 0
              }}>
                Latitude
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <p style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '6px'
              }}>
                {displayLocation.lng ? displayLocation.lng.toFixed(6) : currentCityData.lng.toFixed(6)}°
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: 0
              }}>
                Longitude
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Status Section */}
      <div style={{ 
        gridColumn: '1 / -1',
        gridRow: '4',
        marginTop: '0'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '16px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          System Status
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {/* Network Card */}
          <div style={statusCardStyle}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '20px 20px 0 0'
            }}></div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.05)'
                }}>
                  {isOnline ? <Wifi color="#10b981" size={20} /> : <WifiOff color="#ef4444" size={20} />}
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Network
                </span>
              </div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: isOnline ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #f87171, #dc2626)',
                boxShadow: isOnline ? '0 0 15px rgba(34, 197, 94, 0.5)' : '0 0 15px rgba(220, 38, 38, 0.5)'
              }}></div>
            </div>
            <p style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: isOnline ? '#16a34a' : '#dc2626'
            }}>
              {isOnline ? 'Connected' : 'Offline'}
            </p>
            <div style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              {isOnline ? '4G LTE • Strong Signal' : 'No Connection'}
            </div>
          </div>

          {/* Geofence Card */}
          <div style={statusCardStyle}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '20px 20px 0 0'
            }}></div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.05)'
                }}>
                  <Navigation color="#8b5cf6" size={20} />
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Geofence
                </span>
              </div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: geofenceEnabled ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
                boxShadow: geofenceEnabled ? '0 0 15px rgba(34, 197, 94, 0.5)' : '0 0 15px rgba(156, 163, 175, 0.3)'
              }}></div>
            </div>
            <p style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: geofenceEnabled ? '#16a34a' : '#6b7280'
            }}>
              {geofenceEnabled ? 'Active' : 'Disabled'}
            </p>
            <div style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              {geofenceEnabled ? 'Monitoring boundaries' : 'Not monitoring'}
            </div>
          </div>

          {/* Signal Card */}
          <div style={statusCardStyle}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '20px 20px 0 0'
            }}></div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.05)'
                }}>
                  <Signal color="#3b82f6" size={20} />
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Signal
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '3px',
                alignItems: 'end',
                height: '16px'
              }}>
                {[6, 8, 10, 12].map((height, i) => (
                  <div
                    key={i}
                    style={{
                      width: '4px',
                      height: `${height}px`,
                      background: i < signalStrength ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : '#d1d5db',
                      borderRadius: '2px',
                      boxShadow: i < signalStrength ? '0 0 8px rgba(59, 130, 246, 0.4)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
            <p style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: '#2563eb'
            }}>
              {signalStrength}/4 bars
            </p>
            <div style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              {signalStrength >= 3 ? 'Excellent' : signalStrength >= 2 ? 'Good' : 'Fair'}
            </div>
          </div>

          {/* Battery Card */}
          <div style={statusCardStyle}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '20px 20px 0 0'
            }}></div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.05)'
                }}>
                  <Battery color="#f59e0b" size={20} />
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Battery
                </span>
              </div>
              <div style={{
                width: '30px',
                height: '14px',
                border: '2px solid #d1d5db',
                borderRadius: '3px',
                position: 'relative',
                background: '#f3f4f6'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '-4px',
                  width: '2px',
                  height: '6px',
                  background: '#d1d5db',
                  borderRadius: '0 2px 2px 0'
                }}></div>
                <div style={{
                  height: '100%',
                  width: `${batteryLevel}%`,
                  background: batteryLevel > 20 ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #f87171, #dc2626)',
                  borderRadius: '1px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
            <p style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: batteryLevel > 20 ? '#16a34a' : '#dc2626'
            }}>
              {batteryLevel}%
            </p>
            <div style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              {batteryLevel > 50 ? 'Good' : batteryLevel > 20 ? 'Low' : 'Critical'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;