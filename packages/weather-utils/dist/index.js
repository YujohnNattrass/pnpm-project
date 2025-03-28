import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { formatTemperature, formatHumidity, formatWindSpeed } from '@yj/shared-utils';
export const weatherTool = createTool({
    id: 'get-weather',
    description: 'Get current weather for a location',
    inputSchema: z.object({
        location: z.string().describe('City name'),
    }),
    outputSchema: z.object({
        temperature: z.number(),
        feelsLike: z.number(),
        humidity: z.number(),
        windSpeed: z.number(),
        windGust: z.number(),
        conditions: z.string(),
        location: z.string(),
        formattedTemperature: z.string(),
        formattedHumidity: z.string(),
        formattedWindSpeed: z.string(),
    }),
    // @ts-expect-error
    execute: async ({ context, mastra }) => {
        mastra?.logger?.info(`~~~Getting weather for ${context.location}`);
        return await getWeather(context.location, mastra?.logger);
    },
});
const getWeather = async (location, logger) => {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = (await geocodingResponse.json());
    if (!geocodingData.results?.[0]) {
        throw new Error(`Location '${location}' not found`);
    }
    const { latitude, longitude, name } = geocodingData.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,weather_code`;
    const response = await fetch(weatherUrl);
    const data = (await response.json());
    logger?.info(`~~~Got weather for ${location}`);
    try {
        logger?.info(`~~~Temperature: ${formatTemperature(data.current.temperature_2m)}`);
        logger?.info(`~~~Humidity: ${formatHumidity(data.current.relative_humidity_2m)}`);
        logger?.info(`~~~Wind Speed: ${formatWindSpeed(data.current.wind_speed_10m)}`);
    }
    catch (error) {
        throw new Error(`Failed to get weather!!!: ${error}`);
    }
    // Using shared utilities for formatting
    return {
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        windGust: data.current.wind_gusts_10m,
        conditions: getWeatherCondition(data.current.weather_code),
        location: name,
    };
};
function getWeatherCondition(code) {
    const conditions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
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
    return conditions[code] || 'Unknown';
}
