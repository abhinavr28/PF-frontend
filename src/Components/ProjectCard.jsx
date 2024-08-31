import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap';
import { SERVER_URL } from '../Services/server_url';


function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(project.projectImage)

  return (
    <>
 <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" height={'200px'} src={`${SERVER_URL}/uploads/${project?.projectImage}`} onClick={handleShow} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
        <Card.Text>
         
        </Card.Text>
    
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={`${SERVER_URL}/uploads/${project?.projectImage}`} width={'100%'} alt="" />
            </Col>
            <Col md={6}>
              <h2>{project?.title}</h2>
              <p>Project OverView:{project?.overview}</p>
              <p>Languages Used: <span className='fw-bolder'>{project?.languages}</span></p>
            </Col>
          </Row>
          <div className='mt-2'>
            <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i className='fa-brands fa-github fa-2x'/></a>

            <a href={project?.website} target='_blank' className='me-3 btn text-dark'><i className='fa-solid fa-link fa-2x'></i> </a>
         
          </div>
        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard