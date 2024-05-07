import { useSelector } from "react-redux"
import Menu from "./Menu"
import Start from "./Start"
import { useEffect, useState } from "react"
import dotenv from 'dotenv';



const CurrentWeather = () => {

    const API_KEY = import.meta.env.VITE_API_KEY


    const city = useSelector((state) => state.input.city)
    const lat = useSelector((state) => state.input.lat)
    const lon = useSelector((state) => state.input.lon)

    const [sunrise, setSunrise] = useState()
    const [sunset, setSunset] = useState()

    const weatherIcons = {
        "Clear": "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-256.png",
        "Clouds": "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_2-256.png",
        "Atmosphere": "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_39-256.png",
        "Snow": "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_36-256.png",
        "Rain": "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_6-512.png",
        "Drizzle": "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_16-256.png",
        "Haze": "https://cdn2.iconfinder.com/data/icons/weather-forecast-line/24/Fog-512.png",
        "Dust": "https://cdn2.iconfinder.com/data/icons/weather-forecast-line/24/Fog-512.png",
        "Thunderstrom":"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_24-256.png"
    }

    const [weatherData, setWeatherData] = useState()


    const getWeatherData = async () => {
        const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        const response = await fetch(link)

        if (response.ok) {
            const data = await response.json()
            // console.log(data.main.temp)
            setWeatherData(data)
        }

        else {
            const error_data = await response.json()
           // console.error(error_data)
        }
    }

    useEffect(() => {
        if (weatherData) {
             console.log("WETAHER DATA_:", weatherData)

            const sr = new Date(weatherData.sys.sunrise * 1000)
            // console.log("SUNRISE", sr.toString())
            const ss = new Date(weatherData.sys.sunset * 1000)
            setSunrise(sr.toString())
            setSunset(ss.toString())
            
            
        }
    }, [weatherData])

   useEffect( ()=> {
    // console.log(typeof(sunrise))
   },[sunrise] )


    useEffect(() => {
        // console.log("use effetc triggerd")
        getWeatherData()
    }, [city])



    return (
        <div>
            <Start />
            <Menu />
            {/* wetter widget */}
            <div className="flex justify-center md:h-auto">
                {weatherData && <div 
                className=" h-full w-screen 2xl:w-2/3 md:h-96 flex flex-col text-center rounded-xl 
                shadow-md bg-gradient-to-l from-sky-50 to-sky-200">
                    {/* <p className="text-4xl">{city}</p> */}

                    {/* Hier werden die Wetter daten angezeitg */}
                    {/* {weatherData && <div>{weatherData.main.temp}</div>} */}

                    <div className=" flex md:flex-row flex-col md:h-1/2">
                        <div className="md:w-1/2 md:flex md:justify-center items-center">
                            <p className=" text-2xl md:text-6xl">{city}</p>
                        </div>
                        <div className="md:w-1/2 md:flex md:justify-center items-center">
                            <p className="text-3xl md:text-7xl">{weatherData.main.temp} °C</p>
                        </div>

                    </div>


                    <div className=" flex h-1/2">

                        <div className="w-1/2 flex justify-center">
                            <img className="md:w-48 " src={weatherIcons[weatherData.weather[0].main]} alt="Weather Icon" />
                        </div>


                        <div className="w-1/2" >
                            <div className="md:h-2/3 flex flex-col justify-center items-center">
                                <p className="text-lg md:text-xl">Gefühlt: {weatherData.main.feels_like} °C</p>
                                <p className="text-lg md:text-xl">Luftfeuchtigkeit: {weatherData.main.humidity} %</p>
                                <p className="text-lg md:text-xl">Luftdruck: {weatherData.main.pressure} hPa</p>
                                <p className="text-lg md:text-xl">Wind: {weatherData.wind.speed} m/s</p>
                            </div>
                            <div>
                           
                                {sunrise && <p className="text-md">Sonnenaufgang: {sunrise.slice(15,21)}</p>}
                                {sunset && <p className="text-md">Sonnenuntergang: {sunset.slice(15,21)}</p>}
                            </div>
                        </div>
                    </div>


                </div>}

            </div>
        </div>
    )
}

export default CurrentWeather