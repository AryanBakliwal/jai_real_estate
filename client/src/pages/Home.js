import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './home-log-style.css'
import banner from '../images/banner-1.png'



const Home = () => {

  const[loginStatus, setLoginStatus] = useState('')
  useEffect(() => {
    Axios.get('http://localhost:5000/').then((response) => {
        setLoginStatus(response.data.loggedIn)
        console.log(response.data.loggedIn)
    })
  }, [])


  return (
    <>
        <div className='banner container'>
            <div className='welcome'>
              <h3>Welcome to</h3> 
              <h1>Jaipur Real Estate</h1> 
              <hr />
              <br />
              <p>Property dealing made simplified.</p>

              {!loginStatus && (
                <div className='buy-sell'>
                  <div className='bs-btn'><Link to="/login">BUY</Link></div>
                  <div>|</div>
                  <div className='bs-btn'><Link to="/login">SELL</Link></div>
                </div>
              )}
              {loginStatus && (
                <div className='buy-sell'>
                  <div className='bs-btn'><Link to="/buy">BUY</Link></div>
                  <div>|</div>
                  <div className='bs-btn'><Link to="/sell">SELL</Link></div>
                </div>
              )}
              

            </div>
            <img src={banner} alt="brand"/>
        </div>
    </>
  )
}

export default Home