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
    <>
      <footer className="py-5" id="footer-main">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  // href="https://www.creative-tim.com?ref=adpr-auth-footer"
                  // target="_blank"
                >
                  Quanta-TMS
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
                <NavItem>
                  <NavLink
                  >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  >
                    Terms & Conditions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  >
                    License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export { Footer }