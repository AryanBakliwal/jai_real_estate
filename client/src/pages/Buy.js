import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './home-log-style.css'

const Buy = () => {

    const[loginStatus, setLoginStatus] = useState('')
    useEffect(() => {
        Axios.get('http://localhost:5000/sell').then((response) => {
        setLoginStatus(response.data.loggedIn)
        console.log(response.data.loggedIn)
        })
    }, [])

    return (
        <>
            {loginStatus && (
                <div className='container post-ad'>
                    <h2 className='span-center'>Search</h2>

                </div>
            )}

            {!loginStatus && (
                <>
                    <br />
                    <br />
                    <br />
                    <h2 className='span-center'>Please <Link to="/login">Log In</Link> to buy or sell.</h2>
                </>
                
            )}
            
        </>
    )

    
}

export default Buy