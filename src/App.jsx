import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Vedio from './pages/Vedio/Vedio'
import Home from './pages/Home/Home'

const App = () => {

  const [sidebar,setSidebar]=useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}/>
        <Route path='/video/:categoryId/:vedioId' element={<Vedio/>}/>
      </Routes>
    </div>
  )
}

export default App
