import { Dispatch, SetStateAction } from 'react';

const API_GEO_URL = 'https://geocoding-api.open-meteo.com/v1';
const API_BASE_URL = 'https://api.open-meteo.com/v1';
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

export interface WeatherInterface {
  temperatureCelsius: number;
  temperatureFarenheit: number;
  conditions: string;
  windDescription: string;
}

interface weatherConditionsInterface {
  code: number;
  condition: string;
}

const weatherConditions: weatherConditionsInterface[] = [
  { code: 0, condition: 'Clear sky' },
  { code: 1, condition: 'Mainly clear' },
  { code: 2, condition: 'Partly cloudy' },
  { code: 3, condition: 'Overcast' },
  { code: 45, condition: 'Fog' },
  { code: 48, condition: 'depositing rime fog' },
  { code: 51, condition: 'Drizzle: Light' },
  { code: 53, condition: 'Drizzle: Moderate' },
  { code: 55, condition: 'Drizzle: Dense' },
  { code: 56, condition: 'Freezing Drizzle: Light' },
  { code: 57, condition: 'Freezing Drizzle: Dense' },
  { code: 61, condition: 'Rain: Slight' },
  { code: 63, condition: 'Rain: Moderate' },
  { code: 65, condition: 'Rain: Heavy' },
  { code: 66, condition: 'Freezing Rain: Light' },
  { code: 67, condition: 'Freezing Rain: Heavy' },
  { code: 71, condition: 'Snow fall: Slight' },
  { code: 73, condition: 'Snow fall: Moderate' },
  { code: 75, condition: 'Snow fall: Heavy' },
  { code: 77, condition: 'Snow grains' },
  { code: 80, condition: 'Rain showers: Slight' },
  { code: 81, condition: 'Rain showers: moderate' },
  { code: 82, condition: 'Rain showers: violent' },
  { code: 85, condition: 'Snow showers slight' },
  { code: 86, condition: 'Snow showers heavy' },
  { code: 95, condition: 'Thunderstorm: Slight or moderate' },
  { code: 96, condition: 'Thunderstorm with slight hail' },
  { code: 99, condition: 'Thunderstorm with heavy hail' },
];

const windDescription = (windSpeed: number): string => {
  if (windSpeed < 1) {
    return 'Calm';
  } else if (windSpeed < 4) {
    return 'Light Air';
  } else if (windSpeed < 8) {
    return 'Light Breeze';
  } else if (windSpeed < 13) {
    return 'Gentle Breeze';
  } else if (windSpeed < 19) {
    return 'Moderate Breeze';
  } else if (windSpeed < 25) {
    return 'Fresh Breeze';
  } else if (windSpeed < 32) {
    return 'Strong Breeze';
  } else if (windSpeed < 39) {
    return 'Near Gale';
  } else if (windSpeed < 47) {
    return 'Gale';
  } else if (windSpeed < 55) {
    return 'Strong Gale';
  } else if (windSpeed < 64) {
    return 'Storm';
  } else if (windSpeed < 73) {
    return 'Violent Storm';
  } else {
    return 'Hurricane Force';
  }
};

/**
 * Convert weather code to weather condition string.
 *
 * @param weatherCode
 *   The weather code.
 *
 * @returns
 *   The weather condition string.
 */
const weatherCodeToCondition = (weatherCode: number): string => {
  const weatherCondition = weatherConditions.find(
    (condition) => condition.code == weatherCode
  );

  return weatherCondition?.condition || 'N/A';
};

/**
 * Async function to fetch the weather data.
 */
export const getWeather = async (
  city: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): Promise<WeatherInterface | null> => {
  if (!city) return null;

  try {
    const geocodingUrl = `${API_GEO_URL}/search?name=${city}&count=1`;
    const geoResponse = await fetch(geocodingUrl, API_OPTIONS);
    if (!geoResponse.ok) {
      throw new Error(`Geo API error: ${geoResponse.statusText}`);
    }

    const geoResponseData = await geoResponse.json();
    if (!geoResponseData.results || geoResponseData.results.length === 0) {
      throw new Error(`No coordinates found for city: ${city}`);
    }

    const long = `longitude=${geoResponseData.results[0].longitude}`;
    const lat = `latitude=${geoResponseData.results[0].latitude}`;

    const apiOpts = 'temperature_2m,wind_speed_10m,weather_code';
    const apiUrl = `${API_BASE_URL}/forecast?${long}&${lat}&current=${apiOpts}`;
    const apiResponse = await fetch(apiUrl, API_OPTIONS);
    if (!apiResponse.ok) {
      throw new Error(`Weather API error: ${apiResponse.statusText}`);
    }

    const apiResponseData = await apiResponse.json();
    const temperatureCelsius = apiResponseData.current.temperature_2m;
    const temperatureFarenheit = (temperatureCelsius * 9) / 5 + 32;
    const weatherCode = apiResponseData.current.weather_code;

    return {
      temperatureCelsius: temperatureCelsius,
      temperatureFarenheit: temperatureFarenheit,
      conditions: weatherCodeToCondition(weatherCode),
      windDescription: windDescription(apiResponseData.current.wind_speed_10m),
    };
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    return null;
  }
};
