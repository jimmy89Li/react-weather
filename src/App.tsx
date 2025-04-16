import { useEffect, useState } from 'react';
import './App.css';
import { WeatherCard } from './components/WeatherCard';
import { getWeather, WeatherInterface } from './services/weather';
import { Button } from './components/Button';
import { Input } from './components/Input';

const WEATHER_LOCAL_STORAGE_KEY = 'weatherData';
const CITY_LOCAL_STORAGE_KEY = 'city';
const LAST_FETCHED_TIME_KEY = 'lastFetchedTime';
const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchedTime, setLastFetchedTime] = useState<number | null>(null);

  useEffect(() => {
    const storedCity = localStorage.getItem(CITY_LOCAL_STORAGE_KEY);
    const storedData = localStorage.getItem(WEATHER_LOCAL_STORAGE_KEY);
    const storedLastFetchedTime = localStorage.getItem(LAST_FETCHED_TIME_KEY);
    console.log(storedLastFetchedTime);

    if (storedCity) {
      setCity(storedCity);
    }

    if (!storedData || !storedLastFetchedTime) {
      return;
    }

    const timestamp = parseInt(storedLastFetchedTime, 10);
    if (isNaN(timestamp) || Date.now() - timestamp > CACHE_EXPIRY) {
      console.log('rem');
      localStorage.removeItem(WEATHER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(LAST_FETCHED_TIME_KEY);
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      console.log('set1');
      setWeather(parsedData);
      // console.log(storedLastFetchedTime);
      setLastFetchedTime(parseInt(storedLastFetchedTime, 10));
    } catch (err) {
      console.error('Error parsing weather data from local storage', err);
      localStorage.removeItem(WEATHER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(LAST_FETCHED_TIME_KEY);
    }
  }, []);

  useEffect(() => {
    if (city) {
      localStorage.setItem(CITY_LOCAL_STORAGE_KEY, city);
      fetchWeather(city);
    }
  }, [city]);

  useEffect(() => {
    if (weather) {
      console.log('we');
      localStorage.setItem(WEATHER_LOCAL_STORAGE_KEY, JSON.stringify(weather));
      // localStorage.setItem(LAST_FETCHED_TIME_KEY, Date.now().toString());
    }
  }, [weather]);

  const fetchWeather = async (city: string, cache: boolean = true) => {
    setIsLoading(true);
    const storedData = localStorage.getItem(WEATHER_LOCAL_STORAGE_KEY);
    const storedLastFetchedTime = localStorage.getItem(LAST_FETCHED_TIME_KEY);
    console.log(storedData);

    if (
      cache &&
      storedData &&
      storedLastFetchedTime &&
      Date.now() - parseInt(storedLastFetchedTime, 10) < CACHE_EXPIRY
    ) {
      try {
        const parsedData = JSON.parse(storedData);
        setWeather(parsedData);
      } catch (err) {
        console.error('Error parsing weather data from local storage', err);
        localStorage.removeItem(WEATHER_LOCAL_STORAGE_KEY);
        localStorage.removeItem(LAST_FETCHED_TIME_KEY);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      const weather = await getWeather(city, setIsLoading);
      setWeather(weather);
      localStorage.setItem(LAST_FETCHED_TIME_KEY, Date.now().toString());
      setLastFetchedTime(Date.now());
    } catch (err) {
      console.error('Error trying to fetch weather data.', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    await fetchWeather(city, false);
  };

  return (
    <div className='flex flex-col items-center justify-start min-h-screen py-10 bg-background'>
      <h1 className='text-2xl font-bold text-foreground mb-4'>
        Check the Weather
      </h1>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-2 mb-4'>
          <Input
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='w-full rounded-md border px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-50'
          />
          <Button
            className='bg-blue-500 text-white rounded-md border px-4 py-2 hover:bg-blue-500/80 cursor-pointer disabled:cursor-not-allowed'
            onClick={handleSearch}
            disabled={isLoading}
          >
            Search
          </Button>
        </div>
        <WeatherCard
          city={city}
          weather={weather}
          isLoading={isLoading}
          lastFetchedTime={lastFetchedTime}
        />
      </div>
    </div>
  );
};

export default App;
