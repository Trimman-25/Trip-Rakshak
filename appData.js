// data/appData.js
export const cities = {
  shillong: {
    name: 'Shillong',
    lat: 25.5788,
    lng: 91.8933,
    safeZones: [
      {
        name: 'Police Point',
        lat: 25.5761,
        lng: 91.8906,
        radius: 500,
        type: 'Tourist Spot'
      },
      {
        name: 'Ward\'s Lake',
        lat: 25.5693,
        lng: 91.8854,
        radius: 300,
        type: 'Park'
      },
      {
        name: 'Shillong Peak',
        lat: 25.5388,
        lng: 91.8847,
        radius: 200,
        type: 'Viewpoint'
      }
    ],
    dangerZones: [
      {
        name: 'Abandoned Building Area',
        lat: 25.5850,
        lng: 91.8950,
        radius: 100,
        type: 'Restricted'
      },
      {
        name: 'Construction Site',
        lat: 25.5720,
        lng: 91.8800,
        radius: 150,
        type: 'Hazardous'
      }
    ]
  },
  guwahati: {
    name: 'Guwahati',
    lat: 26.1445,
    lng: 91.7362,
    safeZones: [
      {
        name: 'Kamakhya Temple',
        lat: 26.1665,
        lng: 91.7019,
        radius: 400,
        type: 'Religious Site'
      },
      {
        name: 'Umananda Temple',
        lat: 26.1496,
        lng: 91.7345,
        radius: 300,
        type: 'Tourist Spot'
      }
    ],
    dangerZones: [
      {
        name: 'Industrial Area',
        lat: 26.1200,
        lng: 91.7500,
        radius: 200,
        type: 'Industrial'
      }
    ]
  },
  darjeeling: {
    name: 'Darjeeling',
    lat: 27.0360,
    lng: 88.2627,
    safeZones: [
      {
        name: 'Tiger Hill',
        lat: 27.0267,
        lng: 88.2816,
        radius: 300,
        type: 'Viewpoint'
      },
      {
        name: 'Darjeeling Mall',
        lat: 27.0410,
        lng: 88.2663,
        radius: 400,
        type: 'Shopping Area'
      },
      {
        name: 'Batasia Loop',
        lat: 27.0156,
        lng: 88.2419,
        radius: 200,
        type: 'Tourist Spot'
      }
    ],
    dangerZones: [
      {
        name: 'Steep Cliff Area',
        lat: 27.0500,
        lng: 88.2700,
        radius: 100,
        type: 'Natural Hazard'
      }
    ]
  },
  manali: {
    name: 'Manali',
    lat: 32.2432,
    lng: 77.1892,
    safeZones: [
      {
        name: 'Mall Road',
        lat: 32.2396,
        lng: 77.1887,
        radius: 500,
        type: 'Shopping Area'
      },
      {
        name: 'Hadimba Temple',
        lat: 32.2396,
        lng: 77.1640,
        radius: 300,
        type: 'Religious Site'
      }
    ],
    dangerZones: [
      {
        name: 'River Rapids',
        lat: 32.2300,
        lng: 77.2000,
        radius: 200,
        type: 'Water Hazard'
      }
    ]
  }
};

export const emergencyTypes = [
  {
    id: 1,
    title: 'Medical Emergency',
    description: 'Health issues, injuries, accidents',
    emoji: '🏥',
    cssClass: 'emergency-btn-medical'
  },
  {
    id: 2,
    title: 'Personal Safety',
    description: 'Harassment, threats, unsafe situations',
    emoji: '🛡️',
    cssClass: 'emergency-btn-safety'
  },
  {
    id: 3,
    title: 'Lost/Stranded',
    description: 'Lost location, transportation issues',
    emoji: '🗺️',
    cssClass: 'emergency-btn-lost'
  },
  {
    id: 4,
    title: 'Natural Disaster',
    description: 'Earthquake, flood, landslide',
    emoji: '🌊',
    cssClass: 'emergency-btn-disaster'
  },
  {
    id: 5,
    title: 'Fire Emergency',
    description: 'Fire outbreak, smoke, gas leak',
    emoji: '🔥',
    cssClass: 'emergency-btn-fire'
  },
  {
    id: 6,
    title: 'General Emergency',
    description: 'Other urgent situations',
    emoji: '🚨',
    cssClass: 'emergency-btn-general'
  }
];