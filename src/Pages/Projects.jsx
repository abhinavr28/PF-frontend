import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import {Col,Row} from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllUserProjectsAPI } from '../Services/allAPI'




function Projects() {
  const[searchKey,setSearchKey]=useState("")
  const [allProjects,setAllProjects]=useState([])

  const getAllUserProject=async()=>{
    const token =sessionStorage.getItem('token')
    if(token){
      const reqHeader ={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
      }
      const result = await getAllUserProjectsAPI(searchKey,reqHeader)
      if(result.status===200){
        setAllProjects(result.data)
      }else{
        console.log(result);
      }
    }
  }
  useEffect(()=>{
    getAllUserProject()
  },[searchKey])

  return (
    <>
    <Header/>
    <div className='projects'>
      <h1 className='text-center mb-5'>
        All Projects
        </h1>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='d-flex border w-50 rounded mb-3'>
          <input type="text" className='form-control' placeholder='search by technologies' onChange={e=>setSearchKey(e.target.value)} />
          <i style={{marginLeft:'-50px'}} className='fa-solid fa-magnifying-glass fa-rotate-90'></i>
        </div>
      </div>
    </div>
    <Row className='mt-5 container-fluid'>
      {allProjects.length>0?
    allProjects.map((project,index)=>(
      <Col key={index} sm={12} mb={6} lg={4}>
 <ProjectCard project={project}/>

      </Col>
 
    )):<div className='text-danger fw-bolder fs-3'>Nothing to Display</div>}
    </Row>
    </>
  )
}

export default Projects