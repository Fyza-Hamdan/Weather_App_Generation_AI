import React from 'react';
import { Cloud } from 'lucide-react';
import Search from '../components/Search';
import UnitToggle from '../components/UnitToggle';
import ThemeToggle from '../components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Cloud className="mr-2" size={28} />
            <h1 className="text-2xl font-bold">Weather App</h1>
          </div>
          <div className="flex items-center space-x-2">
            <UnitToggle />
            <ThemeToggle />
          </div>
        </div>
        
        <Search />
      </div>
    </header>
  );
};

export default Header;