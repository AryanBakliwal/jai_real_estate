import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
  import './home-log-style.css'


const Login = () => {

  const [justifyActive, setJustifyActive] = useState('tab1');;
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const[loginStatus, setLoginStatus] = useState('')

  const [nameReg, setNameReg] = useState('')
  const [phoneReg, setPhoneReg] = useState('')
  const [dobReg, setDobReg] = useState('')
  const [adharReg, setAdharReg] = useState('')
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post('http://localhost:5000/register', {
      name: nameReg,
      dob: dobReg,
      adhar: adharReg,
      phone: phoneReg,
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
      setLoginStatus(response.data.message)
    })
  }

  const signin = () => {
    Axios.post('http://localhost:5000/signin', {
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
      if(response.data.message){
        console.log(response.data.message)
        setLoginStatus(response.data.message)
      }
      else{
        setLoginStatus(response.data[0].user_name);
        window.location.href = '/';
      }
      console.log(response);
    })
  }

  useEffect(() => {
    Axios.get('http://localhost:5000/signin').then((response) => {
      if(response.data.loggedIn === true){
        setLoginStatus(response.data.user[0].user_name);
      } 
    }) 
  }, [])

  return (
    <>
      <div className='cont loggin'>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between lginrgstr'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          
          <br />

          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === 'tab1'}>
              <MDBInput wrapperClass='mb-4 inpt' label='Email address' id='form1' type='email'  onChange={(e) => {
                  setUsernameReg(e.target.value);
              }}/>
              <MDBInput wrapperClass='mb-4 inpt' label='Password' id='form2' type='password'  onChange={(e) => {
                  setPasswordReg(e.target.value);
              }}/>
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>
              <MDBBtn onClick={signin} className="mb-4 w-100 lbtn">Sign in</MDBBtn>
            </MDBTabsPane>
            
            <MDBTabsPane show={justifyActive === 'tab2'}>
              <MDBInput wrapperClass='mb-4 inpt' label='Full Name' id='form1' type='text'  onChange={(e) => {
                  setNameReg(e.target.value);
              }}/>
              <MDBInput wrapperClass='mb-4 inpt' label='Date of Birth' id='form1' type='date'  onChange={(e) => {
                  setDobReg(e.target.value);
              }}/>
              <MDBInput wrapperClass='mb-4 inpt' label='Mobile no.' id='form1' type='tel' onChange={(e) => {
                setPhoneReg(e.target.value);
            }}/>
              <MDBInput wrapperClass='mb-4 inpt' label='Email' id='form1' type='email' onChange={(e) => {
                  setUsernameReg(e.target.value);
              }}/>
              <MDBInput wrapperClass='mb-4 inpt' label='Adhaar no.' id='form1' type='text'  onChange={(e) => {
                  setAdharReg(e.target.value);
              }}/>
              <MDBInput wrapperClass='mb-4 inpt' label='Password' id='form1' type='password' onChange={(e) => {
                  setPasswordReg(e.target.value);
              }}/>
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
              </div>
              <MDBBtn onClick={register} className="mb-4 w-100 lbtn">Sign up</MDBBtn>
            </MDBTabsPane>
          </MDBTabsContent>
          {loginStatus && (
            <h4 className='lnstus'>{loginStatus}</h4>
          )}
        </MDBContainer>
      </div>

    </>
  )
}

export default Login



