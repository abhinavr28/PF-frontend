

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Auth from './Pages/Auth'
import { useContext } from 'react'
import { TokenAuthenticationResponseContext } from './ContextApi/TokenAuth'





function App() {
  const {isAuthorized,setIsAutherized}=useContext(TokenAuthenticationResponseContext)

  return (
    <>
  <h1>Project-Fair</h1>
  <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard/*" element={isAuthorized?<Dashboard />:<Home/>}/>
      <Route path="/login" element={<Auth />}/>
      <Route path="/register" element={<Auth register />}/>
      <Route path="/projects" element={isAuthorized?<Projects />:<Home/>}/>
      <Route path="/*" element={<Navigate to={'/'}/>}/>
      
  </Routes>
  <Footer/>
    </>
  )
}

export default App
