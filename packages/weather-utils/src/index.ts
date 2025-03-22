import { formatTemperature, formatHumidity, formatWindSpeed } from '@yj/shared-utils';

export const getFormattedWeather = (temperature: number, humidity: number, windSpeed: number) => {
  return {
    formattedTemperature: formatTemperature(temperature),
    formattedHumidity: formatHumidity(humidity),
    formattedWindSpeed: formatWindSpeed(windSpeed)
  };
};

export const getWeatherSummary = (temperature: number, humidity: number, windSpeed: number) => {
  return `Current weather: ${formatTemperature(temperature)}, humidity ${formatHumidity(humidity)}, wind ${formatWindSpeed(windSpeed)}`;
};