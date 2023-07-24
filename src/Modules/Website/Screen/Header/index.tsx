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

    // <div className='fixed-top border-0 bg-secondary pt-3 pb-3 transparent'>
    //   <div className='row m-0'>
    //     <div className={'col-6'}>
    //       <div className='ml-md-5 ml-lg--5  ml-sm-0 ml--3'>
    //         <Image
    //           src={image.TMS_Logo}
    //           alt='nav-icon'
    //           width={'50px'}
    //           height={'50px'}
    //           className='ml-sm-0 ml-4 ml-lg-6'
    //         />
    //       </div>
    //     </div>
    //     <div className={'col-6'}>
    //       <div className='row justify-content-end m-0'>
    //         <form className='mr-md-5 pr-sm-0 pr-2'>
    //           <Button
    //             text={translate('common.signIn')}
    //             size={'md'}
    //             outline
    //             color={'default'}
    //             onClick={() => {
    //               goTo(ROUTES['auth-module'].splash);
    //             }}
    //             className={' bg-primary border-0 px-4 py-3  text-white shadow-none'}
    //           />

    //         </form>
    //       </div>
    //     </div>

    //   </div>
    // </div>

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
              Quanta-TMS
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
                  className='bg-default text-white border-0'
                  onClick={() => {
                    goTo(ROUTES['auth-module'].login)
                  }}
                  text={'Login'}
                  size={'sm'}
                />

              </NavItem>
            </Nav>
            {/* <hr className="d-lg-none" /> */}
            {/* <Nav className="align-items-lg-center ml-lg-auto" navbar>
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
                <UncontrolledTooltip delay={0} target="tooltip601201423">
                  Like us on Facebook
                </UncontrolledTooltip>
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
                <UncontrolledTooltip delay={0} target="tooltip871243015">
                  Follow us on Instagram
                </UncontrolledTooltip>
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
                <UncontrolledTooltip delay={0} target="tooltip366258619">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://github.com/creativetimofficial?ref=creative-tim"
                  id="tooltip931502898"
                  target="_blank"
                >
                  <i className="fab fa-github" />
                  <span className="nav-link-inner--text d-lg-none">Github</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip931502898">
                  Star us on Github
                </UncontrolledTooltip>
              </NavItem>
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adpr-index-navbar"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-shopping-cart mr-2" />
                  </span>
                  <span className="nav-link-inner--text">Purchase now</span>
                </Button>
              </NavItem>
            </Nav> */}
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>


  )
}

export { Header }