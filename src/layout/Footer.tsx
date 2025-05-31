import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>
          Weather data provided by{' '}
          <a 
            href="https://open-meteo.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Open-Meteo
          </a>
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} Weather App
        </p>
      </div>
    </footer>
  );
};

export default Footer;