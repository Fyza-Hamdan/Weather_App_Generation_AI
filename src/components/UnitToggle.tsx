import React from 'react';
import { useWeather } from '../context/WeatherContext';

const UnitToggle: React.FC = () => {
  const { unit, toggleUnit } = useWeather();
  
  return (
    <button
      onClick={toggleUnit}
      className="inline-flex items-center justify-center px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
      aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
    >
      {unit === 'celsius' ? '°C' : '°F'}{' '}
      <span className="mx-1">|</span>{' '}
      <span className="text-gray-400">{unit === 'celsius' ? '°F' : '°C'}</span>
    </button>
  );
};

export default UnitToggle;