import { image } from '@Assets'
import { Card, Image, Input } from '@Components'
import { translate } from '@I18n'
import classnames from 'classnames'
import React from 'react'
import { Container, Row, Col, Form, CardHeader, CardTitle, CardBody, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label, Button } from 'reactstrap'

function Cards() {


  return (
    <>
      <div className='container-fluid px-6 pt-5'
        style={{
          zoom: '95%'
        }}
      >
        <div className='row justify-content-center '>
          <div className='text-center col-sm-6'>
            <h4 className='display-3'>
              Get in Touch
            </h4>
            <p>
              Do you need more information? Please contact us to find more about our products and services.
            </p>
          </div>
        </div>
        <div className='py-3'>
          <div className='card shadow '
            style={{
              backgroundColor: '#5f6aa0'
            }}
          >
            <div className='row bg-cardGradient-primary'>
              <div className='col-sm-7'

              >
                <div className='pb-0 d-flex justify-content-center pt-4'>
                  <h1 className='display-4 text-white'>Send us a message</h1>
                </div>
                <CardBody className=''>
                  <Form
                    className="p-3"
                    id="contact-form-4"
                    method="post"
                    role="form"
                  >
                    <Row>
                      <Col md="6">
                        <label className='text-white'>First name</label>
                        <Input
                          size={'sm'}
                          style={{
                            backgroundColor: '#ecefff',
                            border: '1px solid white'
                          }}

                        />
                        
                      </Col>
                      <Col md="6">
                        <label className='text-white'>Last name</label>
                        <Input
                          size={'sm'}
                          style={{
                            backgroundColor: '#ecefff',
                            border: '1px solid white'
                          }}
                        />
                      </Col>
                    </Row>
                    <FormGroup>
                      <label className='text-white'>Email address</label>
                      <Input
                        size={'sm'}
                        style={{
                          backgroundColor: '#ecefff',
                          border: '1px solid white'
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className='text-white'>Your message</label>
                      <Input
                        id="message-3"
                        name="message"
                        rows="4"
                        type="textarea"
                        style={{
                          backgroundColor: '#ecefff',
                          border: '1px solid white'

                        }}
                      />
                    </FormGroup>
                    <Row className='text-center'>
                      <Col md="12 pt-3">
                        <Button
                          className="btn-round pull-right"
                          color="primary"
                          onClick={() => {

                          }}
                        >
                          <i className="bi bi-send pr-2"></i>
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>

              </div>

              <hr className='py-1 my-1'
                style={{
                  border: " 1px solid white",
                  height: "auto",
                  borderRight: '0px',
                  borderTop: '0px',
                  borderBottom: "0px"
                }}
              ></hr>
              

                <div className=" pb-6 pt-4 ml-5 col-sm-4">
                  <CardTitle className='text-white pb-4 display-4 ml--4'>Contact information</CardTitle>
                  <div className="row  align-items-center py-4">
                    <div className="icon ">
                      <i className="bi bi-geo-alt text-white"></i>
                    </div>
                    <div className="pt-3">
                      <h5 className="text-white">
                        No.3, First floor, Prithiv Nagar,<br></br> G.N.T Road, Gummidipoondi - 601201.
                      </h5>
                    </div>
                  </div>
                  <div className="row  align-items-center py-4">
                    <div className="icon">
                      <i className="bi bi-phone text-white" />
                    </div>
                    <div className="pt-3">
                      <h5 className="text-white">+91 9445-092-211<br></br>
                        +91 9834-054-352</h5>
                    </div>
                  </div>
                  <div className="row  align-items-center py-4">
                    <div className="icon">
                      <i className="bi bi-envelope text-white" />
                    </div>
                    <div className="pt-3">
                      <h5 className="text-white">
                        contact@leorainfotech.in
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
    </>
  )
}
export { Cards }
