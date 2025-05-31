export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export interface SavedLocation extends Location {
  id: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  weatherDescription: string;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  time: string;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbability: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type ThemeMode = 'light' | 'dark';