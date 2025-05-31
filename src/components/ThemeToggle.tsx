import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useWeather();
  
  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeToggle;