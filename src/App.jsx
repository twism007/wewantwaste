import { useState } from 'react'
import TopBar from './components/TopBar'
import Product from './components/Product'
import './App.css'

function App() {

  return (
    <>
      <div className="min-h-screen w-screen bg-[#121212] text-white">
        <TopBar activeStep="skip" />
        <h1 className='text-center text-3xl font-semibold pt-4'>Choose Your Skip Size</h1>
        <h3 className='text-center text-gray-400'>Select the skip size that best suits your needs</h3>
        <Product/>
      </div>
    </>
  )
}

export default App
