import { image } from '@Assets'
import { Card, Image, Input } from '@Components'
import { translate } from '@I18n'
import classnames from 'classnames'
import React from 'react'
import { Container, Row, Col, Form, CardHeader, CardTitle, CardBody, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label, Button } from 'reactstrap'

function Cards() {





  return (
    // <div className='d-flex justify-content-center pt-5 '>
    //   <div className='container'>
    //     <div className={'row pt-5'}>
    //       <div className={'col-lg-3 col-md-6'}>
    //         <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px' }}>

    //           <div className="bg-transparent">
    //             <h3 className="text-uppercase ls-1 text-black mb-0">
    //               Silver pack
    //             </h3>
    //           </div>
    //           <hr className='horizontal dark mx--4' />
    //           <div className="">
    //             <div className="display-4 text-black ">₹499</div>
    //             <div className='pt-3'>
    //               <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Silver&amount=499'
    //                 className='bg-primary border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
    //             </div>
    //             <ul className="list-unstyled my-4">
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Documentation
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-1 text-sm text-black">
    //                       Max Ticket Raised upto 1000
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Add Member upto 250
    //                     </span>
    //                   </div>
    //                 </div>

    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Support
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Expiry = 30days
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>

    //         </Card>
    //       </div>

    //       <div className={'col-lg-3 col-md-6'}>
    //         <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px' }}>
    //           <div className="bg-transparent">
    //             <h3 className="text-uppercase ls-1 text-black mb-0">
    //               Gold Pack
    //             </h3>
    //           </div>
    //           <hr className='horizontal light mx--4' />
    //           <div className="">
    //             <div className="display-4 text-black">₹999</div>
    //             <div className='pt-3'>
    //               <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Gold&amount=999'
    //                 className=' border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
    //             </div>
    //             <ul className="list-unstyled my-4">
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Documentation
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-1 text-sm text-black">
    //                       Max Ticket Raised upto 3000
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Add Member upto 500
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Support
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Expiry = 30days
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>

    //         </Card>
    //       </div>

    //       <div className={'col-lg-3 col-md-6'}>
    //         <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px' }}>
    //           <div className="bg-transparent">
    //             <h3 className="text-uppercase ls-1 text-black mb-0">
    //               Platinum Pack
    //             </h3>
    //           </div>
    //           <hr className='horizontal light mx--4' />
    //           <div className="">
    //             <div className="display-4 text-black">₹1499</div>
    //             <div className='pt-3'>
    //               <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Platinum&amount=1499'
    //                 className=' border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
    //             </div>
    //             <ul className="list-unstyled my-4">
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Documentation
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-1 text-sm text-black">
    //                       Max Ticket Raised upto 7000
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Add Member upto 750
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Support
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Expiry = 30days
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>

    //           </div>
    //         </Card>
    //       </div>

    //       <div className={'col-lg-3 col-md-6'}>
    //         <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px' }}>

    //           <div className="bg-transparent">
    //             <h3 className="text-uppercase ls-1 text-black  mb-0">
    //               Diamond Pack
    //             </h3>
    //           </div>
    //           <hr className='horizontal light mx--4' />
    //           <div className="">

    //             <div className="display-4 text-black">₹1999</div>
    //             <div className='pt-3'>
    //               <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Diamond&amount=1999'
    //                 className=' border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
    //             </div>
    //             <ul className="list-unstyled my-4">
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Documentation
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Max Ticket Raised upto UL
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-1 text-sm text-black">
    //                       Add Member upto Unlimited
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Support
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="d-flex align-items-center">
    //                   <div>
    //                     <div className="icon-md">
    //                       <i className="fas fa-check text-primary text-md"></i>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <span className="pl-2 text-sm text-black">
    //                       Expiry = 30days
    //                     </span>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>

    //           </div>

    //         </Card>
    //       </div>
    //     </div>

    //   </div>

    // </div>
    <>
      {/* <div className="contactus-4">
        <Container>
          <Row>
            <Col md="5">
              <h1 className="title">Get in Touch</h1>
              <h4 className="description text-white">
                Do you need more information? Please contact us to find more
                about our products and services.
              </h4>
            </Col>
            <Col className="m-auto" md="12">
              <Card className="">

                <CardHeader>
                  <CardTitle tag="h4">Send us a message</CardTitle>
                </CardHeader>
                <CardBody

                >
                  <div className='row'>
                    <Form
                      className="p-3"
                      id="contact-form-4"
                      method="post"
                      role="form"
                    >
                      <Row>
                        <Col md="6">
                          <label>First name</label>
                          <Input

                          />
                        </Col>
                        <Col md="6">
                          <label>Last name</label>
                          <Input

                          />
                        </Col>
                      </Row>
                      <FormGroup>
                        <label>Email address</label>
                        <Input

                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Your message</label>
                        <Input
                          id="message-3"
                          name="message"
                          rows="6"
                          type="textarea"
                        />
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <Button
                            className="btn-round pull-right"
                            color="primary"
                          >
                            Send Message
                          </Button>
                        </Col>
                      </Row>
                    </Form>

                  </div>



                </CardBody>


                <Col md="4" className='bg-info '

                  style={{
                    marginRight: '-20px'
                  }}>
                  <div className="info text-left ">
                    <CardTitle tag="h4">Contact information</CardTitle>
                    <div className="info info-horizontal mt-5">
                      <div className="icon">
                        <i className="tim-icons icon-square-pin" />
                      </div>
                      <div className="description">
                        <h5 className="info-title">
                          345 Street 2 <br />
                          Creative Tim Tour
                        </h5>
                      </div>
                    </div>
                    <div className="info info-horizontal">
                      <div className="icon">
                        <i className="tim-icons icon-mobile" />
                      </div>
                      <div className="description">
                        <h5 className="info-title">+16(3412) 421 241</h5>
                      </div>
                    </div>
                    <div className="info info-horizontal">
                      <div className="icon">
                        <i className="tim-icons icon-email-85" />
                      </div>
                      <div className="description">
                        <h5 className="info-title">
                          contact@yourwebsite.com
                        </h5>
                      </div>
                    </div>
                  </div>
                </Col>
              </Card>
            </Col>
          </Row >
        </Container >
      </div > */}
      <div className='container-fluid py-6 px-6'
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
        <div className='py-5'>
          <div className='card shadow '
            style={{
              backgroundColor: '#1f2251'
            }}
          >
            <div className='row'>
              <div className='col-sm-7'

              >
                <CardHeader className='pb-0'
                  style={{
                    backgroundColor: '#1f2251'
                  }}
                >
                  <CardTitle className='display-4 text-white'>Send us a message</CardTitle>
                </CardHeader>
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
                            backgroundColor: '#1f2251',
                            border: '1px solid white'
                          }}

                        />
                      </Col>
                      <Col md="6">
                        <label className='text-white'>Last name</label>
                        <Input
                          size={'sm'}
                          style={{
                            backgroundColor: '#1f2251',
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
                          backgroundColor: '#1f2251',
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
                          backgroundColor: '#1f2251',
                          border: '1px solid white'

                        }}
                      />
                    </FormGroup>
                    <Row className='text-center'>
                      <Col md="12 pt-3">
                        <Button
                          className="btn-round pull-right"
                          color="primary"
                        >
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
              <div className='col-sm-4 '
                style={{
                  borderRadius: '0px 5px 5px 0px',
                  backgroundColor: '#1f2251'
                }}
              >

                <div className=" pb-6 pt-4 ml-5">
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
      </div>
    </>
  )
}
export { Cards }
