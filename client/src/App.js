import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
import './App.css';
import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Account from './pages/Account';
import Buy from './pages/Buy'
import Sell from './pages/Sell';



function App() {

Axios.defaults.withCredentials = true

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='login' element={<Login />} />
            <Route path='account' element={<Account />} />
            <Route path='buy' element={<Buy />} />
            <Route path='sell' element={<Sell />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
