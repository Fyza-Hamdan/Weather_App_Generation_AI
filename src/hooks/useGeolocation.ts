import { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';

interface GeolocationState {
  isLoading: boolean;
  error: string | null;
  supported: boolean;
}

export function useGeolocation() {
  const { setLocationByCoordinates } = useWeather();
  const [state, setState] = useState<GeolocationState>({
    isLoading: false,
    error: null,
    supported: 'geolocation' in navigator
  });

  const getLocation = () => {
    if (!state.supported) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser'
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          await setLocationByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setState(prev => ({ ...prev, isLoading: false }));
        } catch (error) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Failed to fetch weather data for your location'
          }));
        }
      },
      error => {
        let errorMessage = 'Failed to get your location';
        
        if (error.code === 1) {
          errorMessage = 'Location access denied. Please enable location services.';
        } else if (error.code === 2) {
          errorMessage = 'Location unavailable. Please try again.';
        } else if (error.code === 3) {
          errorMessage = 'Location request timed out. Please try again.';
        }
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }));
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };

  // Return the state and the function to get location
  return {
    ...state,
    getLocation
  };
}