export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  return weatherCodes[code] || 'Unknown';
}

export function getWeatherIcon(code: number, isDay: boolean = true): string {
  // Map weather codes to Lucide icon names
  if (code === 0) return isDay ? 'sun' : 'moon';
  if (code === 1) return isDay ? 'sun' : 'moon';
  if (code === 2) return isDay ? 'cloud-sun' : 'cloud-moon';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'cloud-fog';
  if (code >= 51 && code <= 57) return 'cloud-drizzle';
  if (code >= 61 && code <= 67) return 'cloud-rain';
  if (code >= 71 && code <= 77) return 'cloud-snow';
  if (code >= 80 && code <= 82) return 'cloud-rain';
  if (code >= 85 && code <= 86) return 'cloud-snow';
  if (code >= 95) return 'cloud-lightning';
  
  return 'cloud';
}

export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    temp = (temp * 9/5) + 32;
  }
  return `${Math.round(temp)}°${unit === 'celsius' ? 'C' : 'F'}`;
}

export function getBackgroundClass(weatherCode: number): string {
  // Clear/Sunny
  if (weatherCode === 0 || weatherCode === 1) {
    return 'from-blue-400 to-blue-600';
  }
  
  // Partly Cloudy
  if (weatherCode === 2) {
    return 'from-blue-300 to-blue-500';
  }
  
  // Overcast
  if (weatherCode === 3) {
    return 'from-gray-300 to-gray-500';
  }
  
  // Fog
  if (weatherCode === 45 || weatherCode === 48) {
    return 'from-gray-400 to-gray-600';
  }
  
  // Rain
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
    return 'from-blue-600 to-blue-800';
  }
  
  // Snow
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) {
    return 'from-blue-100 to-blue-300';
  }
  
  // Thunderstorm
  if (weatherCode >= 95) {
    return 'from-gray-700 to-gray-900';
  }
  
  // Default
  return 'from-blue-400 to-blue-600';
}