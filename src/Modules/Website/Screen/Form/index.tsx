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

      <section className="py-6 pb-9 ">
        <Container fluid>
          <Row className="justify-content-center text-center">
            <Col md="11">
              <h2 className="display-3 ">
                Task Module & Creation
              </h2>
              <p className="lead ">
                Efficiently manage tasks with Quanta TMS. This user-friendly module streamlines task creation, assignment, and tracking. Enhance collaboration with comprehensive features, including priority setting, filtering, and sub-task creation. Simplify task allocation by providing essential details and assigning tasks to specific users or company admin.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-lg pt-lg-0 mt--7">
        <Container>
          <Row className="justify-content-center">
            <h2 className="display-4 ">
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
                        <i className="ni ni-check-bold" />
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
                        <i className="ni ni-istanbul" />
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
                        <i className="ni ni-planet" />
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
      <section className="py-6">
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
      <section className="py-6">
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
                  The Ticket Module in TMS enables users to manage and resolve issues efficiently. It offers a user-friendly interface to create tickets with details like title, description, attachments, and assign them to specific users or external stakeholders. This streamlines issue tracking, enhances collaboration, and ensures prompt resolution within organizations.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-6">
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
      <section className="py-6">
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
                <h1>Company listing & Adding</h1>
                <p>
                  Company Listing in TMS displays registered companies under an association, offering a centralized view of their details. Adding Company allows users to input new company information, including name, address, contact, and primary person data. Efficiently manage associated companies within the system.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-6">
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
      <section className="py-6">
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
                <h1>Events</h1>
                <p>
                  Events enable users to organize and manage various activities with options for attachments, date, time, and location. Additionally, the paid events feature allows users to create events with ticketing and payment capabilities for seamless event registration and monetization.
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
      <section className="py-6">
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
                <h1>Feeds</h1>
                <p>
                  Feeds facilitates Internal Communication for Critical Updates and Information Sharing Among users where administrators create and share posts.
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