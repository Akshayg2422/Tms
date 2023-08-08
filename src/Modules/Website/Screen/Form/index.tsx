/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { icons, image } from '@Assets';
import { Image, Button, Input, Divider, Badge, Card } from '@Components';
import { translate } from "@I18n";
import { Link } from 'react-router-dom';
import { Container, Row, Col, CardBody, UncontrolledTooltip } from 'reactstrap';
function Form() {
  return (
    <div> 
      <section className="pt-5 pb-9 ">
        <Container fluid>
          <Row className="justify-content-center text-center">
            <Col md="11">
              <h2 className="display-3 ">
                Creation, Tracking, and Collaboration
              </h2>
              <p className="lead ">
                Quanta TMS offers a centralized hub for registered companies associated with an organization.
                Users can effortlessly add new company details, enhancing organization within the system.
                This feature promotes efficiency and collaboration among entities, optimizing company management.
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
                    <CardBody className="pt-3">
                      <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                        {/* <i className="ni ni-check-bold" /> */}
                        <i className="bi bi-clock-fill text-white " style={{ fontSize: '24px' }}></i>

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
                        <i className="bi bi-wechat" style={{ fontSize: '27px' }} ></i>
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
                        <i className="bi bi-messenger " style={{ fontSize: '24px' }}></i>
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
      <section className="pt-4">
        <Container >
          <Row className="row-grid align-items-center" >
            <Col className="order-md-2 justify-content-center d-flex " md="6" >
              <Image
                alt="..."
                className=" "
                src={icons.TaskList2}
                height={'100%'}
                width={'100%'}


              />
            </Col>
            <Col className="order-md-1 justify-content-center d-flex " md="6" >
              <div className="pr-md-5">
                <h1>Task Progress and Management</h1>
                <p>
                  Quanta TMS streamlines task management and collaboration by enabling effective communication between task initiators and team members.
                  Its intuitive interface ensures seamless progress tracking, enhancing transparency and accountability.
                  The sub-task functionality empowers users to handle complex projects by creating sub-tasks within parent tasks.
                  User tagging facilitates collaboration, engaging the right team members for specific tasks and fostering teamwork.
                  Additionally, Quanta TMS allows easy ETA updates for tasks, aiding decision-making and progress tracking.
                  This system optimizes task management for heightened project efficiency.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6" className='justify-content-center d-flex align-item-center'>
              <Image
                alt="..."
                className=""
                src={icons.TicketsModule}
                height={'100%'}
                width={'100%'}
              />
            </Col>
            <Col md="6" className='justify-content-center d-flex '>
              <div className="pr-md-5">
                <h1>Ticket Progress and Management</h1>
                <p>
                  Quanta TMS streamlines ticket management, fostering smooth collaboration between initiators and assignees.
                  Efficiently monitor ticket progress, promoting accountability.
                  It facilitates collaborative ticket handling through user tagging, involving the right team members.
                  Moreover, it simplifies reassignment for optimal resource utilization.
                  Quanta TMS allows easy ETA updates, ensuring everyone is informed about project timelines.
                  The platform offers timeline tracking for significant ticket events, enhancing transparency and workflow visibility.

                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2 justify-content-center d-flex align-item-center" md="6">
              <Image
                alt="..."
                className=""
                src={icons.Association}
                height={'100%'}
                width={'100%'}
              />
            </Col>
            <Col className="order-md-1 justify-content-center d-flex " md="6">
              <div className="pr-md-5">
                <h1>Association </h1>
                <p>

                  Quanta TMS enables easy integration of associate companies, efficient user information management,
                  and streamlined task and ticket tracking for both your company and associated entities.
                  It offers organized access to stored associate company data, allowing quick retrieval of specific details.
                  By adding individual associate companies, complete with essential information and primary contacts, communication and organization are enhanced.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6" className='justify-content-center d-flex '>
              <Image
                alt="..."
                className=""
                src={icons.CompanyManage}
                height={'100%'}
                width={'100%'}
              />
            </Col>
            <Col md="6" className='justify-content-center d-flex '>
              <div className="pr-md-5 ">
                <h1>Company Insights</h1>
                <p>
                  Quanta TMS offers centralized company management, displaying registered companies under an association and allowing efficient addition of new company information, streamlining company organization within the system.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container className='pt-4'>
          <Row className="row-grid align-items-center justify-content-center ">
            <h2 className="display-4 container text-center mb-5 ">

              Integrated Features

            </h2>

            <Col className={'col-lg-3 col-sm-12 check'}>
              <div className='card1' style={{ height: '370px' }}>
                <div className={'text-center d-flex justify-content-center  mb-2 mt--2 '}>

                  <i className="bi bi-chat-text-fill text-white icon icon-shape bg-gradient-success rounded-circle shadow " style={{ fontSize: '22px' }}></i>

                </div>
                <h5 className="h3 text-center">Comments</h5>
                <p>
                  Quanta TMS's dedicated comment section fosters seamless communication among team members, ensuring smooth and effective collaboration throughout the project.
                </p>
              </div>
            </Col>

            <Col className={'col-lg-3 col-sm-12 check'}>
              <div className='card2' style={{ height: '370px' }}>
                <div className={'text-center d-flex justify-content-center  mb-2 mt--2'}>

                  <i className="bi bi-image-fill text-white icon icon-shape bg-gradient-primary rounded-circle shadow " style={{ fontSize: '22px' }}></i>
                </div>
                <h5 className="h3 text-center">Gallery</h5>
                <p>
                  Quanta TMS allows users to view and attach relevant files, documents, or images to tasks, ensuring comprehensive documentation and easy access to essential task-related information.

                </p>
              </div>

            </Col>
            <Col className={'col-lg-3 col-sm-12 check'}>
              <div className='card3' style={{ height: '370px' }}>
                <div className={'text-center d-flex justify-content-center  mb-2 mt--2'}>
                  <i className="bi bi-search text-white icon icon-shape bg-gradient-info rounded-circle shadow  " style={{ fontSize: '22px' }}></i>
                </div>

                <h5 className="h3 text-center">Reference</h5>
                <p>
                  Users can add reference tasks to gain insights into previously handled similar tasks, providing valuable context for better decision-making and task management.
                </p>
              </div>

            </Col>

            <Col className={'col-lg-3 col-sm-12 check'}>
              <div className='card4 ' style={{ height: '370px' }}>
                <div className={'text-center d-flex justify-content-center  mb-2 mt--2'}>
                  <i className="bi bi-people-fill text-white icon icon-shape bg-gradient-warning rounded-circle shadow " style={{ fontSize: '22px' }}></i>
                </div>

                <h5 className="h3 text-center">Users</h5>
                <p>
                  Quanta TMS, users can effortlessly identify the task initiator, view the list of involved individuals, and determine the assigned person responsible for each task.
                </p>
              </div>

            </Col>


          </Row>
        </Container>
      </section>



      <section className="pt-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2 justify-content-center d-flex align-item-center" md="6">
              <Image
                alt="..."
                className=""
                src={icons.VirutualScreen}
                height={'100%'}
                width={'100%'}
              />
            </Col>
            <Col className="order-md-1 justify-content-center d-flex " md="6">
              <div className="pr-md-5">
                <h1>Virtual Conference</h1>
                <p>
                  Virtual Conference in TMS facilitates seamless online meetings between users and companies. 
                  It enables video calls, file sharing, and real-time discussions, promoting collaboration and communication for effective team interactions and decision-making.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6" className='d-flex justify-content-center'>
              <Image
                alt="..."
                className=""
                src={icons.EventsScreen}
                height={'100%'}
                width={'100%'}
              />
            </Col>
            <Col md="6" className='justify-content-center d-flex '>
              <div className="pr-md-5">
                <h1>Event Management</h1>
                <p>

                  Empower administrators to organize internal and collaborative external events, promoting seamless user collaboration.
                  Set locations and times for efficient planning and communication.
                  Admins maintain control through editing, deleting, or closing events, ensuring a streamlined event management process for diverse occasions.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-4">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6" className='order-md-2 d-flex justify-content-center'>
              <Image
                alt="..."
                className=""
                src={icons.FeedScreen}
                height={"100%"}
                width={'100%'}
              />
            </Col>
            <Col md="6" className='justify-content-center d-flex '>
              <div className="pr-md-5">
                <h1>Feeds Module</h1>
                <p>
                  Quanta TMS enhances collaboration with streamlined information sharing.
                  Its Dynamic Feed Module allows admins to instantly convey vital announcements and updates to internal and external users.
                  Admins retain full control, ensuring content relevance.
                  This fosters efficient engagement and communication within the organization.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  )
}

export { Form }