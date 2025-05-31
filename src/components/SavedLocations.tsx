import React from 'react';
import { MapPin, Star, Trash2 } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { SavedLocation } from '../types/weather';

const SavedLocations: React.FC = () => {
  const { 
    savedLocations, 
    saveCurrentLocation, 
    removeSavedLocation, 
    selectSavedLocation,
    location
  } = useWeather();
  
  const isCurrentLocationSaved = location 
    ? savedLocations.some(
        loc => loc.lat === location.lat && loc.lon === location.lon
      ) 
    : false;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold dark:text-white">Saved Locations</h2>
        
        {location && !isCurrentLocationSaved && (
          <button
            onClick={saveCurrentLocation}
            className="flex items-center space-x-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <Star size={16} />
            <span>Save Current</span>
          </button>
        )}
      </div>
      
      {savedLocations.length === 0 ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>No saved locations yet</p>
          <p className="text-sm mt-1">
            Search for a location and save it for quick access
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {savedLocations.map((savedLocation) => (
            <SavedLocationItem
              key={savedLocation.id}
              location={savedLocation}
              onSelect={selectSavedLocation}
              onRemove={removeSavedLocation}
              isActive={
                location?.lat === savedLocation.lat && 
                location?.lon === savedLocation.lon
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface SavedLocationItemProps {
  location: SavedLocation;
  onSelect: (location: SavedLocation) => void;
  onRemove: (id: string) => void;
  isActive: boolean;
}

const SavedLocationItem: React.FC<SavedLocationItemProps> = ({
  location,
  onSelect,
  onRemove,
  isActive
}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-lg ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      <button
        onClick={() => onSelect(location)}
        className="flex items-center flex-grow text-left"
      >
        <MapPin 
          size={16} 
          className={`mr-2 ${
            isActive 
              ? 'text-blue-500 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`} 
        />
        <span className={`${
          isActive 
            ? 'font-medium text-blue-700 dark:text-blue-300' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {location.name}
        </span>
      </button>
      
      <button
        onClick={() => onRemove(location.id)}
        className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        aria-label={`Remove ${location.name}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default SavedLocations;