import React, { useEffect, useState,useContext} from 'react'
import AddProjects from './AddProjects'
import { deleteUserProjectsAPI, getUserProjectsAPI } from '../Services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../ContextApi/ContextShare'
import EditProject from './EditProject'






function MyProjects() {
  const {editProjectResponse, setEditProjectResponse}= useContext(editProjectResponseContext)
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [allProjects,setAllProjects]=useState([])

  const getUserProject=async()=>{
  const token= sessionStorage.getItem("token")
  if(token){
    const reqHeader ={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    const result = await getUserProjectsAPI(reqHeader)
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      console.log(result)
    }
  }
  }
  useEffect(()=>{
    getUserProject()
  },[addProjectResponse,editProjectResponse])

  const handleDelete= async(pid)=>{
    
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
    }
    const result = await deleteUserProjectsAPI(pid,reqHeader)
    if(result.status===200){
      getUserProject()
    }else{
      toast.warning(result.response.data)
    }
  }
}
  return (
    <>
    <div className='card shadow p-3 mt-5'>
      <div className='d-flex'>
        <h2>My Projects</h2>
        </div>
        <div className='ms-auto'>
          <AddProjects/>
        </div>
        <div className='mt-4'>
          {/* collection of users projetcs */}
          {allProjects.length>0?
          allProjects.map((project,index)=>(
            <div className='border d-flex align-items-center rounded p-3'>
            <h5>{project?.title}</h5>
            <div className='ms-auto d-flex'>
             <EditProject project={project}/>
              <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i className='fa-brands fa-github fa-2x'/></a>
              <button onClick={()=>handleDelete(project?._id)} className='btn text-dark'><i className='fa-solid fa-trash'></i></button>
            </div>
            </div>
          )):<p className='text-danger fw-bolder'>No Projects Added Yet!!</p>}
         
          
   
        
      </div>
    </div>

    </>
  )
}

export default MyProjects