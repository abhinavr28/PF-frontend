import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthenticationResponseContext } from '../ContextApi/TokenAuth'


function Header({insideDshBoard}) {
  const navigate =  useNavigate()
  const {isAuthorized,setIsAutherized}=useContext(TokenAuthenticationResponseContext)
  const handleLogout=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setIsAutherized(false)
    navigate('/')
  }
  return (
    <div>
         <Navbar className="bg-info">
        <Container>
          <Navbar.Brand href="#home">
          <Link to={'/'} style={{textDecoration:"none",color:'white'}}>
            <i className='fa-solid fa-list-check me-2'></i>
            Project-Fair
          </Link>
          </Navbar.Brand>
          {
            insideDshBoard&&
            <button className='btn text-dark border' onClick={handleLogout}>Logout</button>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header