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
// import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



// import { Button, Card, Container, Row, Col } from "reactstrap";

function Features() {


  const [carousel1Index, setCarousel1Index] = React.useState(0);
  const [carousel2Index, setCarousel2Index] = React.useState(0);
  const [animating1, setAnimating1] = React.useState(false);
  const [animating2, setAnimating2] = React.useState(false);


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
                          src={icons.avatarImg3}
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