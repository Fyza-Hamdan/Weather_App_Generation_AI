import { WeatherData, Location, CurrentWeather, DailyForecast, HourlyForecast } from '../types/weather';
import { getWeatherDescription } from '../utils/weatherUtils';

const BASE_URL = 'https://api.open-meteo.com/v1';

export async function searchLocation(query: string): Promise<Location[]> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search location');
    }
    
    const data = await response.json();
    
    if (!data.results) {
      return [];
    }
    
    return data.results.map((result: any) => ({
      name: `${result.name}${result.admin1 ? `, ${result.admin1}` : ''}${result.country ? `, ${result.country}` : ''}`,
      lat: result.latitude,
      lon: result.longitude,
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
}

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    // Format current weather
    const current: CurrentWeather = {
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      weatherCode: data.current.weather_code,
      weatherDescription: getWeatherDescription(data.current.weather_code),
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      humidity: data.current.relative_humidity_2m,
      time: data.current.time,
    };
    
    // Format daily forecast
    const daily: DailyForecast[] = data.daily.time.map((time: string, index: number) => ({
      date: time,
      weatherCode: data.daily.weather_code[index],
      temperatureMax: data.daily.temperature_2m_max[index],
      temperatureMin: data.daily.temperature_2m_min[index],
      precipitationProbability: data.daily.precipitation_probability_max[index],
    }));
    
    // Format hourly forecast (next 24 hours)
    const hourly: HourlyForecast[] = data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index],
      precipitationProbability: data.hourly.precipitation_probability[index],
    }));
    
    return { current, daily, hourly };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}