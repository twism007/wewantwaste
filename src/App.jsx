import { useState } from 'react'
import TopBar from './components/TopBar'
import Product from './components/Product'
import './App.css'

function App() {

  return (
    <>
      <div className="min-h-screen w-screen bg-[#121212] text-white">
        <TopBar activeStep="skip" />
        <Product/>
      </div>
    </>
  )
}

export default App
