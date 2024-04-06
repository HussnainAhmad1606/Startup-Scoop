import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Newsletter from './components/Newsletter'
import { Toaster } from 'react-hot-toast'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LatestNews from './components/LatestNews'
import Navbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

<Toaster/>
<Navbar/>
    <Routes>
      

    <Route path="/" element={<Newsletter/>}>
        
         </Route>


    <Route path="/news" element={<LatestNews/>}>
     
            
         </Route>

      
    </Routes>


    <p>Made by Psycho 💪</p>
    </Router>
   
  )
}

export default App
