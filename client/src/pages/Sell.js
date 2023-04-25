import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './home-log-style.css'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTabsPane,
    MDBTabsContent,
    MDBTabsLink,
    MDBTabsItem,
    MDBTabs
  }
  from 'mdb-react-ui-kit';

const Sell = () => {

    const[loginStatus, setLoginStatus] = useState('')
    useEffect(() => {
        Axios.get('http://localhost:5000/sell').then((response) => {
        setLoginStatus(response.data.loggedIn)
        console.log(response.data.loggedIn)
        })
    }, [])

    const [ptype, setPtype] = useState('1')
    const [justifyActive, setJustifyActive] = useState('tab1');
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
          return;
        }
    
        setJustifyActive(value);
        
      };

      const [nameSell, setNameSell] = useState('')
      const [addSell, setAddSell] = useState('')
      const [priceSell, setPriceSell] = useState('')
      const [descSell, setDescSell] = useState('')

      const [pArea, setPArea] = useState('')
      const [pSize, setPSize] = useState('')

      const [buildName, setBuildName] = useState('')
      const [floorNo, setFloorNo] = useState('')
      const [fArea, setFArea] = useState('')
      const [fSize, setFSize] = useState('')

      const [noFloor, setNoFloor] = useState('')
      const [hArea, setHArea] = useState('')
      const [hSize, setHSize] = useState('')

    

    return (
        <>
            {loginStatus && (
                <div className='container post-ad'>
                    <h2 className='span-center'>Post your ad</h2>

                    <MDBContainer fluid>

      <MDBRow className='justify-content-center align-items-center m-5'>

        <MDBCard>
          <MDBCardBody className='px-4'>

            

            <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Name' size='lg' id='form1' type='text' onChange={(e) => {setNameSell(e.target.value)}}/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Address' size='lg' id='form2' type='text' onChange={(e) => {setAddSell(e.target.value)}}/>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Price' size='lg' id='form3' type='text' onChange={(e) => {setPriceSell(e.target.value)}}/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Description' size='lg' id='form4' type='text' onChange={(e) => {setDescSell(e.target.value)}}/>
              </MDBCol>
              </MDBRow>

              <br />

              <MDBRow md='12'>
              <MDBTabs justify className='mb-3 sell-tabs'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => {handleJustifyClick('tab1'); setPtype('1'); }} active={justifyActive === 'tab1'}>
            Plot
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => {handleJustifyClick('tab2'); setPtype('2')}} active={justifyActive === 'tab2'}>
            Flat
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => {handleJustifyClick('tab3'); setPtype('3')}} active={justifyActive === 'tab3'}>
            House
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>
        <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Plot Area' size='lg' id='form1' type='text' placeholder='Squarefeet' onChange={(e) => {setPArea(e.target.value)}}/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Plot Size' size='lg' id='form2' type='text' placeholder='L X B' onChange={(e) => {setPSize(e.target.value)}}/>
              </MDBCol>
            </MDBRow>
            
        </MDBTabsPane>
        
        <MDBTabsPane show={justifyActive === 'tab2'}>
        <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Building Name' size='lg' id='form1' type='text' onChange={(e) => {setBuildName(e.target.value)}}/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Floor no.' size='lg' id='form2' type='text' onChange={(e) => {setFloorNo(e.target.value)}}/>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Flat Area' size='lg' id='form3' type='text' placeholder='Squarefeet' onChange={(e) => {setFArea(e.target.value)}}/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Flat Size' size='lg' id='form4' type='email' placeholder='BHK' onChange={(e) => {setFSize(e.target.value)}}/>
              </MDBCol>
              </MDBRow>
        </MDBTabsPane>
        
        <MDBTabsPane show={justifyActive === 'tab3'}>
        <MDBRow>
              <MDBCol md='4'>
                <MDBInput wrapperClass='mb-4' label='Area' size='lg' id='form1' type='text' placeholder='Squareft.' onChange={(e) => {setNoFloor(e.target.value)}}/>
              </MDBCol>
              <MDBCol md='4'>
                <MDBInput wrapperClass='mb-4' label='Size' size='lg' id='form2' type='text' placeholder='L X B' onChange={(e) => {setHArea(e.target.value)}}/>
              </MDBCol>
            
              <MDBCol md='4'>
                <MDBInput wrapperClass='mb-4' label='No. of floors' size='lg' id='form3' type='text' onChange={(e) => {setHSize(e.target.value)}}/>
              </MDBCol>
              
              </MDBRow>
        </MDBTabsPane>
      </MDBTabsContent>
              </MDBRow>

                      
              <br />
            
              <div class="text-center">
                <button type="button" class="btn btn-primary">Submit</button>
                </div>

          </MDBCardBody>
        </MDBCard>

      </MDBRow>
    </MDBContainer>

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

export default Sell