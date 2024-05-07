import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { changeCity, changeLat, changeLon } from "../state/input/inputSlice"


const Start = () => {

    const API_KEY = "e32b1705dd939d3c33598f03c06684f6"

    //Auswahl an Ergebnissen
    const [result, setResult] = useState([])

    const [message,setMessage] = useState()

    //Input wird in redux geladen
    const dispatch = useDispatch()

    const navigate = useNavigate()

  

    //Funktion um Position zu bekommen
    const getCoordinates = async (city) => {

        const link = `http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=5&appid=${API_KEY}`
        const response = await fetch(link)

        if (response.ok) {
            const data = await response.json()
            // console.log(data)
            if(data.length == 0) {
                setMessage("Keine Daten gefunden")
                setResult([])
            }

            else {
                setMessage("")
                setResult(data)
            }
            //alle 5 ergebnisse werden in result state geladen
            
        }
        else {
            // console.log("NOT OKAY")
        }
    }

    //Tools um den Input zu verarbeiten
    const { register, handleSubmit, formState: { errors } } = useForm()

    const submitHandler = (data) => {
        if(data)
        // console.log(data)
        getCoordinates(data.city)
        
    }

    const selectCity = (data) => {
        
        //Name, Lon und Lat werden in redux gespeichert

        try {
            if(data.local_names.de.length > 0) {
                dispatch(changeCity(data.local_names.de))
            }
            
        }
        catch {
            // .log("Catch")
            dispatch(changeCity(data.name))
        }
       
        
        dispatch(changeLat(data.lat))
        dispatch(changeLon(data.lon))

        //result wird gelöscht
        setResult([])

        //weiterleitung zum aktuellen wetetr
        navigate("/aktuell")
    }

    return (
        <div className="flex justify-center text-center md:items-cent">
            <div className="bg-sky-50 w-full md:p-2 pt-20 pl-2 pr-2 md:pb-10 md:h-1/3 flex flex-col items-center md:shadow-2xl md:rounded-lg ">
                <Link to="/"><p className="md:text-5xl md:m-4 md:p-4 text-3xl">myWeather.com</p></Link>

                <form onSubmit={handleSubmit(submitHandler)} className="flex flex-row justify-center items-center w-full ">
                    <input {...register("city", {
                        required: true
                    })} className="md:w-1/2 w-full m-4 p-4 rounded-lg border border-gray-200 focus:outline-none  focus:ring focus:ring-sky-300 " type="text" />

                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 duration-1000 hover:transition-all hover:duration-1000 hover:scale-150">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>


                </form>
                {message}
                {errors.city && (<div>Eingabe ist leer</div>)}

                {/* Ergebnisse der Suche */}
                {result.length > 0 && result.map((item, index) => (
                    <div onClick={()=>selectCity(item)} 
                    className="cursor-pointer bg-sky-200 rounded-lg shadow-lg p-4 md:m-2 
                    md:w-1/3 w-screen flex md:md:justify-around transition-all hover:scale-105 hover:bg-sky-300" 
                    key={index}>
                        <div className="w-1/3">{item.name}</div>
                        <div className="w-1/3">{item.country}</div>
                        <div className="w-1/3">{item.state}</div>
                        
                    </div>
                ))
                }
                
            </div>

        </div>

    )
}

export default Start