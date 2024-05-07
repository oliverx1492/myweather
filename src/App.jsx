

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CurrentWeather from './components/CurrentWeather'
import Start from './components/Start'
import Forecast5 from './components/Forecast5'
import Pollution from './components/Pollution'

function App() {
 

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/aktuell" element={<CurrentWeather />}/>
            <Route path="/vorschau" element={<Forecast5 />} />
            <Route path="/luftverschmutzung" element={<Pollution />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App