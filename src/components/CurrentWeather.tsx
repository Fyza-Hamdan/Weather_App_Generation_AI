import React from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, getBackgroundClass } from '../utils/weatherUtils';
import { formatDate, formatTime } from '../utils/dateUtils';

const CurrentWeather: React.FC = () => {
  const { weatherData, location, unit } = useWeather();
  
  if (!weatherData || !location) return null;
  
  const { current } = weatherData;
  const bgGradient = getBackgroundClass(current.weatherCode);
  
  return (
    <div className={`w-full overflow-hidden rounded-xl shadow-lg bg-gradient-to-br ${bgGradient} text-white`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">{location.name}</h2>
            <p className="text-sm opacity-90">
              {formatDate(current.time)} • {formatTime(current.time)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <WeatherIcon weatherCode={current.weatherCode} size={48} className="mb-1" />
            <span className="text-sm font-medium">{current.weatherDescription}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center">
            <span className="text-6xl font-bold">
              {formatTemperature(current.temperature, unit).replace('°', '')}
            </span>
            <span className="text-3xl ml-1">°{unit === 'celsius' ? 'C' : 'F'}</span>
          </div>
          <p className="text-sm opacity-90">
            Feels like {formatTemperature(current.apparentTemperature, unit)}
          </p>
        </div>
        
        <div className="mt-6 flex space-x-4">
          <div className="flex items-center">
            <Wind size={18} className="mr-1" />
            <span>{Math.round(current.windSpeed)} km/h</span>
          </div>
          <div className="flex items-center">
            <Droplets size={18} className="mr-1" />
            <span>{current.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Thermometer size={18} className="mr-1" />
            <span>
              {formatTemperature(current.apparentTemperature, unit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;