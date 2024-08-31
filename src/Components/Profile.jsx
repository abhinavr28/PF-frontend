import React from 'react'
import { useState } from 'react';

import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);

  return (
    <>
<div style={{marginTop:'100px'}}>

    <div className='card shadow p-3 mt-3 me-2'>
        <div className='d-flex  justify-content-between'>
            <h1>Profile</h1>
            <button       onClick={() => setOpen(!open)} className='btn-btn-outline-info'>
                <i class="fa-solid fa-angle-down fa-beat-fade"></i>
            </button>
        </div>
        <Collapse in={open}>

        <div className='row justify-content-center mt-3'>
<label>
    <input type="file" style={{display:'none'}} />
    <img width={'200px'} height={'200px'} src="https://th.bing.com/th/id/OIP.1zbq9zYXw_Ow4a9qFA6dUAAAAA?w=360&h=360&rs=1&pid=ImgDetMain" alt="profile" />
</label>
<div className='mt-5'>
    <input type="text"  placeholder='Github link' className='form-control'/>
    <br />
    <input type="text" placeholder='LinkIn Link' className='form-control' />
</div>
<div className='d-grid mt-2'>
    <button className='btn btn-warning'>update</button>
</div>
        </div>

        </Collapse>
  
    </div>
</div>
    </>
  )
}

export default Profile