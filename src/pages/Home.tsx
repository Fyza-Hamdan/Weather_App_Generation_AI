import React from 'react';
import { useWeather } from '../context/WeatherContext';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import SavedLocations from '../components/SavedLocations';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home: React.FC = () => {
  const { weatherData, isLoading, error } = useWeather();
  
  return (
    <main className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="large" />
        </div>
      )}
      
      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}
      
      {weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentWeather />
            <HourlyForecast />
            <DailyForecast />
          </div>
          
          <div className="space-y-6">
            <SavedLocations />
          </div>
        </div>
      )}
      
      {!weatherData && !isLoading && !error && (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Welcome to Weather App
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Search for a location above or use your current location to get started.
          </p>
        </div>
      )}
    </main>
  );
};

export default Home;