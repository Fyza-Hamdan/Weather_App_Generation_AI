import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getWeatherData, searchLocation } from '../api/weatherApi';
import { 
  Location, 
  WeatherData, 
  TemperatureUnit, 
  SavedLocation, 
  ThemeMode 
} from '../types/weather';
import { 
  getSavedLocations, 
  saveLocation, 
  removeLocation, 
  getUnit, 
  setUnit as saveUnit,
  getTheme,
  setTheme as saveTheme 
} from '../utils/storageUtils';

interface WeatherContextType {
  location: Location | null;
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  unit: TemperatureUnit;
  theme: ThemeMode;
  searchResults: Location[];
  savedLocations: SavedLocation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchLocations: () => Promise<void>;
  selectLocation: (location: Location) => Promise<void>;
  setLocationByCoordinates: (lat: number, lon: number) => Promise<void>;
  toggleUnit: () => void;
  toggleTheme: () => void;
  saveCurrentLocation: () => void;
  removeSavedLocation: (id: string) => void;
  selectSavedLocation: (location: SavedLocation) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>(getUnit());
  const [theme, setTheme] = useState<ThemeMode>(getTheme());
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load saved locations on mount
  useEffect(() => {
    setSavedLocations(getSavedLocations());
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    saveTheme(theme);
  }, [theme]);

  // Search for locations
  const searchLocations = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchLocation(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search locations. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather data for a location
  const fetchWeatherData = async (lat: number, lon: number, locationName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(lat, lon);
      setWeatherData(data);
      setLocation({ name: locationName, lat, lon });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Select a location from search results
  const selectLocation = async (location: Location) => {
    await fetchWeatherData(location.lat, location.lon, location.name);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Set location by coordinates (for geolocation)
  const setLocationByCoordinates = async (lat: number, lon: number) => {
    try {
      // Reverse geocode to get location name
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1`
      );
      
      if (!response.ok) throw new Error('Failed to reverse geocode');
      
      const data = await response.json();
      const locationName = data.results?.[0]?.name || 'Current Location';
      
      await fetchWeatherData(lat, lon, locationName);
    } catch (err) {
      setError('Failed to get your location. Please search manually.');
    }
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
    saveUnit(newUnit);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Save current location
  const saveCurrentLocation = () => {
    if (location) {
      const newSavedLocation: SavedLocation = {
        ...location,
        id: `${location.lat}-${location.lon}`
      };
      
      saveLocation(newSavedLocation);
      setSavedLocations(getSavedLocations());
    }
  };

  // Remove saved location
  const removeSavedLocation = (id: string) => {
    removeLocation(id);
    setSavedLocations(getSavedLocations());
  };

  // Select a saved location
  const selectSavedLocation = async (location: SavedLocation) => {
    await fetchWeatherData(location.lat, location.lon, location.name);
  };

  const value = {
    location,
    weatherData,
    isLoading,
    error,
    unit,
    theme,
    searchResults,
    savedLocations,
    searchQuery,
    setSearchQuery,
    searchLocations,
    selectLocation,
    setLocationByCoordinates,
    toggleUnit,
    toggleTheme,
    saveCurrentLocation,
    removeSavedLocation,
    selectSavedLocation
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}