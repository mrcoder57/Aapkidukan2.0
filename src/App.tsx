import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Hero from './components/Hero'
import Playpage from './components/Playpage'
import Navbar from './components/Navbar'


function App() {
 

  return (
    <>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path="/:id" element={<Playpage/>} Component={Playpage}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
