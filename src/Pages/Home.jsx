import React, { useEffect, useState } from 'react'
import { Col, Row} from 'react-bootstrap';
import ProjectCard from '../Components/ProjectCard';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../Services/allAPI';



function Home() {

  const[isLoggedIn,setIsLoggedIn]=useState(false)
  const[allProjects,setAllProjects]=useState([])
const navigate = useNavigate()

const getHomeProjects= async()=>{
  const result = await getHomeProjectsAPI()
  if(result.status===200){
    setAllProjects(result.data)
  }else{
    console.log(result)
  }
}
console.log(allProjects)

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem('token')){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
    },[])

    const handleProjectsPage =()=>{
      if(sessionStorage.getItem("token")){
        navigate('/projects')
      }else{
        toast.warning('please login')
      }
    }
  return (
    <>
<div className='container-fluid rounded bg-info'>
  <Row className='align-items-center p-5'>
    <Col sm={12} md={6}>
      <h1 style={{fontSize:'80px'}} className='fw-bolder text-black'><i className='fa-solid fa-list-check me-2'></i>Project-Fair</h1>
      <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat incidunt exercitationem provident blanditiis impedit quam maxime fugit id hic dicta dolore quod cupiditate possimus esse, aperiam quibusdam iusto iure commodi!</p>

      { isLoggedIn?<Link to={'/dashboard'} className='btn btn-warning'>Manage Project</Link>:
      
      <Link to={'/login'} className='btn btn-warning'>Start to Explore</Link>}
    </Col>
    <Col sm={12} md={6}>
      <img src="https://www.vkreate.in/storage/services_image/2019-10-02-17-55-54-5d94e4aa809b3-web-development.gif" width={'500px'} alt="" />
    </Col>
  </Row>
</div>
{/* all projects */}

<div className='all-projects mt-5'>
  <h1 className='text-primary fw-bolder text-center'> Explore Your Projects</h1>
  <marquee scrollAmount={25}>
    <Row>
      {allProjects.length>0?
      allProjects.map((project,index)=>(

        <Col key={index} sm={12} md={6} lg={4}>
        <ProjectCard project={project}/>
      </Col>
      )):null
      }

     

    </Row>
  </marquee>
  <div className='text-center mt-5'><p to={'/projects'} onClick={handleProjectsPage}>View More Projects </p> </div>
  <ToastContainer
        position='top-center'
        autoClose={3000}
        theme='colored'/>
</div>
    </>
  )
}

export default Home