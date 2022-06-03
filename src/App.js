import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { logout } from './actions/auth'
import { clearMessage } from './actions/message'
import { history } from './helpers/history'

import Dummy from './pages/Dummy'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

function App() {
  const [showDoctorBoard, setShowDoctorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const { user: currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage()) // clear message when changing location
    })
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowDoctorBoard(currentUser.roles.includes('ROLE_DOCTOR'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
    }
  }, [currentUser])

  const logOut = () => {
    dispatch(logout())
  }

  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/'} className='navbar-brand'>
            Medical
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/home'} className='nav-link'>
                Home
              </Link>
            </li>
            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={'/admin'} className='nav-link'>
                  Admin Board
                </Link>
              </li>
            )}
            {showDoctorBoard && (
              <li className='nav-item'>
                <Link to={'/doctor'} className='nav-link'>
                  Doctor Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className='nav-item'>
                <Link to={'/user'} className='nav-link'>
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/sign-up'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className='container mt-3'>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/sign-up' element={<SignUp />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route path='*' element={<Dummy />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
