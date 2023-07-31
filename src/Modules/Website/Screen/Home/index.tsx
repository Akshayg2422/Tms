import React from 'react'
import { icons, image } from '@Assets';
import { Image } from '@Components';
import { Card, Container, Row, Col, CardBody, Button } from "reactstrap";
import { translate } from "@I18n";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* <div className="bg-secondary header pt-5 pb-3">
        <div className='container'>
          <div className="header-body">
            <div className="row align-items-center hvh">
              <div className='col-lg-6  mt-sm-0 mt-5 mb-sm-0 mb-4  mt-md-7 mb-md-4'>
                <div className="pr-lg-2 ml-md-4">
                  <h1 className=" text-uppercase mainHeading text-default mb-0">
                    {translate('TMS.quanta TMS')}
                  </h1>
                  <h2 className=" text-default mainSubtext mt-3">
                    {translate('TMS.quanta TMS Subtext')}
                  </h2>
                  <div className="row mt-4 btn-pos m-0">
                  <Button
                   className="text-white shadow-none border-0 px-4 "
                   text={translate('TMS.download')}
                   size={'lg'}
                    />
                    <Button
                     className="text-white shadow-none border-0 d-lg-block d-md-block d-none px-4  "
                     style={{ background: "#BFEDF0" }}
                     text={translate('TMS.learnMore')}
                     size={'lg'}
                      />
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='row justify-content-center mt-lg-7 ml-lg-5 '>
                  <Image src={image.TMS_Img1} 
                  width={'90%'}
                   />
                </div>
              </div>
            </div>
            <div className='row scroll mt-sm-0 mt-3  mt-md-7 ml-md-2'>
            <a href='#screen2 '>
            <i className='bi bi-arrow-down-circle-fill pl-2 fa-2x icons '></i>
            <span className='small text-default pl-2 sptag1'>{translate('TMS.scrollDown')}</span>

          </a>
            </div>
          </div>
        </div>
      </div> */}

      <div className=" bg-customGradient-primary  pt-3 pb-7" >
        <Container>
          <div className="header-body">
            <Row className="align-items-center">
              <Col lg="6">
                <div className="pr-5">
                  <h1 className="display-1 text-white font-weight-bold mb-0">
                    Quanta-TMS
                  </h1>
                  <h2 className="display-4 text-white font-weight-light">
                    Streamline Your Ticket Management
                  </h2>
                  <p className="text-white mt-4 text-justify">
                    “Quanta Ticket Management”  is a state-of-the-art web and mobile application designed to simplify and optimize ticket management for companies and associations. With a user-friendly interface and a comprehensive set of modules, TicketMaster empowers teams to streamline ticket creation, tracking, and resolution, fostering seamless collaboration among team members.
                  </p>
                  <div className="mt-5">
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
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <Image
                  src={icons.avatarImg2}
                  height={"100%"}
                  width={"100%"}

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