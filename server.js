const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Add this for Google Maps API calls


const app = express();

// Environment variables
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "your_google_maps_api_key_here";

let esp32Data = [];
let latestESP32Data = null;

// NEW: ESP32 data endpoint - receives data from ESP32
app.post("/data", (req, res) => {
  try {
    console.log("Raw ESP32 data received:", req.body);
    
    const timestamp = new Date().toISOString();
    const esp32Message = {
      id: Date.now(), // Simple ID generation
      data: req.body.data || req.body, // Handle both form-data and JSON
      timestamp: timestamp,
      source: 'ESP32',
      raw: req.body
    };

    // Store the data
    latestESP32Data = esp32Message;
    esp32Data.push(esp32Message);
    
    // Keep only last 100 messages
    if (esp32Data.length > 100) {
      esp32Data.shift();
    }

    console.log("ESP32 data processed:", esp32Message);
    
    res.json({ 
      success: true, 
      message: "Data received successfully",
      timestamp: timestamp
    });
  } catch (error) {
    console.error("Error processing ESP32 data:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to process ESP32 data" 
    });
  }
});

// NEW: Get latest ESP32 data
app.get("/api/esp32/latest", (req, res) => {
  if (!latestESP32Data) {
    return res.status(404).json({ 
      error: "No ESP32 data available",
      message: "Waiting for ESP32 to send data..." 
    });
  }
  res.json(latestESP32Data);
});

// NEW: Get ESP32 data history
app.get("/api/esp32/history", (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const recentData = esp32Data.slice(-limit);
  res.json({
    data: recentData,
    total: esp32Data.length,
    latest: latestESP32Data
  });
});

// NEW: Get ESP32 connection status
app.get("/api/esp32/status", (req, res) => {
  const now = new Date();
  const isConnected = latestESP32Data && 
    (now - new Date(latestESP32Data.timestamp)) < 30000; // 30 seconds threshold
  
  res.json({
    connected: isConnected,
    lastSeen: latestESP32Data?.timestamp || null,
    totalMessages: esp32Data.length,
    status: isConnected ? 'online' : 'offline'
  });
});
// Better CORS configuration for development
const corsOptions = {
  origin: [
     "http://localhost:5173",
     "http://localhost:3000",
     "http://localhost:3001",
     "http://127.0.0.1:5173",
     "http://127.0.0.1:3000",
     "http://127.0.0.1:3001"
   ],
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true
};

app.use(cors(corsOptions));
app.use(cors({
  origin: true,
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Test API endpoint
app.get("/api", (req, res) => {
  res.json({ Anime: ["Zoro", "Shanks", "Luffy"] });
});

// Emergency contacts endpoint
app.get("/api/emergency-contacts", (req, res) => {
  res.json({
    contacts: [
      { id: 1, name: "Police", number: "100", type: "emergency" },
      { id: 2, name: "Fire Department", number: "101", type: "emergency" },
      { id: 3, name: "Ambulance", number: "108", type: "emergency" }
    ]
  });
});

// SOS alert endpoint
app.post("/api/sos-alert", (req, res) => {
  const { emergencyType, location, contacts } = req.body;
  console.log("SOS Alert received:", { emergencyType, location, contacts });

  res.json({
    success: true,
    message: "SOS alert sent successfully",
    timestamp: new Date().toISOString()
  });
});

// Geofence status endpoint
app.post("/api/geofence-alert", (req, res) => {
  const { status, location, timestamp } = req.body;
  console.log("Geofence alert:", { status, location, timestamp });
     
  res.json({
    success: true,
    message: "Geofence alert logged"
  });
});

// Google translator


// Location storage - your existing implementation
let latestLocation = null;
let locationHistory = []; // Enhanced to store history

// Enhanced location endpoint with Google Maps integration
app.post("/api/location", async (req, res) => {
  try {
    const locationData = {
      ...req.body,
      timestamp: new Date().toISOString()
    };

    latestLocation = locationData;
    
    // Add to location history (keep last 100 locations)
    locationHistory.push(locationData);
    if (locationHistory.length > 100) {
      locationHistory.shift();
    }

    // If location has coordinates but no address, get it via reverse geocoding
    if (locationData.lat && locationData.lng && !locationData.address && GOOGLE_MAPS_API_KEY !== "your_google_maps_api_key_here") {
      try {
        const address = await reverseGeocode(locationData.lat, locationData.lng);
        latestLocation.address = address.formatted_address;
        latestLocation.name = address.name || address.formatted_address;
      } catch (geocodeError) {
        console.error("Reverse geocoding failed:", geocodeError);
      }
    }

    console.log("Location received successfully:", latestLocation);
    res.json({ success: true, location: latestLocation });
  } catch (error) {
    console.error("Error processing location:", error);
    res.status(500).json({ error: "Failed to process location" });
  }
});

// Your existing location endpoint
app.get("/api/location", (req, res) => {
  if (!latestLocation) {
    return res.status(404).json({ error: "No location found yet" });
  }
  res.json(latestLocation);
});

// NEW: Get location history
app.get("/api/location/history", (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const recentHistory = locationHistory.slice(-limit);
  res.json({
    history: recentHistory,
    total: locationHistory.length
  });
});

// NEW: Google Maps helper functions
async function reverseGeocode(lat, lng) {
  if (GOOGLE_MAPS_API_KEY === "your_google_maps_api_key_here") {
    throw new Error("Google Maps API key not configured");
  }
  
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        latlng: `${lat},${lng}`,
        key: key
      }
    });

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        formatted_address: result.formatted_address,
        name: result.address_components[0]?.long_name || result.formatted_address,
        place_id: result.place_id,
        types: result.types
      };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
}

// NEW: Reverse geocoding endpoint
app.get("/api/geocode/reverse/:lat/:lng", async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const address = await reverseGeocode(parseFloat(lat), parseFloat(lng));
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NEW: Forward geocoding
async function forwardGeocode(address) {
  if (GOOGLE_MAPS_API_KEY === "your_google_maps_api_key_here") {
    throw new Error("Google Maps API key not configured");
  }

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: address,
        key: key
      }
    });

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formatted_address: result.formatted_address,
        place_id: result.place_id
      };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Forward geocoding error:', error);
    throw error;
  }
}

// NEW: Forward geocoding endpoint
app.post("/api/geocode/forward", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }
    
    const coordinates = await forwardGeocode(address);
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NEW: Search nearby places
async function searchNearbyPlaces(lat, lng, radius = 1000, type = 'point_of_interest') {
  if (GOOGLE_MAPS_API_KEY === "your_google_maps_api_key_here") {
    throw new Error("Google Maps API key not configured");
  }

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${lat},${lng}`,
        radius: radius,
        type: type,
        key: key
      }
    });

    if (response.data.status === 'OK') {
      return response.data.results.map(place => ({
        place_id: place.place_id,
        name: place.name,
        vicinity: place.vicinity,
        rating: place.rating,
        types: place.types,
        location: place.geometry.location,
        distance: calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng)
      }));
    } else {
      throw new Error(`Places search failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Places search error:', error);
    throw error;
  }
}

// NEW: Nearby places endpoint
app.get("/api/places/nearby/:lat/:lng", async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { radius = 1000, type = 'point_of_interest' } = req.query;
    
    const places = await searchNearbyPlaces(
      parseFloat(lat), 
      parseFloat(lng), 
      parseInt(radius),
      type
    );
    
    res.json({ places });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NEW: Emergency services search
app.get("/api/places/emergency/:lat/:lng", async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const radius = req.query.radius || 5000;
    
    const emergencyTypes = ['hospital', 'police', 'fire_station'];
    const emergencyPlaces = {};
    
    for (const type of emergencyTypes) {
      try {
        const places = await searchNearbyPlaces(parseFloat(lat), parseFloat(lng), parseInt(radius), type);
        emergencyPlaces[type] = places.slice(0, 5);
      } catch (error) {
        console.error(`Failed to search ${type}:`, error);
        emergencyPlaces[type] = [];
      }
    }
    
    res.json({ emergency_services: emergencyPlaces });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NEW: Distance calculation function
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return Math.round(d * 100) / 100;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

// NEW: Distance calculation endpoint
app.get("/api/distance/:lat1/:lng1/:lat2/:lng2", (req, res) => {
  try {
    const { lat1, lng1, lat2, lng2 } = req.params;
    const distance = calculateDistance(
      parseFloat(lat1), 
      parseFloat(lng1), 
      parseFloat(lat2), 
      parseFloat(lng2)
    );
    res.json({ 
      distance: distance,
      unit: 'km'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NEW: Directions
async function getDirections(origin, destination, mode = 'driving') {
  if (GOOGLE_MAPS_API_KEY === "your_google_maps_api_key_here") {
    throw new Error("Google Maps API key not configured");
  }

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: origin,
        destination: destination,
        mode: mode,
        key: key
      }
    });

    if (response.data.status === 'OK' && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      return {
        distance: route.legs[0].distance,
        duration: route.legs[0].duration,
        steps: route.legs[0].steps.map(step => ({
          instruction: step.html_instructions.replace(/<[^>]*>/g, ''),
          distance: step.distance,
          duration: step.duration,
          start_location: step.start_location,
          end_location: step.end_location
        })),
        polyline: route.overview_polyline.points
      };
    } else {
      throw new Error(`Directions failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Directions error:', error);
    throw error;
  }
}

// NEW: Directions endpoint
app.post("/api/directions", async (req, res) => {
  try {
    const { origin, destination, mode = 'driving' } = req.body;
    
    if (!origin || !destination) {
      return res.status(400).json({ error: "Origin and destination are required" });
    }
    
    const directions = await getDirections(origin, destination, mode);
    res.json(directions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NEW: Geofence checking
function isLocationInGeofence(lat, lng, geofence) {
  const distance = calculateDistance(lat, lng, geofence.center.lat, geofence.center.lng);
  return distance <= (geofence.radius / 1000);
}

// NEW: Geofence check endpoint
app.post("/api/geofence/check", (req, res) => {
  try {
    const { lat, lng, geofences } = req.body;
    
    if (!lat || !lng || !geofences) {
      return res.status(400).json({ error: "Latitude, longitude, and geofences are required" });
    }
    
    const results = geofences.map(geofence => ({
      ...geofence,
      isInside: isLocationInGeofence(lat, lng, geofence),
      distance: calculateDistance(lat, lng, geofence.center.lat, geofence.center.lng)
    }));
    
    res.json({ geofence_status: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint - enhanced
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    server: "Women Safety App Backend",
    google_maps_api: GOOGLE_MAPS_API_KEY !== "your_google_maps_api_key_here" ? "Configured" : "Not configured",
    location_tracking: latestLocation ? "Active" : "No data",
    location_history_count: locationHistory.length
  });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
  console.log(`CORS enabled for frontend development`);
  console.log(`Google Maps API: ${GOOGLE_MAPS_API_KEY !== "your_google_maps_api_key_here" ? 'Configured' : 'NOT CONFIGURED - Please set GOOGLE_MAPS_API_KEY environment variable'}`);
});