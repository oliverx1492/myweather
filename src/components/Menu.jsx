import { useEffect } from "react"
import { Link } from "react-router-dom"


const Menu = () => {

    

    return (
        <div className="flex justify-around p-4 m-4">
            <Link to="/aktuell"><div className="text-lg transition-all hover:scale-110 duration-75    ">Aktuelles Wetter</div></Link>
            <Link to="/vorschau"><div className="text-lg transition-all hover:scale-110 duration-75 ">5 Tage Vorschau</div></Link>
            <Link to="/luftverschmutzung"><div className="text-lg transition-all hover:scale-110 duration-75 ">Luftverschmitzung</div></Link>
            
            
            
            
        </div>
    )
}

export default Menu