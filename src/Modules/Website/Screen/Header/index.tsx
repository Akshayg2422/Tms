import React from 'react'
import { Image, Button } from '@Components';
import { icons, image } from '@Assets';
import { translate } from "@I18n";
import { useNavigation } from "@Hooks";
import { ROUTES } from '@Routes';
import { Link } from 'react-router-dom';
import { Navbar, Container, NavbarBrand, UncontrolledCollapse, Row, Col, Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';

function Header() {
  const { goTo } = useNavigation()

  return (

    // <div className='overflow-auto overflow-hide'>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark bg-navGradient-primary py-2 sticky-top"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={icons.logo}

            />
            <span className='nav-link-inner--text ml-2 text-white'>
              Quanta TMS
            </span>
          </NavbarBrand>

          
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to={''} >
                    <img alt="..." src={icons.logo} />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
          
            <Nav className="ml-auto" navbar>
             <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.facebook.com/creativetim?ref=creative-tim"
                  id="tooltip601201423"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none">
                    Facebook
                  </span>
                </NavLink>
                {/* <UncontrolledTooltip delay={0} target="tooltip601201423">
                  Like us on Facebook
                </UncontrolledTooltip> */}
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.instagram.com/creativetimofficial?ref=creative-tim"
                  id="tooltip871243015"
                  target="_blank"
                >
                  <i className="fab fa-instagram" />
                  <span className="nav-link-inner--text d-lg-none">
                    Instagram
                  </span>
                </NavLink>
                {/* <UncontrolledTooltip delay={0} target="tooltip871243015">
                  Follow us on Instagram
                </UncontrolledTooltip> */}
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://twitter.com/creativetim?ref=creative-tim"
                  id="tooltip366258619"
                  target="_blank"
                >
                  <i className="fab fa-twitter-square" />
                  <span className="nav-link-inner--text d-lg-none">
                    Twitter
                  </span>
                </NavLink>
                {/* <UncontrolledTooltip delay={0} target="tooltip366258619">
                  Follow us on Twitter
                </UncontrolledTooltip> */}
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.google.com/maps/place/Leora+Infotech+Private+Limited/@13.4210932,80.1274008,15z/data=!4m6!3m5!1s0x3a4d81c5e166d809:0xc9ff7b04d36a6217!8m2!3d13.4207649!4d80.1275711!16s%2Fg%2F11j0s11_vq?entry=ttu"
                  id="tooltip366258619"
                  target="_blank"
                >
                  <i className="bi bi-geo-alt-fill mr-3 text-white" />
                  <span className="nav-link-inner--text d-lg-none">
                    Location
                  </span>
                </NavLink>

              </NavItem>
              <NavItem>
                <Button
                  className='bg-white text-primary border-0 mt-3 '
                  onClick={() => {
                    goTo(ROUTES['auth-module'].login)
                  }}
                  text={'Login'}
                  size={'sm'}
                  // style={{backgroundColor:'#1616ff'}}
                />

              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    // </div>


  )
}

export { Header }