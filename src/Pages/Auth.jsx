import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form , Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPI';
import { TokenAuthenticationResponseContext } from '../ContextApi/TokenAuth';




function Auth({ register }) {
  const {isAuthorized,setIsAutherized}=useContext(TokenAuthenticationResponseContext)
  const [loginStatus,setloginStatus]=useState(false)
  const isRegisterForm = register ? true : false

const navigate = useNavigate()
  const[userData,setUserData]=useState({
    username:"",email:"",password:""
  })
  const handleRegister=async(e)=>{
    e.preventDefault()
    console.log(userData);
    const{username,email,password}=userData
    if(!username || !email || !password){
      toast.info("please fill all the fields")
    }else{
      // toast.success("proceed to api call")
      try{
        const result = await registerAPI(userData)
        console.log(result);
         if(result.status===200){
           toast.success(`${result.data.username} has successfully registered`)
           setUserData({
                   username:"",email:"",password:""

           })
           setTimeout(()=>{
             navigate('/login')
           },3000);
         }else{
           toast.warning(result.response.data)
         }
      }catch(err){
        console.log(err);
       
      }
    }
  }

const handlelogin= async (e)=>{
  e.preventDefault()
  const{email,password}=userData
  if(!email || !password) {
    toast.error('Please fill all the fields')
  }else{
    try{
      const result=await loginAPI({email,password})
      console.log(result)
      if(result.status===200){
        setloginStatus(true)
        sessionStorage.setItem("username",result.data.existingUser.username)
        sessionStorage.setItem("token",result.data.token)
        setIsAutherized(true)
        setUserData({
          email:"",password:""
        })


        setTimeout(()=>{        
          navigate('/')
          setloginStatus(false)
        },2000);
      }else{
        toast.warning(result.response.data)
      }
  }catch(err){
    console.log(err);
  }
}
}
  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='w-17 container'>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bolder' }}> <i class="fa-solid fa-arrow-left"></i>Back to Home</Link>
          <div className="card shadow p-3 bg-info">
            <div className='row align-items-center'>
              <div className='col-lg-6'>
                <img src="https://media.giphy.com/media/XpVJxOBid9P6U/giphy.gif" className='rounded-start w-100' alt="" />
              </div>
              <div className='col-lg-6'>
                <div className='d-flex align-items-center flex-column'>
                  <h1 className='fw-bolder text-secondary mt-2'><i className='fa-solid fa-list-check me-2'></i>Project Fair</h1>
                  <h5 className='fw-bolder text-secondary pb-5 mt-3'>
                    {
                      isRegisterForm ? 'sign up to your account' : 'sign in to your account'
                    }
                  </h5>
                  <Form className='text-light w-100'>
                    {
                      isRegisterForm &&

                      <Form.Group className="mb-3" controlId='formBasicName' >

                        <Form.Control type='text' placeholder='enter your username' onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} />
                      </Form.Group>

                    }
                   
                    <Form.Group className="mb-3" controlId='Email' >

                    <Form.Control type='email' placeholder='Enter your Email' onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} />
                      </Form.Group>

                    <Form.Group className="mb-3" controlId='formBasicPassword' >

                      <Form.Control type='password' placeholder='Enter Your Password'  onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} />
                    </Form.Group>
                    {
                      isRegisterForm ?
                        <div>
                          <button className='btn btn-primary mb-2' onClick={handleRegister}>Register</button>
                          <p>Already have an account?Click here to <Link to={'/login'} style={{ textDecoration: 'none', color: 'green' }}>Login</Link></p>
                        </div> :

                        <div>
                          <button className='btn btn-primary mb-2' onClick={handlelogin}>Login  {loginStatus&&<Spinner animation="border" variant="info" />}</button>
                          <p>New User?Click here to <Link to={'/register'} style={{ textDecoration: 'none', color: 'green' }}>Register</Link></p>
                        </div>
                    }

                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
        position='top-center'
        autoClose={3000}
        theme='colored'/>
      </div>
    </>
  )
}

export default Auth