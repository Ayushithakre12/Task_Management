import React from 'react'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';

const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App