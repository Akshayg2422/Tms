/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import classnames from 'classnames';
import { useState } from 'react'
import { icons, image } from '@Assets';
import { Image, Divider, } from '@Components';
import { translate } from "@I18n";
import {
  ButtonGroup, CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Button,
  Col,
  Container,
  Row,
  Card,
  CardTitle,
  Carousel,
  CarouselIndicators,
  CarouselItem,
} from 'reactstrap'
// import Slick from "react-slick";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



// import { Button, Card, Container, Row, Col } from "reactstrap";

function Features() {


  const [carousel1Index, setCarousel1Index] = React.useState(0);
  const [carousel2Index, setCarousel2Index] = React.useState(0);
  const [animating1, setAnimating1] = React.useState(false);
  const [animating2, setAnimating2] = React.useState(false);

  const PrevButton = (props) => {
    return (
      <Button
        className="btn-round btn-icon btn-simple slick-prev slick-arrow"
        color="primary"
        aria-label="Previous"
        type="button"
        onClick={props.onClick}
      >
        <i className="tim-icons icon-minimal-left" />
      </Button>
    );
  };
  // custom next button for the slick component
  const NextButton = (props) => {
    return (
      <Button
        className="btn-round btn-icon btn-simple slick-next slick-arrow"
        color="primary"
        aria-label="Next"
        type="button"
      >
        <i className="tim-icons icon-minimal-right" onClick={props.onClick} />
      </Button>
    );
  };


  let slickSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  };


  const onExiting = (carousel) => {
    if (carousel === 1) {
      setAnimating1(true);
    } else {
      setAnimating2(true);
    }
  };

  const onExited = (carousel) => {
    if (carousel === 1) {
      setAnimating1(false);
    } else {
      setAnimating2(false);
    }
  };
  const next = (carousel, items) => {
    if (carousel === 1) {
      if (animating1) {
        return;
      }
    } else {
      if (animating2) {
        return;
      }
    }
    let currentIndex = -1;
    if (carousel === 1) {
      currentIndex = carousel1Index;
    } else {
      currentIndex = carousel2Index;
    }
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    if (carousel === 1) {
      setCarousel1Index(nextIndex);
    } else {
      setCarousel2Index(nextIndex);
    }
  };
  const previous = (carousel, items) => {
    if (carousel === 1) {
      if (animating1) {
        return;
      }
    } else {
      if (animating2) {
        return;
      }
    }
    let currentIndex = -1;
    if (carousel === 1) {
      currentIndex = carousel1Index;
    } else {
      currentIndex = carousel2Index;
    }
    const nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    if (carousel === 1) {
      setCarousel1Index(nextIndex);
    } else {
      setCarousel2Index(nextIndex);
    }
  };


  const items2 = [
    {
      content: (
        <div className="info info-primary">
          <div className="">
            <Image
              style={{
                width: '10%',
                height: '10%'
              }}
              variant='rounded'
              src={icons.VideoCalling}
            />
          </div>
          <h4 className="info-title">Jessica</h4>
          <p className="description">
            "I've been using TMS for a few months now, and it's been a game-changer! The task management features are top-notch, and it's made my work so much more organized."
          </p>
        </div>
      ),
      altText: "",
      caption: "",
      src: "0"
    },
    {
      content: (
        <div className="info info-primary">
          <div className="">
            <Image
              style={{
                width: '10%',
                height: '10%'
              }}
              variant='rounded'
              src={icons.VideoCalling}
            />
          </div>
          <h4 className="info-title">John</h4>
          <p className="description">
            "The Tickets module is excellent for issue tracking. It keeps all our customer inquiries organized, allowing us to resolve them promptly."
          </p>
        </div>
      ),
      altText: "",
      caption: "",
      src: "0"
    },
    {
      content: (
        <div className="info info-primary">
          <div className="">
            <Image
              style={{
                width: '10%',
                height: '10%'
              }}
              variant='rounded'
              src={icons.VideoCalling}
            />
          </div>
          <h4 className="info-title">Emily</h4>
          <p className="description">
            "TMS has made my life so much easier! It streamlines task allocation and tracking, ensuring everyone stays on track and accountable."
          </p>
        </div>
      ),
      altText: "",
      caption: "",
      src: "0"
    },
    {
      content: (
        <div className="info info-primary">
          <div className="">
            <Image
              style={{
                width: '10%',
                height: '10%'
              }}
              variant='rounded'
              src={icons.VideoCalling}
            />
          </div>
          <h4 className="info-title">Emma</h4>
          <p className="description">
            "TMS's Chat module is a lifesaver for quick communication with team members. It's convenient and ensures everyone is on the same page."
          </p>
        </div>
      ),
      altText: "",
      caption: "",
      src: "0"
    },
    {
      content: (
        <div className="info info-primary">
          <div className="">
            <Image
              style={{
                width: '10%',
                height: '10%'
              }}
              variant='rounded'
              src={icons.VideoCalling}
            />
          </div>
          <h4 className="info-title">Oliver</h4>
          <p className="description">
            "TMS has revolutionized how we manage tasks. The interface is user-friendly, and the sub-task feature helps us break down complex Task efficiently."
          </p>
        </div>
      ),
      altText: "",
      caption: "",
      src: "0"
    },


  ];


  const goToIndex = (newIndex, carousel) => {
    if (carousel === 1) {
      if (animating1) {
        return;
      }
    } else {
      if (animating2) {
        return;
      }
    }
    if (carousel === 1) {
      setCarousel1Index(newIndex);
    } else {
      setCarousel2Index(newIndex);
    }
  };


  const [sideData, setSlideData] = useState([
    { name: 'Jessica', description: "I've been using TMS for a few months now, and it's been a game-changer! The task management features are top-notch, and it's made my work so much more organized." },
    { name: 'John', description: "The Tickets module is excellent for issue tracking. It keeps all our customer inquiries organized, allowing us to resolve them promptly." },
    { name: 'Emily', description: "TMS has made my life so much easier! It streamlines task allocation and tracking, ensuring everyone stays on track and accountable." },
    { name: 'Emma', description: "TMS's Chat module is a lifesaver for quick communication with team members. It's convenient and ensures everyone is on the same page." },
    { name: 'Oliver', description: "TMS has revolutionized how we manage tasks. The interface is user-friendly, and the sub-task feature helps us break down complex Task efficiently." },
    { name: 'Michael', description: "The Association module is fantastic for managing company details. It's a centralized hub for all our associated companies, making collaboration seamless." },
  ])





  return (
    <>
      {/* <Divider border='1px' space1='5' space3='7' opacity='0.2px'></Divider> */}
      {/* <div className={'container pt-3  pb-7 mt--4 33ar4sz'}>

        <div className={'col-sm-12 text-center mt-7 '}>
          <Nav
            className=' justify-content-center flex-column flex-sm-row  pt-2 pb-2'
            id='tabs-icons-text'
            pills
            role='tablist'
          >
            <NavItem>
              <NavLink
                aria-selected={navPill === 1}
                className={classnames(
                  ` text-white mr-lg--2 pl-5 pr-5  ${"bg-"+tab1} shadow-none d-none d-lg-block d-md-block border-0 `,
                  {
                    active: navPill === 1,
                  }
                )}
                onClick={(e) =>{ 
                  toggleNavs(e, 1)
                  setTab1('primary')
                  setTab2('danger')
                  setTab3('danger')
                
                } }
              >
                {translate('TMS.fourthScreen.features')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={navPill === 2}
                className={classnames(
                  `text-white pl-5 pr-5  d-none ${"bg-"+tab2} shadow-none  d-none d-lg-block d-md-block border-0`,
                  {
                    active: navPill === 2,
                  }
                )}
                onClick={(e) =>{toggleNavs(e, 2)
                  setTab1('danger')
                  setTab2('primary')
                  setTab3('danger')
                }}
              >
                {translate('TMS.fourthScreen.benefits')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={navPill === 3}
                className={classnames(
                  ` text-white ml-lg--2 pl-5 pr-5  d-none ${"bg-"+tab3} shadow-none d-none d-lg-block d-md-block border-0`,
                  {
                    active: navPill === 3,
                  }
                )}
                onClick={(e) => {toggleNavs(e, 3)
                  setTab1('danger')
                  setTab2('danger')
                  setTab3('primary')
                }}
              >
                {translate('TMS.fourthScreen.security')}
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <TabContent activeTab={'tabs' + navPill}>
          
          <TabPane tabId='tabs1'>
            <div className='description'>
              <div className=' row  mt-lg-1 mt-sm-0 mt--6'>
                <div className=' col-sm-6  pl-lg-9 pt-lg-4 mr-lg--8 px-sm-0 px-4'>
                  <h1 className={' mt-6  text-default sub-heading'}>
                    <b>{translate('TMS.fourthScreen.features')}</b>
                  </h1>
                  <p className={'text-default tabText'}>
                    <h3>
                    <ul>
                    <li>{translate('TMS.fourthScreen.Ticket assignmentSubtext')}</li>
                    <li>{translate('TMS.fourthScreen.Ticket trackingSubtext')}</li>
                    <li>{translate('TMS.fourthScreen.Communication and collaborationSubtext')}</li>
                    <li>{translate('TMS.fourthScreen.EscalationSubtext')}</li>
                    <li>{translate('TMS.fourthScreen.Priority and taggingSubtext')}</li>
                    <li>{translate('TMS.fourthScreen.Reporting and analyticsSubtext')}</li>
                    <li>{translate('TMS.fourthScreen.IntegrationSubtext')}</li>
                    <li>{translate('TMS.fourthScreen.SecuritySubtext')}</li>
                    </ul>
                    </h3>
                  </p>
                  <div className={'text-primary row mt-4 m-0 pt-2'}>
                    <button
                      className={'btn bg-primary text-white border-0  px-4 '}
                    >{translate('TMS.fourthScreen.launchADemo')} <i className="bi bi-chevron-right"></i></button>
                  </div>
                </div>

                <div className={'col-sm-6 ml-lg-5 mt-lg-8 mt-md-8'}>
                  <div className='row justify-content-center'>
                  <Image
                    src={
                      image.TMS_Img4
                    }
                    width={'70%'}
                    height={'auto'}
                    className={'ml-lg-9 mt-sm-0 mt-5'}
                  />
                  </div>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tabId='tabs2'>
            <div className='description'>
              <div className=' row mt-lg-4 mt-sm-0 mt--6'>
                <div className=' col-sm-6 pl-lg-9 pt-lg-4 mr-lg--8 px-sm-0 pl-4'>
                  <h1 className={' pt-6  text-default sub-heading'}>
                    <b>{translate('TMS.fourthScreen.benefits')}</b>
                  </h1>
                  <p className={'text-default tabText'}>
                    <h3>
                    <ul>
                  <li>{translate('TMS.fourthScreen.Improved efficiencySubtext')}</li>
                  <li>{translate('TMS.fourthScreen.Increased transparencySubtext')}</li>
                  <li>{translate('TMS.fourthScreen.Better communicationSubtext')}</li>
                  <li>{translate('TMS.fourthScreen.Better reporting and analyticsSubtext')}</li>
                  <li>{translate('TMS.fourthScreen.Increased customer satisfactionSubtext')}</li>
                  <li>{translate('TMS.fourthScreen.Better internal managementSubtext')}</li>
                  <li>{translate('TMS.fourthScreen.Better customer engagementSubtext')}</li>
                  <li>{translate('TMS.fourthScreen.Increased productivitySubtext')}</li>
                    </ul>
                    </h3>
                  </p>
                  <div className={'text-primary row mt-4 m-0 pt-2'}>
                    <button
                      className={'btn bg-primary text-white border-0  px-4 '}
                    >{translate('TMS.fourthScreen.launchADemo')}  <i className="bi bi-chevron-right"></i></button>
                  </div>
                </div>

                <div className={' col-sm-6  ml-lg-5 mt-lg-8 mt-sm-8'}>
                  <div className='row justify-content-center'>
                  <Image
                    src={image.TMS_Img5}
                    width={'70%'}
                    height={'auto'}
                    className={'ml-lg-9 mt-sm-0 mt-5'}
                  />
                  </div>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tabId='tabs3'>
            <div className='description'>
              <div className=' row mt-lg-1  mt-sm-0 mt--6'>
                <div className='col-sm-6 pl-lg-9 pt-lg-4 mr-lg--8 px-sm-0 px-4'>
                  <h1 className={' mt-6 text-default  sub-heading'}>
                   <b> {translate('TMS.fourthScreen.security')}</b>
                  </h1>
                  <p className={'text-default tabText'}>
                    <h3>
                    <ul>
                    <li>  {translate('TMS.fourthScreen.data encryptionSubtext')}</li>
                    <li>  {translate('TMS.fourthScreen.access controlSubtext')}</li>
                    <li>  {translate('TMS.fourthScreen.authenticationSubtext')}</li>
                    <li>  {translate('TMS.fourthScreen.authorizationSubtext')}</li>
                    <li>   {translate('TMS.fourthScreen.backup and disaster recoverySubtext')}</li>
                    <li>  {translate('TMS.fourthScreen.network securitySubtext')}</li>
                    <li>  {translate('TMS.fourthScreen.regular security auditsSubtext')}</li>
                    <li>  {translate('TMS.fourthScreen.incident responseSubtext')}</li>

                     </ul>
                     </h3>
                  </p>
                  <div className={'text-primary row mt-4 m-0 pt-2'}>
                    <button
                      className={'btn bg-primary text-white border-0  px-4 '}
                    > {translate('TMS.fourthScreen.launchADemo')}  <i className="bi bi-chevron-right"></i></button>
                  </div>
                </div>

                <div className={'col-sm-6 ml-lg-5 mt-lg-8 mt-md-8'}>
                <div className='row justify-content-center'>
                  <Image
                    src={image.TMS_Img6}
                    width={'60%'}
                    height={'auto'}
                    className={'ml-lg-9 mt-sm-0 mt-5'}
                  />
                  </div>
                </div>
              </div>
            </div>


          </TabPane>
        </TabContent>

      </div> */}


      <Container className=''>
        <Row className='justify-content-center py-8'>
          <h1 className='pb-6'>
            Experiences and Feedback
          </h1>
          <Col md="12">
            <Carousel

              activeIndex={carousel2Index}
              next={() => next(2, items2)}
              previous={() => previous(2, items2)}
            >
              {sideData.map((item, key) => {
                return (
                  <CarouselItem
                    onExiting={() => onExiting(2)}
                    onExited={() => onExited(2)}
                    key={key}
                    className="justify-content-center text-center"
                  >
                    <div className="info info-primary">
                      <div className="">
                        <Image
                          style={{
                            width: '10%',
                            height: '10%'
                          }}
                          variant='rounded'
                          src={require('file:///C:/Users/tamil_hfh9g6g/Downloads/attachments/sankar.jpg')}
                        />
                      </div>
                      <h4 className="info-title py-2 mt-2">{item.name}</h4>
                      <p className="description text-center mx-auto"
                        style={{
                          width: '400px'
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                  </CarouselItem>
                );
              })}
              <a
                className="carousel-control-prev "
                data-slide="prev"
                onClick={(e) => {
                  e.preventDefault();
                  previous(2, items2);
                }}

                role="button"
              >
                <i className="ni ni-bold-left text-black" />
              </a>
              <a
                className="carousel-control-next"
                data-slide="next"
                onClick={(e) => {
                  e.preventDefault();
                  next(2, items2);
                }}
                role="button"
              >
                <i className="ni ni-bold-right text-black" />
              </a>
            </Carousel>
          </Col>
        </Row>
      </Container>


    </>



  )
}

export { Features }