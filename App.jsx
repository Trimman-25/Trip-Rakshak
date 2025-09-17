// import React, { useState, useEffect } from 'react';
// import StatusBar from './StatusBar';
// import HomeScreen from './HomeScreen';
// import GeofencingScreen from './GeofencingScreen';
// import ContactsScreen from './ContactsScreen';
// import SettingsScreen from './SettingsScreen';
// import TranslatorScreen from './TranslatorScreen';
// import TabNavigation from './TabNavigation';
// import SOSModal from './SOSModal';
// import GeofenceAlert from './GeofenceAlert';
// import AboutUs from './AboutUs';
// import LocationScreen from './LocationScreen';
// import { cities, emergencyTypes } from './appData';
// import './index.css';

// const App = () => {
//     const [activeTab, setActiveTab] = useState('home');
//     const [isOnline, setIsOnline] = useState(true);
//     const [batteryLevel, setBatteryLevel] = useState(87);
//     const [signalStrength, setSignalStrength] = useState(4);
//     const [showSOSModal, setShowSOSModal] = useState(false);
//     const [sosCountdown, setSosCountdown] = useState(0);
//     const [sosActive, setSosActive] = useState(false);
//     const [selectedEmergencyType, setSelectedEmergencyType] = useState(null);
//     const [showCitySelector, setShowCitySelector] = useState(false);
//     const [selectedCity, setSelectedCity] = useState('shillong');
//     const [geofenceStatus, setGeofenceStatus] = useState('safe');
//     const [geofenceEnabled, setGeofenceEnabled] = useState(true);
//     const [showGeofenceAlert, setShowGeofenceAlert] = useState(false);
//     const [lastGeofenceAlert, setLastGeofenceAlert] = useState(null);
//     const [showAboutUs, setShowAboutUs] = useState(false);
    
//     const [locationData, setLocationData] = useState(null);
//     const [locationLoading, setLocationLoading] = useState(false);
//     const [locationError, setLocationError] = useState(null);
    
//     const [backendConnected, setBackendConnected] = useState(false);
//     const [emergencyContacts, setEmergencyContacts] = useState([]);
    
//     const [personalContacts, setPersonalContacts] = useState([
//         { id: 1, name: 'Mom', number: '+91-9876543210', relationship: 'Family' },
//         { id: 2, name: 'Dad', number: '+91-9876543211', relationship: 'Family' },
//     ]);
//     const [showAddContact, setShowAddContact] = useState(false);
//     const [editingContact, setEditingContact] = useState(null);
//     const [newContact, setNewContact] = useState({ name: '', number: '', relationship: '' });

//     const currentCityData = cities[selectedCity];

//     // Fetch location data from backend
//     const fetchLocationData = async () => {
//         if (!backendConnected) return;
        
//         setLocationLoading(true);
//         setLocationError(null);
        
//         try {
//             const response = await fetch("http://localhost:8080/api/location");
//             if (!response.ok) {
//                 if (response.status === 404) {
//                     throw new Error('No location data available yet');
//                 }
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setLocationData(data);
//         } catch (error) {
//             console.error("Error fetching location:", error);
//             setLocationError(error.message);
//         } finally {
//             setLocationLoading(false);
//         }
//     };

//     // Test backend connection and fetch initial data
//     useEffect(() => {
//         const testBackendConnection = async () => {
//             try {
//                 // Test health check endpoint
//                 const healthResponse = await fetch('http://localhost:8080/api/health');
//                 if (!healthResponse.ok) {
//                     throw new Error('Health check failed');
//                 }
//                 console.log('Backend connected successfully');
//                 setBackendConnected(true);
                
//                 // Fetch emergency contacts
//                 const contactsResponse = await fetch('http://localhost:8080/api/emergency-contacts');
//                 if (contactsResponse.ok) {
//                     const contactsData = await contactsResponse.json();
//                     setEmergencyContacts(contactsData.contacts);
//                 } else {
//                     console.warn('Failed to load emergency contacts.');
//                 }
                
//                 // Fetch initial location data
//                 await fetchLocationData();
//             } catch (error) {
//                 console.error('Backend connection failed:', error);
//                 setBackendConnected(false);
//             }
//         };

//         testBackendConnection();
//     }, []);

//     // Auto-refresh location data every 5 seconds when backend is connected
//     useEffect(() => {
//         if (!backendConnected) return;
//         const locationInterval = setInterval(fetchLocationData, 5000);
//         return () => clearInterval(locationInterval);
//     }, [backendConnected]);

//     // Simulate geofence status changes and send alerts to backend
//     useEffect(() => {
//         const geofenceInterval = setInterval(async () => {
//             const statuses = ['safe', 'buffer', 'caution', 'danger'];
//             const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
//             if (geofenceEnabled && randomStatus !== geofenceStatus) {
//                 setGeofenceStatus(randomStatus);
                
//                 if (randomStatus === 'danger' || randomStatus === 'caution') {
//                     const alertData = {
//                         type: randomStatus,
//                         time: new Date().toLocaleTimeString(),
//                         message: randomStatus === 'danger' 
//                             ? 'You have entered a danger zone!' 
//                             : 'Caution: You are approaching a restricted area'
//                     };
                    
//                     setShowGeofenceAlert(true);
//                     setLastGeofenceAlert(alertData);
                    
//                     if (backendConnected) {
//                         try {
//                             const geofenceData = {
//                                 status: randomStatus,
//                                 location: locationData || { lat: 0, lng: 0, address: 'Unknown' },
//                                 timestamp: new Date().toISOString(),
//                                 city: selectedCity
//                             };
                            
//                             await fetch('http://localhost:8080/api/geofence-alert', {
//                                 method: 'POST',
//                                 headers: { 'Content-Type': 'application/json' },
//                                 body: JSON.stringify(geofenceData)
//                             });
//                         } catch (error) {
//                             console.error('Failed to send geofence alert to backend:', error);
//                         }
//                     }
//                     setTimeout(() => setShowGeofenceAlert(false), 5000);
//                 }
//             }
//         }, 12000);
//         return () => clearInterval(geofenceInterval);
//     }, [geofenceStatus, geofenceEnabled, backendConnected, selectedCity, locationData]);

//     // Simulate network and battery status
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIsOnline(Math.random() > 0.3);
//             setSignalStrength(Math.floor(Math.random() * 5));
//             setBatteryLevel(prev => Math.max(10, prev - Math.floor(Math.random() * 3)));
//         }, 8000);
//         return () => clearInterval(interval);
//     }, []);

//     // SOS Countdown logic
//     useEffect(() => {
//         let interval;
//         if (sosCountdown > 0) {
//             interval = setInterval(() => {
//                 setSosCountdown(prev => (prev === 1 ? 0 : prev - 1));
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [sosCountdown]);

//     const startSOSCountdown = (emergencyType) => {
//         setSelectedEmergencyType(emergencyType);
//         setSosCountdown(3);
//     };

//     const cancelSOS = () => {
//         setSosCountdown(0);
//         setSelectedEmergencyType(null);
//     };

//     const activateSOS = async () => {
//         setSosActive(true);
//         setSosCountdown(0);
        
//         if (backendConnected) {
//             try {
//                 const sosData = {
//                     emergencyType: selectedEmergencyType,
//                     location: locationData || { lat: 0, lng: 0, address: 'Unknown' },
//                     contacts: personalContacts,
//                     timestamp: new Date().toISOString(),
//                     city: selectedCity
//                 };
                
//                 const response = await fetch('http://localhost:8080/api/sos-alert', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(sosData)
//                 });
                
//                 if (response.ok) {
//                     console.log('SOS alert sent successfully');
//                 } else {
//                     throw new Error('SOS alert failed');
//                 }
//             } catch (error) {
//                 console.error('Failed to send SOS alert to backend:', error);
//             }
//         }
//         setTimeout(() => {
//             setSosActive(false);
//             setSelectedEmergencyType(null);
//             setShowSOSModal(false);
//         }, 5000);
//     };

//     const handleCityChange = (cityKey) => {
//         setSelectedCity(cityKey);
//         setShowCitySelector(false);
//         setGeofenceStatus('safe');
//     };

//     // Contact management functions
//     const handleAddContact = () => {
//         if (newContact.name && newContact.number) {
//             const contact = { id: Date.now(), ...newContact };
//             setPersonalContacts([...personalContacts, contact]);
//             setNewContact({ name: '', number: '', relationship: '' });
//             setShowAddContact(false);
//         }
//     };

//     const handleEditContact = (contact) => {
//         setEditingContact(contact.id);
//         setNewContact({ ...contact });
//     };

//     const handleUpdateContact = () => {
//         setPersonalContacts(personalContacts.map(contact => 
//             contact.id === editingContact ? { ...newContact } : contact
//         ));
//         setEditingContact(null);
//         setNewContact({ name: '', number: '', relationship: '' });
//     };

//     const handleDeleteContact = (id) => {
//         setPersonalContacts(personalContacts.filter(contact => contact.id !== id));
//     };

//     const renderActiveScreen = () => {
//         const screenProps = {
//             currentCityData,
//             geofenceStatus,
//             geofenceEnabled,
//             setGeofenceEnabled,
//             isOnline,
//             batteryLevel,
//             signalStrength,
//             selectedCity,
//             showCitySelector,
//             setShowCitySelector,
//             handleCityChange,
//             personalContacts,
//             showAddContact,
//             setShowAddContact,
//             editingContact,
//             setEditingContact,
//             newContact,
//             setNewContact,
//             handleAddContact,
//             handleEditContact,
//             handleUpdateContact,
//             handleDeleteContact,
//             cities,
//             lastGeofenceAlert,
//             backendConnected,
//             emergencyContacts,
//             setShowAboutUs,
//             locationData,
//             locationLoading,
//             locationError,
//             fetchLocationData
//         };

//         switch (activeTab) {
//             case 'home': return <HomeScreen {...screenProps} />;
//             case 'geofencing': return <GeofencingScreen {...screenProps} />;
//             case 'contacts': return <ContactsScreen {...screenProps} />;
//             case 'settings': return <SettingsScreen {...screenProps} />;
//             case 'location': return <LocationScreen {...screenProps} />;
//             case 'translator': return <TranslatorScreen backendConnected={backendConnected} />;
//             default: return <HomeScreen {...screenProps} />;
//         }
//     };

//     return (
//         <div className="app-container">
//             <StatusBar 
//                 isOnline={isOnline && backendConnected}
//                 batteryLevel={batteryLevel}
//                 signalStrength={signalStrength}
//             />
            
//             {/* Backend connection indicator */}
//             {!backendConnected && (
//                 <div style={{ 
//                     backgroundColor: '#ff9800', 
//                     color: 'white', 
//                     padding: '8px', 
//                     textAlign: 'center',
//                     fontSize: '12px'
//                 }}>
//                     Backend disconnected - Running in offline mode
//                 </div>
//             )}
            
//             <div className="main-content">
//                 <GeofenceAlert 
//                     showGeofenceAlert={showGeofenceAlert}
//                     setShowGeofenceAlert={setShowGeofenceAlert}
//                     lastGeofenceAlert={lastGeofenceAlert}
//                     geofenceStatus={geofenceStatus}
//                 />
//                 {renderActiveScreen()}
//             </div>
            
//             <TabNavigation 
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//                 setShowSOSModal={setShowSOSModal}
//                 setShowAboutUs={setShowAboutUs}
//                 locationData={locationData}
//                 backendConnected={backendConnected}
//             />
            
//             <SOSModal 
//                 showSOSModal={showSOSModal}
//                 setShowSOSModal={setShowSOSModal}
//                 sosCountdown={sosCountdown}
//                 sosActive={sosActive}
//                 selectedEmergencyType={selectedEmergencyType}
//                 startSOSCountdown={startSOSCountdown}
//                 cancelSOS={cancelSOS}
//                 emergencyTypes={emergencyTypes}
//             />

//             {showAboutUs && (
//                 <AboutUs onClose={() => setShowAboutUs(false)} />
//             )}
//         </div>
//     );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import StatusBar from './StatusBar';
import HomeScreen from './HomeScreen';
import GeofencingScreen from './GeofencingScreen';
import ContactsScreen from './ContactsScreen';
import SettingsScreen from './SettingsScreen';
import TranslatorScreen from './TranslatorScreen';
import TabNavigation from './TabNavigation';
import SOSModal from './SOSModal';
import GeofenceAlert from './GeofenceAlert';
import AboutUs from './AboutUs';
import LocationScreen from './LocationScreen';
// Import your existing GoogleMapsComponent
import GoogleMapsComponent from './GoogleMapsComponent'; // Add this import
import { cities, emergencyTypes } from './appData';
import './index.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isOnline, setIsOnline] = useState(true);
    const [batteryLevel, setBatteryLevel] = useState(87);
    const [signalStrength, setSignalStrength] = useState(4);
    const [showSOSModal, setShowSOSModal] = useState(false);
    const [sosCountdown, setSosCountdown] = useState(0);
    const [sosActive, setSosActive] = useState(false);
    const [selectedEmergencyType, setSelectedEmergencyType] = useState(null);
    const [showCitySelector, setShowCitySelector] = useState(false);
    const [selectedCity, setSelectedCity] = useState('shillong');
    const [geofenceStatus, setGeofenceStatus] = useState('safe');
    const [geofenceEnabled, setGeofenceEnabled] = useState(true);
    const [showGeofenceAlert, setShowGeofenceAlert] = useState(false);
    const [lastGeofenceAlert, setLastGeofenceAlert] = useState(null);
    const [showAboutUs, setShowAboutUs] = useState(false);
    
    const [locationData, setLocationData] = useState(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState(null);
    
    const [backendConnected, setBackendConnected] = useState(false);
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    
    // Add state for Google Maps visibility - this will be passed down to HomeScreen
    const [showMap, setShowMap] = useState(false);
    
    const [personalContacts, setPersonalContacts] = useState([
        { id: 1, name: 'Mom', number: '+91-9876543210', relationship: 'Family' },
        { id: 2, name: 'Dad', number: '+91-9876543211', relationship: 'Family' },
    ]);
    const [showAddContact, setShowAddContact] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [newContact, setNewContact] = useState({ name: '', number: '', relationship: '' });

    const currentCityData = cities[selectedCity];

    // Fetch location data from backend
    const fetchLocationData = async () => {
        if (!backendConnected) return;
        
        setLocationLoading(true);
        setLocationError(null);
        
        try {
            const response = await fetch("http://localhost:8080/api/location");
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No location data available yet');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setLocationData(data);
        } catch (error) {
            console.error("Error fetching location:", error);
            setLocationError(error.message);
        } finally {
            setLocationLoading(false);
        }
    };

    // Test backend connection and fetch initial data
    useEffect(() => {
        const testBackendConnection = async () => {
            try {
                // Test health check endpoint
                const healthResponse = await fetch('http://localhost:8080/api/health');
                if (!healthResponse.ok) {
                    throw new Error('Health check failed');
                }
                console.log('Backend connected successfully');
                setBackendConnected(true);
                
                // Fetch emergency contacts
                const contactsResponse = await fetch('http://localhost:8080/api/emergency-contacts');
                if (contactsResponse.ok) {
                    const contactsData = await contactsResponse.json();
                    setEmergencyContacts(contactsData.contacts);
                } else {
                    console.warn('Failed to load emergency contacts.');
                }
                
                // Fetch initial location data
                await fetchLocationData();
            } catch (error) {
                console.error('Backend connection failed:', error);
                setBackendConnected(false);
            }
        };

        testBackendConnection();
    }, []);

    // Auto-refresh location data every 5 seconds when backend is connected
    useEffect(() => {
        if (!backendConnected) return;
        const locationInterval = setInterval(fetchLocationData, 5000);
        return () => clearInterval(locationInterval);
    }, [backendConnected]);

    // Simulate geofence status changes and send alerts to backend
    useEffect(() => {
        const geofenceInterval = setInterval(async () => {
            const statuses = ['safe', 'buffer', 'caution', 'danger'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            if (geofenceEnabled && randomStatus !== geofenceStatus) {
                setGeofenceStatus(randomStatus);
                
                if (randomStatus === 'danger' || randomStatus === 'caution') {
                    const alertData = {
                        type: randomStatus,
                        time: new Date().toLocaleTimeString(),
                        message: randomStatus === 'danger' 
                            ? 'You have entered a danger zone!' 
                            : 'Caution: You are approaching a restricted area'
                    };
                    
                    setShowGeofenceAlert(true);
                    setLastGeofenceAlert(alertData);
                    
                    if (backendConnected) {
                        try {
                            const geofenceData = {
                                status: randomStatus,
                                location: locationData || { lat: 0, lng: 0, address: 'Unknown' },
                                timestamp: new Date().toISOString(),
                                city: selectedCity
                            };
                            
                            await fetch('http://localhost:8080/api/geofence-alert', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(geofenceData)
                            });
                        } catch (error) {
                            console.error('Failed to send geofence alert to backend:', error);
                        }
                    }
                    setTimeout(() => setShowGeofenceAlert(false), 5000);
                }
            }
        }, 12000);
        return () => clearInterval(geofenceInterval);
    }, [geofenceStatus, geofenceEnabled, backendConnected, selectedCity, locationData]);

    // Simulate network and battery status
    useEffect(() => {
        const interval = setInterval(() => {
            setIsOnline(Math.random() > 0.3);
            setSignalStrength(Math.floor(Math.random() * 5));
            setBatteryLevel(prev => Math.max(10, prev - Math.floor(Math.random() * 3)));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // SOS Countdown logic
    useEffect(() => {
        let interval;
        if (sosCountdown > 0) {
            interval = setInterval(() => {
                setSosCountdown(prev => (prev === 1 ? 0 : prev - 1));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [sosCountdown]);

    const startSOSCountdown = (emergencyType) => {
        setSelectedEmergencyType(emergencyType);
        setSosCountdown(3);
    };

    const cancelSOS = () => {
        setSosCountdown(0);
        setSelectedEmergencyType(null);
    };

    const activateSOS = async () => {
        setSosActive(true);
        setSosCountdown(0);
        
        if (backendConnected) {
            try {
                const sosData = {
                    emergencyType: selectedEmergencyType,
                    location: locationData || { lat: 0, lng: 0, address: 'Unknown' },
                    contacts: personalContacts,
                    timestamp: new Date().toISOString(),
                    city: selectedCity
                };
                
                const response = await fetch('http://localhost:8080/api/sos-alert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sosData)
                });
                
                if (response.ok) {
                    console.log('SOS alert sent successfully');
                } else {
                    throw new Error('SOS alert failed');
                }
            } catch (error) {
                console.error('Failed to send SOS alert to backend:', error);
            }
        }
        setTimeout(() => {
            setSosActive(false);
            setSelectedEmergencyType(null);
            setShowSOSModal(false);
        }, 5000);
    };

    const handleCityChange = (cityKey) => {
        setSelectedCity(cityKey);
        setShowCitySelector(false);
        setGeofenceStatus('safe');
    };

    // Contact management functions
    const handleAddContact = () => {
        if (newContact.name && newContact.number) {
            const contact = { id: Date.now(), ...newContact };
            setPersonalContacts([...personalContacts, contact]);
            setNewContact({ name: '', number: '', relationship: '' });
            setShowAddContact(false);
        }
    };

    const handleEditContact = (contact) => {
        setEditingContact(contact.id);
        setNewContact({ ...contact });
    };

    const handleUpdateContact = () => {
        setPersonalContacts(personalContacts.map(contact => 
            contact.id === editingContact ? { ...newContact } : contact
        ));
        setEditingContact(null);
        setNewContact({ name: '', number: '', relationship: '' });
    };

    const handleDeleteContact = (id) => {
        setPersonalContacts(personalContacts.filter(contact => contact.id !== id));
    };

    const renderActiveScreen = () => {
        const screenProps = {
            currentCityData,
            geofenceStatus,
            geofenceEnabled,
            setGeofenceEnabled,
            isOnline,
            batteryLevel,
            signalStrength,
            selectedCity,
            showCitySelector,
            setShowCitySelector,
            handleCityChange,
            personalContacts,
            showAddContact,
            setShowAddContact,
            editingContact,
            setEditingContact,
            newContact,
            setNewContact,
            handleAddContact,
            handleEditContact,
            handleUpdateContact,
            handleDeleteContact,
            cities,
            lastGeofenceAlert,
            backendConnected,
            emergencyContacts,
            setShowAboutUs,
            locationData,
            locationLoading,
            locationError,
            fetchLocationData,
            // Add these props for GoogleMapsComponent integration
            showMap,
            setShowMap
        };

        switch (activeTab) {
            case 'home': return <HomeScreen {...screenProps} />;
            case 'geofencing': return <GeofencingScreen {...screenProps} />;
            case 'contacts': return <ContactsScreen {...screenProps} />;
            case 'settings': return <SettingsScreen {...screenProps} />;
            case 'location': return <LocationScreen {...screenProps} />;
            case 'translator': return <TranslatorScreen backendConnected={backendConnected} />;
            default: return <HomeScreen {...screenProps} />;
        }
    };

    return (
        <div className="app-container">
            <StatusBar 
                isOnline={isOnline && backendConnected}
                batteryLevel={batteryLevel}
                signalStrength={signalStrength}
            />
            
            {/* Backend connection indicator */}
            {!backendConnected && (
                <div style={{ 
                    backgroundColor: '#ff9800', 
                    color: 'white', 
                    padding: '8px', 
                    textAlign: 'center',
                    fontSize: '12px'
                }}>
                    Backend disconnected - Running in offline mode
                </div>
            )}
            
            <div className="main-content">
                <GeofenceAlert 
                    showGeofenceAlert={showGeofenceAlert}
                    setShowGeofenceAlert={setShowGeofenceAlert}
                    lastGeofenceAlert={lastGeofenceAlert}
                    geofenceStatus={geofenceStatus}
                />
                {renderActiveScreen()}
            </div>
            
            {/* Add GoogleMapsComponent at the app level so it can be accessed from any screen */}
            <GoogleMapsComponent 
                showMap={showMap}
                setShowMap={setShowMap}
                currentCityData={currentCityData}
                geofenceStatus={geofenceStatus}
                backendConnected={backendConnected}
                locationData={locationData}
            />
            
            <TabNavigation 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setShowSOSModal={setShowSOSModal}
                setShowAboutUs={setShowAboutUs}
                locationData={locationData}
                backendConnected={backendConnected}
            />
            
            <SOSModal 
                showSOSModal={showSOSModal}
                setShowSOSModal={setShowSOSModal}
                sosCountdown={sosCountdown}
                sosActive={sosActive}
                selectedEmergencyType={selectedEmergencyType}
                startSOSCountdown={startSOSCountdown}
                cancelSOS={cancelSOS}
                emergencyTypes={emergencyTypes}
            />

            {showAboutUs && (
                <AboutUs onClose={() => setShowAboutUs(false)} />
            )}
        </div>
    );
};

export default App;