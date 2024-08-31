import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'
import {Col ,Row } from 'react-bootstrap'


function Dashboard() {
  const [username,setUsername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUsername(sessionStorage.getItem("username"))
    }else{
      setUsername("")
    }
  },[])
  return (
    <>
<Header insideDashBoard/>
<Row>

  {/* my projects */}
    <Col sm={12} md={8}>
      <h2>Welcome <span className='text-warning fw-bolder'>{username}</span></h2>
      <MyProjects/>
    </Col>
  {/* profile */}
  <Col sm={12} md={4}>
    <Profile/>
  </Col>
</Row>
    </>
  )
}

export default Dashboard