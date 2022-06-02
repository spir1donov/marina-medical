import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dummy from './pages/Dummy'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='*' element={<Dummy />} />
    </Routes>
  )
}

export default App
