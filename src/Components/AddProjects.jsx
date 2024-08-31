import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';
import { addProjectResponseContext } from '../ContextApi/ContextShare';
import { useContext } from 'react';




function AddProjects() {
  // get context
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

  // state
  const[preview,setPreview]=useState("")
  const[fileStatus,setFileStatus]=useState(false)
    const[projectData,setProjectData]=useState({
      title:"",languages:"",github:"",website:"",overview:"",projectImage:""
    })

console.log(projectData);


    const [show, setShow] = useState(false);


    const handleClose = () => {
      setProjectData ({
        title:"",languages:"",github:"",website:"",overview:"",projectImage:""
      })
      setShow(false)
      setPreview("")
    } 
    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(projectData.projectImage.type=="image/png"||projectData.projectImage.type=="image/jpg"||projectData.projectImage.type=="image/jpeg"){
        console.log("generate url");
        setPreview(URL.createObjectURL(projectData.projectImage));
        setFileStatus(false)
      }else{
        console.log("please upload following formats [jpeg/png/jpg] only...");
        setFileStatus(true)
        setPreview("")
        setProjectData({...projectData,projectImage:""})
      }
    },[projectData.projectImage])

    const handleAddProject= async()=>{
      const{title,languages,github,website,overview,projectImage}=projectData
      if(!title || !languages || !github || !website || !overview || !projectImage){
        toast.info("please fill missing fields")
      }else{
        // proceed to api call
        // req body
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        reqBody.append("projectImage",projectImage)

        // reqHeader
        const token = sessionStorage.getItem("token")
        console.log(token);
        if(token){
        const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
        }
        // api call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            handleClose()
            setAddProjectResponse(result.data)
          }else{
            toast.warning(result.response.data)
          }
        }
        catch(error){
          console.log(result);
  
        }
    
        }
      }
    }
  
  return (
    <>
  <Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Projects Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className='row'>
        <div className='col-6'>
            <label>
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                <img width={'300px'} src={preview?preview:"https://icon-library.com/images/upload-picture-icon/upload-picture-icon-20.jpg"} alt="imgplaceholder" />
            </label>
            { fileStatus&& <div className='mt-2 text-danger'>please upload following formats [jpeg/png/jpg] only....</div>}
        </div>
        <div className='col-6'>
            <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project Title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
            </div>
            <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Languages Used' value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
            </div>
            <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Github link' value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} />
            </div>
            <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Website Link' value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
            </div>
            <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project Overview' value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
            </div>
        </div>

       </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position='top-center'
        autoClose={3000}
        theme='colored'/>
    </>
  )
}

export default AddProjects