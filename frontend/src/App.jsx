import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Newsletter from './components/Newsletter'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster/>
       <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Newsletter/>
    </>
  )
}

export default App
