import React from 'react';
import { Globe, ChevronDown, CheckCircle } from 'lucide-react';

const CitySelector = ({ 
  showCitySelector, 
  setShowCitySelector, 
  currentCityData, 
  cities, 
  selectedCity, 
  handleCityChange 
}) => (
  <div className="city-selector-container">
    <button 
      onClick={() => setShowCitySelector(!showCitySelector)}
      className="city-selector-trigger"
    >
      <Globe size={20} className="icon-blue" />
      <span className="city-selector-text">{currentCityData.name}</span>
      <ChevronDown size={16} className={`city-selector-arrow ${showCitySelector ? 'city-selector-arrow-up' : ''}`} />
    </button>

    {showCitySelector && (
      <div className="city-selector-dropdown">
        {Object.entries(cities).map(([key, city]) => (
          <button
            key={key}
            onClick={() => handleCityChange(key)}
            className={`city-option ${selectedCity === key ? 'city-option-selected' : ''}`}
          >
            <div className="city-option-content">
              <span className="city-option-name">{city.name}</span>
              <span className="city-option-coords">
                {city.lat.toFixed(4)}°, {city.lng.toFixed(4)}°
              </span>
            </div>
            {selectedCity === key && <CheckCircle size={16} className="icon-green" />}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default CitySelector;