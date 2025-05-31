import React from 'react';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../utils/weatherUtils';
import { formatDate, isCurrentDay } from '../utils/dateUtils';

const DailyForecast: React.FC = () => {
  const { weatherData, unit } = useWeather();
  
  if (!weatherData) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3 dark:text-white">7-Day Forecast</h2>
      <div className="space-y-2">
        {weatherData.daily.map((day, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg ${
              isCurrentDay(day.date) ? 'bg-blue-50 dark:bg-blue-900/30' : ''
            }`}
          >
            <div className="w-24 dark:text-white">
              {isCurrentDay(day.date) ? 'Today' : formatDate(day.date)}
            </div>
            
            <div className="flex items-center space-x-2">
              <WeatherIcon weatherCode={day.weatherCode} size={24} className="text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {day.precipitationProbability > 0 ? `${day.precipitationProbability}%` : ''}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-400">
                {formatTemperature(day.temperatureMin, unit)}
              </span>
              <span className="font-medium dark:text-white">
                {formatTemperature(day.temperatureMax, unit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;