import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { clearMessage } from './actions/message'
import { history } from './helpers/history'

import Dummy from './pages/Dummy'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage()) // clear message when changing location
    })
  }, [dispatch])

  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/sign-up' element={<SignUp />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route path='*' element={<Dummy />} />
    </Routes>
  )
}

export default App
