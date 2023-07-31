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

    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark bg-customGradient-primary py-3 sticky-top"
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
                <NavLink tag={Link}>
                  {/* <span className="nav-link-inner--text">Dashboard</span> */}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link}>
                  {/* <span className="nav-link-inner--text">Pricing</span> */}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link}>
                  {/* <span className="nav-link-inner--text">Login</span> */}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link}>
                  {/* <span className="nav-link-inner--text">Register</span> */}
                </NavLink>
              </NavItem>
              <NavItem>
                <Button
                  className='bg-primary text-white border-0'
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
    </>


  )
}

export { Header }