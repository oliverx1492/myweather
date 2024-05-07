import { useDispatch, useSelector } from "react-redux"
import Menu from "./Menu"
import Start from "./Start"
import { useEffect, useState } from "react"


const Pollution = () => {


    const city = useSelector((state) => state.input.city)
    const lat = useSelector((state) => state.input.lat)
    const lon = useSelector((state) => state.input.lon)
    const API_KEY = "e32b1705dd939d3c33598f03c06684f6"

    const aqi = {
        "1": "Gute Luftqualität",
        "2": "Akzeptable Luftqualität",
        "3": "Ungesunde Luft für empfindliche Gruppen",
        "4":  "Ungesunde Luft",
        "5": "Sehr ungesunde Luft"
    }

    const [poll, setPoll] = useState()

    const getPollution = async () => {
        const link = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        const response = await fetch(link)

        if (response.ok) {
            const data = await response.json()
            // console.log("FETCH")
            // console.log(data.list[0])
            setPoll(data.list[0])
        }

        else {
            const error_data = await response.json()
            // console.log(error_data)
        }

    }

    useEffect(() => {
        getPollution()
    }, [])

      

    return (
        <div>
            <Start />
            <Menu />

            <div className="flex justify-center">
            
            {poll && <div
                    className=" h-full w-screen 2xl:w-2/3 md:h-96 flex flex-row  text-center rounded-xl 
                shadow-md bg-gradient-to-l from-sky-50 to-sky-200">

                
                    <div className="w-1/2 flex flex-col items-center justify-center">
                        <p className="text-4xl m-2">{city}</p>
                        <p className="text-2xl">{aqi[poll.main.aqi]} </p>
                        <p className="text-lg">AQI-Index: {poll.main.aqi}</p>
                        
                        
                    </div>
                    <div className="w-1/2 flex flex-col items-center justify-center">
                        <p className="text-lg m-2 p-2">Kohlenmonoxid-Konzentration (CO): {poll.components.co} μg/m3  </p>
                        <p className="text-lg m-2 p-2">Stickstoff-Konzentration (NO2): {poll.components.no2} μg/m3  </p>
                        <p className="text-lg m-2 p-2">Ozon-Konzentration (03): {poll.components.o3} μg/m3  </p>
                        <p className="text-lg m-2 p-2">Schwefeldioxid-Konzentration (SO2): {poll.components.so2} μg/m3  </p>
                        <p className="text-lg m-2 p-2">Feinstaubbelastung (PM2.5): {poll.components.pm2_5} μg/m3  </p>
                        <p className="text-lg m-2 p-2">Grober Feinstaub (PM10): {poll.components.pm10} μg/m  </p>
                        
                       
                        
                        
                        
                        
                        
                    </div> 

                </div> }

            </div>
        </div>
    )
}

export default Pollution