/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { icons, image } from '@Assets';
import { Image, Button, Input, Divider, Badge, Card } from '@Components';
import { translate } from "@I18n";
import { Link } from 'react-router-dom';
import { Container, Row, Col, CardBody, UncontrolledTooltip } from 'reactstrap';
function Form() {
  return (
    <>

      <section className="py-5 pb-9 ">
        <Container fluid>
          <Row className="justify-content-center text-center">
            <Col md="11">
              <h2 className="display-3 ">
              Creation, Tracking, and Collaboration
              </h2>
              <p className="lead ">
              Quanta TMS empowers seamless creation, tracking, and collaboration with its cutting-edge ticket and task management features. Effortlessly manage tasks and tickets, track progress in real-time, and collaborate efficiently for enhanced productivity. Experience the power of streamlined operations and transparent communication with Quanta TMS.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-lg pt-lg-0 mt--8">
        <Container>
          <Row className=" justify-content-center">
            <h2 className="display-4 container text-center ">
              Collaboration and Communication Suite
            </h2>
            <Col lg="12 pt-5">
              <Row>

                <Col lg="4"
                >
                  <Card className="card-lift--hover shadow border-1"
                 
                  >
                    <CardBody className="py-3">
                      <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                        {/* <i className="ni ni-check-bold" /> */}
                        <i className="bi bi-clock-fill text-white " style={{fontSize: '24px'}}></i>
                     
                      </div>
                      <h4 className="h3 text-black text-uppercase">
                        Timesheet module
                      </h4>
                      <p className="description text-black mt-3">
                        Timesheet module tracks employee tasks and time spent, allowing efficient management of assigned work and progress monitoring.

                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-3">
                      <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                      <i className="bi bi-wechat"style={{fontSize: '27px'}} ></i>
                      </div>
                      <h4 className="h3 text-black text-uppercase">
                        Group Module
                      </h4>
                      <p className="description text-black mt-3">
                        Group module enables users to create and participate in group chats for seamless communication and collaboration.

                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-lift--hover  shadow border-0">
                    <CardBody className="py-3">
                      <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                      <i className="bi bi-messenger " style={{fontSize: '24px'}}></i>
                      </div>
                      <h4 className="h3 text-black text-uppercase">
                        Chat
                      </h4>
                      <p className="description text-black mt-3">
                        Chat module allows one-on-one direct communication, supporting text messages and file sharing for easy collaboration.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="6">
              <img
                alt="..."
                className="img-fluid"
                src={icons.landingImg}
              />
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h1>Filtering and Tracking Tasks </h1>
                <p>
                  With Quanta TMS, users can easily filter and track tasks using criteria such as title, code, assigned to, created date, status, and priority. This feature ensures efficient task management and allows users to stay on top of their workload.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container className='py-4'>
        {/* icon icon-shape bg-gradient-success text-white rounded-circle shadow mb-4 */}
          <Row className="row-grid align-items-center justify-content-center ">
          <h2 className="display-4 container text-center mb-5 ">
              
            Integrated Features

            </h2>
            <Col className={'col-lg-3 col-sm-12 '}>
            <CardBody className={'card '} style={{height:'360px'}}>
              <div className={'text-center justify-content-center  mb-2 mt--2'}>
              {/* <Image src={icons.taskCommunication} height={110} width={120} /> */}
              
              <i className="bi bi-chat-text-fill text-white icon icon-shape bg-gradient-success rounded-circle shadow " style={{fontSize:'22px'}}></i>

              </div>
             
              
                      
                        <h5 className="h3 text-center">Comments</h5>
                        <p>
                        Quanta TMS's dedicated comment section fosters seamless communication among team members, ensuring smooth and effective collaboration throughout the project.
                        </p>
                      </CardBody>

            </Col>
            <Col className={'col-lg-3 col-sm-12'}>
            <CardBody className={'card '} style={{height:'360px'}}>
            <div className={'text-center justify-content-center  mb-2 mt--2'}>
                      
            <i className="bi bi-image-fill text-white icon icon-shape bg-gradient-primary rounded-circle shadow " style={{fontSize:'22px'}}></i>
            </div>
                        <h5 className="h3 text-center">Gallery</h5>
                        <p>
                        Quanta TMS allows users to view and attach relevant files, documents, or images to tasks, ensuring comprehensive documentation and easy access to essential task-related information.

                        </p>
                      </CardBody>

            </Col>
            <Col className={'col-lg-3 col-sm-12'}>
            <CardBody className={'card '} style={{height:'360px'}}>
            <div className={'text-center justify-content-center  mb-2 mt--2'}>
            <i className="bi bi-search text-white icon icon-shape bg-gradient-info rounded-circle shadow  " style={{fontSize:'22px'}}></i>
                      </div>
                  
                        <h5 className="h3 text-center">Reference</h5>
                        <p>
                        Users can add reference tasks to gain insights into previously handled similar tasks, providing valuable context for better decision-making and task management.
                        </p>
                      </CardBody>

            </Col>

            <Col className={'col-lg-3 col-sm-12'}>
            <CardBody className={'card '} style={{height:'360px'}}>
            <div className={'text-center justify-content-center  mb-2 mt--2'}>
            <i className="bi bi-people-fill text-white icon icon-shape bg-gradient-warning rounded-circle shadow " style={{fontSize:'22px'}}></i>
                      </div>
                      
                        <h5 className="h3 text-center">Users</h5>
                        <p>
                        Quanta TMS, users can effortlessly identify the task initiator, view the list of involved individuals, and determine the assigned person responsible for each task.
                        </p>
                      </CardBody>

            </Col>

        
          </Row>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <img
                alt="..."
                className="img-fluid"
                src={icons.landingImg1}
              />
            </Col>
            <Col md="6">
              <div className="pr-md-5">
                <h1>Ticket Module &  Creation </h1>
                <p>
                The Ticket Module in TMS enables users to manage and resolve issues efficiently. It offers a user-friendly interface to create tickets to specific users or external stakeholders. This streamlines issue tracking, enhances collaboration, and ensures prompt resolution within organizations.

                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="6">
              <img
                alt="..."
                className="img-fluid"
              src={icons.landingImg2}
              />
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h1>Association </h1>
                <p>
                  The Association Module in TMS enables users to view registered companies under their association and add new ones. It manages company-related information, promoting collaboration. Users access a centralized view of associated companies and their details, facilitating efficient organization within the system.
                </p>
                {/* <Link
                  className="font-weight-bold text-info mt-5"
                  to="/admin/widgets"
                >
                  Explore widgets
                </Link> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <img
                alt="..."
                className="img-fluid"
                src={icons.landingImg3}
              />
            </Col>
            <Col md="6">
              <div className="pr-md-5">
                <h1>Streamlined Company Management</h1>
                <p>
                Quanta TMS offers centralized company management, displaying registered companies under an association and allowing efficient addition of new company information, streamlining company organization within the system.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="6">
              <img
                alt="..."
                className="img-fluid"
              src={icons.landingImg4}
              />
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h1>Virtual Conference</h1>
                <p>
                  Virtual Conference in TMS facilitates seamless online meetings between users and companies. It enables video calls, file sharing, and real-time discussions, promoting collaboration and communication for effective team interactions and decision-making.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <img
                alt="..."
                className="img-fluid"
                src={icons.landingImg5}
              />
            </Col>
            <Col md="6">
              <div className="pr-md-5">
                <h1>Event Management</h1>
                <p>
                Quanta TMS simplifies event organization with its feature-rich module. Admins can create, manage, and track events, specifying details like date, time, location, and attachments, ensuring seamless collaboration and effective communication. Experience streamlined event planning with Quanta TMS.
                </p>
                {/* <Link
                  className="font-weight-bold text-warning mt-5"
                  to="/admin/profile"
                >
                  Explore pages
                </Link> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6" className='order-md-2'>
              <img
                alt="..."
                className="img-fluid"
                src={icons.landingImg6}
              />
            </Col>
            <Col md="6">
              <div className="pr-md-5">
                <h1>Feeds Module</h1>
                <p>
                Quanta TMS offers a dynamic platform for real-time information sharing and updates. Admins can post important announcements, news, and updates, fostering efficient communication and engagement within the organization. Additionally, for external communication, associated companies can receive announcements from our company, ensuring seamless collaboration with Quanta TMS feeds.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    





    </>
  )
}

export { Form }