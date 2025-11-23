# Countries App

A modern web application to explore countries around the world with detailed information including flags, population, currency, languages, weather, and maps.

---

## About the Project

The **Countries App** allows users to browse and explore countries globally. Users can view detailed information about each country, check the weather in the capital city, and locate it on an interactive map.  

Authenticated users can mark countries as favorites and manage their profiles. The app features light and dark mode for better user experience and responsive design for all devices.

---

## Features

- **Explore Countries**  
  Browse a searchable list of all countries with flags and names.
  - Filter countries by region (e.g., Africa, Europe, Asia, Americas, Oceania)

- **Country Details**  
  Access detailed information including:  
  - Flag & official/common names  
  - Population  
  - Currency (name & symbol)  
  - Languages  
  - Capital city and region  

- **Weather in Capital**  
  Real-time weather data from OpenWeather API:  
  - Temperature, “feels like”, humidity, wind speed  
  - Weather description and icon  

- **Interactive Map**  
  Locate the capital city on an interactive map.

- **Favorites**  
  - Mark countries as favorites for quick access  
  - Favorites are user-specific (requires login)  

- **Authentication & User Profile**  
  - Login and logout functionality  
  - Protected routes for profile and favorites pages  
  - Manage user profile information  

- **Theme Support**  
  Toggle between light and dark modes with dynamic UI colors.

- **Responsive Design**  
  Optimized layout for desktops, tablets, and mobile devices.

- **Smooth Navigation & Layout**  
  - Sticky header with navigation buttons  
  - Footer always at the bottom with current year  
  - Main content grows to fill available space  

- **Performance & UX Enhancements**  
  - Redux for state management (countries, favorites, weather)  
  - Graceful loading and error handling  
  - Smooth transitions and modern UI components  

---

## Tech Stack

- **Frontend**: Next.js, React  
- **UI Library**: Material-UI (MUI)  
- **State Management**: Redux Toolkit  
- **API Integration**: REST API for country data & OpenWeather API for weather  
- **Map**: Leaflet / React-Leaflet  
- **Authentication**: Custom Auth Context   
- **Theming**: Light/Dark Mode with MUI ThemeProvider  

---

