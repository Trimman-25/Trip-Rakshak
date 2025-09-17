// // // import React from 'react';
// // // import { Shield, Navigation, AlertTriangle, Phone, Settings } from 'lucide-react';

// // // const TabNavigation = ({ activeTab, setActiveTab, setShowSOSModal }) => (
// // //   <div className="tab-navigation">
// // //     <div className="tab-container">
// // //       {[
// // //         { id: 'home', icon: Shield, label: 'Home' },
// // //         { id: 'geofencing', icon: Navigation, label: 'Geofence' },
// // //         { id: 'sos', icon: AlertTriangle, label: 'SOS' },
// // //         { id: 'contacts', icon: Phone, label: 'Contacts' },
// // //         { id: 'settings', icon: Settings, label: 'Settings' },
// // //       ].map(({ id, icon: Icon, label }) => (
// // //         <button
// // //           key={id}
// // //           onClick={() => {
// // //             if (id === 'sos') {
// // //               setShowSOSModal(true);
// // //             } else {
// // //               setActiveTab(id);
// // //             }
// // //           }}
// // //           className={`tab-button ${
// // //             activeTab === id && id !== 'sos'
// // //               ? `tab-button-active-${id}` 
// // //               : id === 'sos'
// // //               ? 'tab-button-sos'
// // //               : 'tab-button-inactive'
// // //           }`}
// // //         >
// // //           <Icon size={20} />
// // //           <span className="tab-label">{label}</span>
// // //         </button>
// // //       ))}
// // //     </div>
// // //   </div>
// // // );

// // // export default TabNavigation;
// // import React from 'react';
// // import './TabNavigation.css';

// // const TabNavigation = ({ 
// //   activeTab, 
// //   setActiveTab, 
// //   setShowSOSModal, 
// //   setShowAboutUs 
// // }) => {
// //   const tabs = [
// //     { id: 'home', label: 'Home', icon: '🏠' },
// //     { id: 'geofencing', label: 'Geofence', icon: '📍' },
// //     { id: 'contacts', label: 'Contacts', icon: '👥' },
// //     { id: 'settings', label: 'Settings', icon: '⚙️' }
// //   ];

// //   return (
// //     <div className="tab-navigation">
// //       <div className="tab-container">
// //         {tabs.map((tab) => (
// //           <button
// //             key={tab.id}
// //             className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
// //             onClick={() => setActiveTab(tab.id)}
// //           >
// //             <span className="tab-icon">{tab.icon}</span>
// //             <span className="tab-label">{tab.label}</span>
// //           </button>
// //         ))}
// //       </div>
      
// //       {/* SOS Emergency Button */}
// //       <button
// //         className="sos-button"
// //         onClick={() => setShowSOSModal(true)}
// //         aria-label="Emergency SOS"
// //       >
// //         <div className="sos-pulse"></div>
// //         <span className="sos-text">SOS</span>
// //       </button>

// //       {/* About Us Button */}
// //       <button
// //         className="about-button"
// //         onClick={() => setShowAboutUs(true)}
// //         title="About SafeGuard Pro"
// //       >
// //         <span className="about-icon">ℹ️</span>
// //       </button>
// //     </div>
// //   );
// // };

// // export default TabNavigation;
// import React from 'react';
// import './TabNavigation.css';

// const TabNavigation = ({
//   activeTab,
//   setActiveTab,
//   setShowSOSModal,
//   setShowAboutUs,
//   locationData,
//   backendConnected
// }) => {
//   const tabs = [
//     { id: 'home', label: 'Home', icon: '🏠' },
//     { id: 'geofencing', label: 'Geofence', icon: '📍' },
//     { id: 'location', label: 'Location', icon: '🌍' },
//     { id: 'contacts', label: 'Contacts', icon: '👥' },
//     { id: 'settings', label: 'Settings', icon: '⚙️' }
//   ];

//   const getLocationStatus = () => {
//     if (!backendConnected) return '⚫'; // Offline
//     if (!locationData) return '🔄'; // Loading
//     return '🟢'; // Connected and has data
//   };

//   return (
//     <div className="tab-navigation">
//       <div className="tab-container">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
//             onClick={() => setActiveTab(tab.id)}
//             title={tab.id === 'location' ? `Location ${backendConnected ? 'Connected' : 'Offline'}` : tab.label}
//           >
//             <span className="tab-icon">
//               {tab.id === 'location' ? (
//                 <span className="location-icon-container">
//                   {tab.icon}
//                   <span className="location-status">{getLocationStatus()}</span>
//                 </span>
//               ) : (
//                 tab.icon
//               )}
//             </span>
//             <span className="tab-label">{tab.label}</span>
//           </button>
//         ))}
//       </div>
      
//       {/* SOS Emergency Button */}
//       <button
//         className="sos-button"
//         onClick={() => setShowSOSModal(true)}
//         aria-label="Emergency SOS"
//       >
//         <div className="sos-pulse"></div>
//         <span className="sos-text">SOS</span>
//       </button>

//       {/* About Us Button */}
//       <button
//         className="about-button"
//         onClick={() => setShowAboutUs(true)}
//         title="About SafeGuard Pro"
//       >
//         <span className="about-icon">ℹ️</span>
//       </button>
//     </div>
//   );
// };

// export default TabNavigation;
import React from 'react';
import './TabNavigation.css';

const TabNavigation = ({
  activeTab,
  setActiveTab,
  setShowSOSModal,
  setShowAboutUs,
  locationData,
  backendConnected
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'geofencing', label: 'Geofence', icon: '📍' },
    { id: 'location', label: 'Location', icon: '🌍' },
    { id: 'translator', label: 'Translate', icon: '🌐' }, // New translator tab
    { id: 'contacts', label: 'Contacts', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const getLocationStatus = () => {
    if (!backendConnected) return '⚫'; // Offline
    if (!locationData) return '🔄'; // Loading
    return '🟢'; // Connected and has data
  };

  const getTranslatorStatus = () => {
    if (!backendConnected) return '⚫'; // Offline mode
    return '🟢'; // Online mode
  };

  return (
    <div className="tab-navigation">
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={
              tab.id === 'location' ? 
                `Location ${backendConnected ? 'Connected' : 'Offline'}` :
              tab.id === 'translator' ?
                `Translator ${backendConnected ? 'Online' : 'Offline'}` :
                tab.label
            }
          >
            <span className="tab-icon">
              {tab.id === 'location' ? (
                <span className="location-icon-container">
                  {tab.icon}
                  <span className="location-status">{getLocationStatus()}</span>
                </span>
              ) : tab.id === 'translator' ? (
                <span className="translator-icon-container">
                  {tab.icon}
                  <span className="translator-status">{getTranslatorStatus()}</span>
                </span>
              ) : (
                tab.icon
              )}
            </span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* SOS Emergency Button */}
      <button
        className="sos-button"
        onClick={() => setShowSOSModal(true)}
        aria-label="Emergency SOS"
      >
        <div className="sos-pulse"></div>
        <span className="sos-text">SOS</span>
      </button>

      {/* About Us Button */}
      <button
        className="about-button"
        onClick={() => setShowAboutUs(true)}
        title="About SafeGuard Pro"
      >
        <span className="about-icon">ℹ️</span>
      </button>
    </div>
  );
};

export default TabNavigation;