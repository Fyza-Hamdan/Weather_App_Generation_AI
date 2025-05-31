import React from 'react';
import * as LucideIcons from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherUtils';

interface WeatherIconProps {
  weatherCode: number;
  size?: number;
  className?: string;
  isDay?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  weatherCode, 
  size = 24, 
  className = '', 
  isDay = true 
}) => {
  const iconName = getWeatherIcon(weatherCode, isDay);
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
  
  if (!IconComponent) {
    return <LucideIcons.Cloud size={size} className={className} />;
  }
  
  return <IconComponent size={size} className={className} />;
};

export default WeatherIcon;