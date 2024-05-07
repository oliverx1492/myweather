/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "Clear": "url(https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-256.png)",
        "Clouds": "url(https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_2-256.png)",
        "Atmosphere": "url()",
        "Snow": "url(https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_36-256.png)",
        "Rain": "url(https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_6-512.png)",
        "Drizzle": "url(https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_16-256.png)",
        "Thunderstorm": "url(https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_24-256.png)"
      }
    },
  },
  plugins: [],
}

