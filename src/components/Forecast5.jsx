import { useSelector } from "react-redux"
import Menu from "./Menu"
import Start from "./Start"
import { useEffect, useState } from "react"
import dotenv from 'dotenv';




const Forecast5 = () => {

    const API_KEY = import.meta.env.VITE_API_KEY

    const city = useSelector((state) => state.input.city)
    const lat = useSelector((state) => state.input.lat)
    const lon = useSelector((state) => state.input.lon)

    const [forecast, setForecast] = useState([])


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

    const getForecast = async () => {
        const link = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        const response = await fetch(link)

        if (response.ok) {
            const data = await response.json()
            // console.log("FORECAST: ", data)
            setForecast(data.list)
        }

        else {
            const error_data = await response.json()
            // console.log(error_data)
        }

    }

    useEffect(() => {
        getForecast()
    }, [city])

    const [c, setC] = useState([])
    //forecast

    useEffect(() => {



        if (forecast.length > 0) {

            // console.log("FFFF", forecast)
            const today = new Date(forecast[0].dt * 1000)
            const todayDay = today.getDate()
            let counter = 0

            // console.log("TODAY: ", todayDay)

            forecast.map((item, index) => {
                // console.log(item.dt)
                const date = new Date(item.dt * 1000)
                const day = date.getDate()
                if (day == todayDay) {
                    counter = counter + 1
                }
              //  console.log("Counter", counter)
                setC([0, counter, counter + 8, counter + 16, counter + 24, counter + 32])
            })
        }
    }, [forecast])







    return (
        <div>
            <Start />
            <Menu />

            <div className="flex xl:flex-row flex-col xl:items-start items-center justify-center">

                {c && c.map((item, index) => (

                    <div key={index}>

                        <div className="text-center">


                            {forecast && forecast.slice(c[index], c[index + 1]).map((item, index) => (
                                <div key={index}>
                                    {index === 0 && <p>{item.dt_txt.slice(0, -9)}</p>}
                                    <div className="m-2 p-2  shadow-md border rounded-xl bg-gradient-to-l 
                                    from-sky-50 to-sky-200 xl:w-48 xl:h-24 w-80 flex transition-all hover:scale-105 " key={index}>

                                        <div className="w-1/2 h-1/2">
                                            <p>{item.dt_txt.slice(10, -3)}</p>
                                            <img className="w-16" src={weatherIcons[item.weather[0].main]} alt="Weather Icon" />

                                        </div>
                                        <div className="flex justify-center items-center">
                                            <p className="text-xl">{item.main.temp.toFixed(1)} °C</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>


                ))}




            </div>
        </div>
    )
}

export default Forecast5