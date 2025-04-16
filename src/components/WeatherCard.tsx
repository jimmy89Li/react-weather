import { WeatherInterface } from '../services/weather';

interface WeatherCardProps {
  city: string;
  weather: WeatherInterface | null;
  isLoading: boolean;
  lastFetchedTime: number | null;
}

const WeatherCard = ({
  city,
  weather,
  isLoading,
  lastFetchedTime,
}: WeatherCardProps) => {
  return (
    <div className='weather-card'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='w-full max-w-md bg-card text-card-foreground shadow-md rounded-lg border'>
          <div className='flex flex-col space-y-1.5 p-6'>
            <div className='text-2xl font-semibold leading-none tracking-tight flex items-center justify-between'>
              <span className='weather-card--city'>{city}</span>
            </div>
          </div>

          <div className='p-6 pt-0 grid gap-4'>
            <div className='flex items-center space-x-2 text-accent'>
              <span className='weather-card--temperature text-lg font-semibold'>
                {weather?.temperatureCelsius !== undefined
                  ? `${weather?.temperatureCelsius} °C`
                  : 'N/A'}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='weather-card--conditions'>
                Conditions: {weather?.conditions}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='weather-card--wind'>
                Wind Speed: {weather?.windDescription}
              </span>
            </div>
            {lastFetchedTime && (
              <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                <span className='weather-card--time'>
                  Last Fetched:{' '}
                  {new Date(lastFetchedTime).toLocaleTimeString('en-US', {
                    hour12: false,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { WeatherCard };
