import React, { useEffect, useRef } from 'react';
import { Search as SearchIcon, MapPin, X } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { useGeolocation } from '../hooks/useGeolocation';

const Search: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchLocations, 
    searchResults, 
    selectLocation,
    isLoading 
  } = useWeather();
  
  const { getLocation, isLoading: isGeoLoading, error: geoError } = useGeolocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocations();
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Auto-search after typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchLocations();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) && 
          searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setSearchQuery('');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for a city..."
            className="w-full p-3 pl-10 pr-10 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X size={18} />
            </button>
          )}
          
          <button
            type="button"
            onClick={getLocation}
            disabled={isGeoLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            title="Use my location"
          >
            <MapPin size={20} />
          </button>
        </div>
      </form>
      
      {/* Search Results */}
      {searchQuery && searchResults.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <button
                  onClick={() => selectLocation(result)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2 dark:text-white"
                >
                  <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                  <span>{result.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isLoading && searchQuery && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 text-center dark:text-white">
          Searching...
        </div>
      )}
      
      {!isLoading && searchQuery && searchResults.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 text-center dark:text-white">
          No results found
        </div>
      )}
      
      {geoError && (
        <div className="mt-2 text-red-500 text-sm text-center">
          {geoError}
        </div>
      )}
    </div>
  );
};

export default Search;