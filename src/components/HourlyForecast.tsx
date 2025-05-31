import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../utils/weatherUtils';
import { formatTime } from '../utils/dateUtils';

const HourlyForecast: React.FC = () => {
  const { weatherData, unit } = useWeather();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  if (!weatherData) return null;
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 relative">
      <h2 className="text-lg font-semibold mb-3 dark:text-white">Hourly Forecast</h2>
      
      <div className="relative">
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-gray-700 dark:text-gray-200" />
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {weatherData.hourly.map((hour, index) => (
            <div key={index} className="flex flex-col items-center min-w-[80px]">
              <span className="text-sm font-medium mb-2 dark:text-white">
                {index === 0 ? 'Now' : formatTime(hour.time)}
              </span>
              <WeatherIcon 
                weatherCode={hour.weatherCode} 
                size={28} 
                className="my-1 text-gray-700 dark:text-gray-300" 
              />
              {hour.precipitationProbability > 0 && (
                <span className="text-xs text-blue-500 dark:text-blue-400 my-1">
                  {hour.precipitationProbability}%
                </span>
              )}
              <span className="text-sm font-medium dark:text-white">
                {formatTemperature(hour.temperature, unit)}
              </span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>
    </div>
  );
};

export default HourlyForecast;