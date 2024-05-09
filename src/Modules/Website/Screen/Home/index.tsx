import React from 'react'
import { icons, image } from '@Assets';
import { Image } from '@Components';
import { Card, Container, Row, Col, CardBody, Button } from "reactstrap";
import { translate } from "@I18n";
import { Link } from 'react-router-dom';

function Home() {
  return (
 
      <div className="pt-7 pb-9 bg-customGradient-primary" >
        <Container>
          <div>
            <Row className="align-items-center">
              <Col lg="6" className='justify-content-center d-flex mt-5 scrolled fade-in-bottom'>
                <div className="scrolled fade-in-bottom fade-in">
                  <h1 className="display-4 mx-2 text-white font-weight-bold ">
                    Complete Task & Ticket
                    management Web & Mobile App
                  </h1>
                  <p className="text-white mt-4 text-justify ">
                    Quanta TMS transforms task and ticket management, boosting productivity and collaboration.
                    Create swift resolutions, embrace dynamic news feeds, and enhance remote teamwork.
                    With comprehensive timesheets and efficient communication, Quanta TMS shapes the future of collaboration.
                  </p>
                </div>
              </Col>
              <Col lg="6" className='pt-4 justify-content-center d-flex scrolled fade-in-bottom mt--5'>
                <Image
                  src={icons.TMS_home}
                  height={"100%"}
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