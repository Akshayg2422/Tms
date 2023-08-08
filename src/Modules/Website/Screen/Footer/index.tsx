/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { image } from '@Assets';
import { Input, Card, Image, Divider, Badge, Heading, Paragraph, Button, Title } from '@Components';
import { translate } from "@I18n";
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

function Footer() {

  const { goTo } = useNavigation();
  return (
    <div className='overflow-auto overflow-hide'>
      <footer className="" id="footer-main">
        <Container>
          <Row className=" justify-content-xl-between">
            <Col xl="6 ">
              <div className="copyright text-center text-xl-left text-muted text-sm pt-1">
                © {new Date().getFullYear()}{" "}
                <a
                  className=" ml-1" style={{fontWeight:'bold'}}
                  // href="https://www.creative-tim.com?ref=adpr-auth-footer"
                  // target="_blank"
                >
                  Quanta TMS
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  {/* <NavLink
                    // href="https://www.creative-tim.com?ref=adpr-auth-footer"
                    // target="_blank"
                  >
                   About
                  </NavLink> */}
                </NavItem>
                {/* <NavItem>
                  <NavLink
                  >
                  
                  </NavLink>
                </NavItem> */}
                <p  className={'pt-1'} style={{cursor:'pointer'}} >About Us</p> 
                <NavItem>
                  <NavLink
                  >
                    {/* small h4 text-lg-right mr-sm-0  text-sm-center */}
                    <p style={{ cursor: 'pointer' }} className='text-sm mr-sm-0  text-sm-center'>  <a className='text-black' onClick={() => goTo(ROUTES["auth-module"].privacy)}><b> {translate('auth.PrivacyPolicy')} </b> </a></p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  >
                    {/* Terms & Conditions */}
                    <p style={{ cursor: 'pointer' }} className='text-sm mr-sm-0  text-sm-center '>  <a className='text-black' onClick={() => goTo(ROUTES["auth-module"].TermsAndConditions)}><b> {translate('auth.Term & Conditions')} </b> </a></p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  >
                    <p style={{ cursor: 'pointer' }} className=' text-sm mr-sm-0  text-sm-center'>  <a className='text-black' onClick={() => goTo(ROUTES["auth-module"].ReturnAndRefund)}><b> {translate('auth.Return & Refund')} </b> </a></p>
                  </NavLink>
                </NavItem>
                
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export { Footer }