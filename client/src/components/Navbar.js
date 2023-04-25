import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {Outlet, Link} from 'react-router-dom'
import './navbar.css'
import logo from '../images/home-logo-black.png'

const Navbar = () => {

    const[loginStatus, setLoginStatus] = useState('')
    const [curUser, setCurUser] = useState('')
    useEffect(() => {
        Axios.get('http://localhost:5000/account').then((response) => {
            setLoginStatus(response.data.loggedIn)
            setCurUser(response.data.user[0].user_name);
            console.log(response.data.loggedIn)
        })
    }, [])
  return (
    <>
        <nav className='nav-bar'>
            <div className='nav-cont container'>
            <Link to="/">
                <div className='logo'>
                    <img src={logo} alt="JRE" />
                    <h2>JRE</h2>
                </div>
            </Link>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                {(!loginStatus && (
                    <li><Link to="/login">
                    <div className='login-btn'>LOGIN</div>
                    </Link>
                    </li>
                ))}
                {(loginStatus && (
                    <li><Link to="/account">
                    <div className='login-btn'>{curUser}</div>
                    </Link>
                    </li>
                ))}
                
            </ul>
            </div>
        </nav>
        <Outlet />
    </>
  )
}

export default Navbar