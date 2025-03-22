import { formatTemperature, formatHumidity, formatWindSpeed } from '@yj/shared-utils';
export const getFormattedWeather = (temperature, humidity, windSpeed) => {
    return {
        formattedTemperature: formatTemperature(temperature),
        formattedHumidity: formatHumidity(humidity),
        formattedWindSpeed: formatWindSpeed(windSpeed)
    };
};
export const getWeatherSummary = (temperature, humidity, windSpeed) => {
    return `Current weather: ${formatTemperature(temperature)}, humidity ${formatHumidity(humidity)}, wind ${formatWindSpeed(windSpeed)}`;
};
