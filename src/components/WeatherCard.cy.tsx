import { WeatherCard } from './WeatherCard';

describe('<WeatherCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WeatherCard
        city='test-city'
        weather={{
          temperatureCelsius: 1,
          temperatureFarenheit: 2,
          conditions: 'test-condition',
          windDescription: 'test-wind-description',
        }}
        isLoading={false}
        lastFetchedTime={3}
      />
    );
  });

  it('should pass the props', () => {
    cy.mount(
      <WeatherCard
        city='Copenhagen'
        weather={{
          temperatureCelsius: 20,
          temperatureFarenheit: 35,
          conditions: 'Clear sky',
          windDescription: 'Light Breeze',
        }}
        isLoading={false}
        lastFetchedTime={10}
      />
    );

    const lastFetchedTime = new Date(10).toLocaleTimeString('en-US', {
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    cy.get('.weather-card').within(() => {
      cy.get('.weather-card--city').contains('Copenhagen');
      cy.get('.weather-card--temperature').contains('20');
      cy.get('.weather-card--conditions').contains('Clear sky');
      cy.get('.weather-card--wind').contains('Light Breeze');
      cy.get('.weather-card--time').contains(lastFetchedTime);
    });
  });
});
