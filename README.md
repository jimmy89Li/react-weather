# React Weather App

A simple and responsive weather application built with **React**,
**TypeScript**, and **Vite**. Easily check the current weather conditions by
searching for any location.

[Live Demo](https://the-weather-check.netlify.app/)

## Features

- 🌦 Search for the current weather by city name
- 🧩 Built with **React 18** + **TypeScript**
- ⚡ Powered by **Vite** for fast development and builds
- 🧪 End-to-end tests configured with **Cypress**
- ✨ Styled with clean, modern components
- 📦 Optimized for performance and deployed via **Netlify**

## Technologies Used

- React
- TypeScript
- Vite
- Cypress (for E2E testing)
- Open-Meteo API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jimmy89Li/react-weather.git
   cd react-weather
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open `http://localhost:5173` in your browser.

### Running Tests

To run Cypress tests:

```bash
npx cypress open
```

## Project Structure

```
├── public/              # Static assets
├── src/                 # React components and logic
│   ├── components/      # UI components
│   ├── services/        # API services
│   └── App.tsx          # Main application entry
├── cypress/             # Cypress tests
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Deployment

The app is already set up for easy deployment via platforms like Netlify,
Vercel, or your preferred host.

## License

This project is open source and available under the [MIT License](LICENSE).
