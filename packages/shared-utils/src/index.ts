export function formatTemperature(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

export function formatWindSpeed(speed: number): string {
  return `${speed.toFixed(1)} km/h`;
}
