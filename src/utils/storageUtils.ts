import { SavedLocation } from '../types/weather';

const SAVED_LOCATIONS_KEY = 'weatherApp_savedLocations';
const THEME_KEY = 'weatherApp_theme';
const UNIT_KEY = 'weatherApp_unit';

// Saved Locations
export function getSavedLocations(): SavedLocation[] {
  const savedLocationsJson = localStorage.getItem(SAVED_LOCATIONS_KEY);
  return savedLocationsJson ? JSON.parse(savedLocationsJson) : [];
}

export function saveLocation(location: SavedLocation): void {
  const savedLocations = getSavedLocations();
  // Check if location already exists
  if (!savedLocations.some(loc => loc.id === location.id)) {
    const updatedLocations = [...savedLocations, location];
    localStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(updatedLocations));
  }
}

export function removeLocation(locationId: string): void {
  const savedLocations = getSavedLocations();
  const updatedLocations = savedLocations.filter(loc => loc.id !== locationId);
  localStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(updatedLocations));
}

// Theme
export function getTheme(): 'light' | 'dark' {
  const theme = localStorage.getItem(THEME_KEY);
  return theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme);
}

// Temperature Unit
export function getUnit(): 'celsius' | 'fahrenheit' {
  const unit = localStorage.getItem(UNIT_KEY);
  return unit === 'fahrenheit' ? 'fahrenheit' : 'celsius';
}

export function setUnit(unit: 'celsius' | 'fahrenheit'): void {
  localStorage.setItem(UNIT_KEY, unit);
}