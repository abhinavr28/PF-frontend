import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import ContextShare from './ContextApi/ContextShare.jsx'
import TokenAuth from './ContextApi/TokenAuth.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TokenAuth>

    <ContextShare>
       <BrowserRouter>
     <App />
    </BrowserRouter>
    </ContextShare>
    </TokenAuth>
  </React.StrictMode>,
)
