import React from 'react'
import { icons, image } from '@Assets';
import { Image } from '@Components';
import { Card, Container, Row, Col, CardBody, Button } from "reactstrap";
import { translate } from "@I18n";
import { Link } from 'react-router-dom';

function Home() {
  return (
 
      <div className="pt-6 pb-9 bg-customGradient-primary " >
        <Container>
          <div className="header-body scrolled fade-in-bottom">
            <Row className="align-items-center">
              <Col lg="6" className='justify-content-center text-center d-flex pt-6'>
                <div className="">
                  <h2 className=" display-4 text-white font-weight-bold  ">
                    Complete Task & Ticket
                    management Web & Mobile App
                  </h2>
                  <p className="text-white mt-4 text-justify">
                    Quanta TMS transforms task and ticket management, boosting productivity and collaboration.
                    Create swift resolutions, embrace dynamic news feeds, and enhance remote teamwork.
                    With comprehensive timesheets and efficient communication, Quanta TMS shapes the future of collaboration.
                  </p>
                </div>
              </Col>
              <Col lg="6" className='pt-4 justify-content-center d-flex'>
                <Image
                  src={icons.TMS_home}
                  // height={"100%"}
                  width={"110%"}
                  className=''

                />
              </Col>
            </Row>
          </div>
        </Container>

      </div>

   
  )
}

export { Home }