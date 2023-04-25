import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import './home-log-style.css'


const Account = () => {

    const [curUser, setCurUser] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [adhar, setAdhar] = useState('')
    const [ads, setAds] = useState('')


    useEffect(() => {
        Axios.get('http://localhost:5000/account').then((response) => {
            if(response.data.loggedIn === true){
                console.log(response);
                setCurUser(response.data.user[0].user_name)
                setPhone(response.data.user[0].user_phone)
                setEmail(response.data.user[0].user_email)
                setAdhar(response.data.user[0].user_adhaar)
                

                if(response.data.ads){
                    setAds(response.data.ads)
                }
                
            }
            else{
                window.location.href = '/';
            }
        })
    }, [])

    return (
        <>
            <div className='container profile'>                
                <h1>{curUser}</h1>              
                <h5><span className='profile-title'>Phone:</span> {phone}</h5>
                <h5><span className='profile-title'>Email:</span> {email}</h5>
                <h5><span className='profile-title'>Adhaar No:</span> {adhar}</h5>
                <hr />
            </div>

            <div className='container purchases'>
                <h2 className='span-center'>Your Ads</h2>
                
                <table className='record-table'>
                    <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Time</th>
                    </thead>
                    {!ads && (
                    <h4 className='lnstus span-center'>No records to display.</h4>
                )}
                {(() => {
                    if(ads){
                        const adsArray = []
                        for(let i=0; i<ads.length/2; i++){
                            adsArray.push(<tr>
                                <td>{i+1}</td>
                                <td>{ads[i].prop_name}</td>
                                <td>{ads[i].price}</td>
                                <td>{ads[i].post_date.substring(0,10)}</td>
                                <td>{ads[i].post_time}</td>
                                </tr>)
                        }
                        return adsArray
                    } 
                })()}
                </table>
            </div>



            
        </>
        
        
    )
}

export default Account