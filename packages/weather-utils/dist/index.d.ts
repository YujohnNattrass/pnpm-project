import { z } from 'zod';
export declare const weatherTool: import("@mastra/core/tools").Tool<z.ZodObject<{
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
}, {
    location: string;
}>, z.ZodObject<{
    temperature: z.ZodNumber;
    feelsLike: z.ZodNumber;
    humidity: z.ZodNumber;
    windSpeed: z.ZodNumber;
    windGust: z.ZodNumber;
    conditions: z.ZodString;
    location: z.ZodString;
    formattedTemperature: z.ZodString;
    formattedHumidity: z.ZodString;
    formattedWindSpeed: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windGust: number;
    conditions: string;
    formattedTemperature: string;
    formattedHumidity: string;
    formattedWindSpeed: string;
}, {
    location: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windGust: number;
    conditions: string;
    formattedTemperature: string;
    formattedHumidity: string;
    formattedWindSpeed: string;
}>, import("@mastra/core/tools").ToolExecutionContext<z.ZodObject<{
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
}, {
    location: string;
}>>>;
