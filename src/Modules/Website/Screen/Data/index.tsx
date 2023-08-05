import React, { useState } from 'react'
import { Card, Divider, Image } from '@Components';
import { translate } from "@I18n";
import classnames from 'classnames';
import { Button, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { icons } from '@Assets';
function Data() {


  const [selectedNav, setSelectedNav] = useState(0)
  const [navData, setNavData] = useState(["Benefits", "Security", "Features"])
  const [listData, setListData] = useState([
    {
      title: 'Benefits',img:icons.avatarImg, data: [ "Efficient Task Management" ,"Accurate Time Tracking","Streamlined Ticket Handling", "Enhanced Collaboration", "Improved Tracking and Reporting", "Timely Issue Resolution", "Centralized Information", "Increased Accountability", "Better Customer Experience", "Customizable Settings", "Data Security", "Scalability"],
    },
    {
      title: 'Security',img:icons.avatarImg1, data: ["User Authentication", "Role-Based Access Control", "Data Encryption", "Secure Socket Layer (SSL)", "Regular Backups", "Secure Server Configurations", "Firewall Protection", "Data Access Control", "Two-Factor Authentication (2FA)", "Secure Communication (HTTPS)"]
    },
    {
      title: 'Features',img:icons.avatarImg3, data: ["Task Creation and Assignment", "Task Tracking", "Ticket Management", "Real-Time Updates", "Event Management", "Virtual Conferences", "Timesheet Tracking", "Group Chats", "Customizable Settings","Centralized Company Management","Efficient Communication"]
    }
  ])



  return (
    <>
      <div className='container pt-5 '>
        <div className='row'>
          {navData && navData.map((el, index) => {
            return (
              <>
                <div className='col-sm-4'>
                  < Nav
                    className="nav-fill flex-column flex-sm-row "
                    id="tabs-text"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        aria-selected={selectedNav === index}
                        className={classnames("mb-sm-3 mb-md-0 ", {
                          active: selectedNav === index
                        })}
                        onClick={e => setSelectedNav(index)}
                        role="tab"
                      >
                        {el}
                      </NavLink>
                    </NavItem>
                  </ Nav>
                </div>
              </>
            )
          })
          }
        </div>
        {listData && listData.map((el, index) => {
          return (
            <>
              {selectedNav === index &&
                <Row className="pt-5 justify-content-center">
                  <Col lg="6" className='pl-8'>
                    <div className="pr-5">
                      <h1 className="display-2 text-black font-weight-bold mb-0">
                        {el.title}
                      </h1>
                      <ul>
                        {el.data && el.data.map((item) => {
                          return (
                              <li className='py-2 text-black'>
                                {item}
                              </li>
                          )
                        })
                        }
                      </ul>
                    </div>
                  </Col>
                  <Col lg="6">

                    <Image
                      src={el.img}
                      height={"100%"}
                      width={"100%"}

                    />
                  </Col>
                </Row>}
            </>
          )
        })
        }
      </div>



    </>
  )
}

export { Data }