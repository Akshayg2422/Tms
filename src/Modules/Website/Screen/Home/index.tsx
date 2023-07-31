import React from 'react'
import { icons, image } from '@Assets';
import { Image } from '@Components';
import { Card, Container, Row, Col, CardBody, Button } from "reactstrap";
import { translate } from "@I18n";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className=" bg-customGradient-primary  pt-3 pb-7" >
        <Container>
          <div className="header-body">
            <Row className="align-items-center">
              <Col lg="6">
                <div className="pr-5">
                  <h1 className="display-1 text-white font-weight-bold mb-0">
                    Quanta TMS
                  </h1>
                  <h2 className="display-4 text-white font-weight-light">
                    Streamline Your Ticket Management
                  </h2>
                  <p className="text-white mt-4 text-justify">
                    “Quanta Ticket Management”  is a state-of-the-art web and mobile application designed to simplify and optimize ticket management for companies and associations. With a user-friendly interface and a comprehensive set of modules, TicketMaster empowers teams to streamline ticket creation, tracking, and resolution, fostering seamless collaboration among team members.
                  </p>
                  {/* <div className="mt-5">
                    <Button
                      className="btn-neutral my-2"
                      color="default"
                      tag={Link}
                    >
                      Explore Dashboard
                    </Button>
                    <Button
                      className="my-2"
                      color="default"
                    >
                      Purchase now
                    </Button>
                  </div> */}
                </div>
              </Col>
              <Col lg="6">
                <Image
                  src={icons.ScreenShort}
                  height={"250px"}
                  width={"350px"}

                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>

    </>
  )
}

export { Home }