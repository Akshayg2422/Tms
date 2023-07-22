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
      title: 'Benefits',img:icons.avatarImg, data: ["Streamlined Ticket Handling", "Enhanced Collaboration", "Improved Tracking and Reporting", "Time and Cost Savings", "Centralized Information", "Increased Accountability", "Better Customer Experience", "Customization", "Data Security", "Scalability"],
    },
    {
      title: 'Security',img:icons.avatarImg1, data: ["User Authentication", "Role-Based Access Control", "Data Encryption", "Secure Socket Layer (SSL)", "Regular Backups", "Audit Trails", "Firewall Protection", "Data Access Control", "Two-Factor Authentication (2FA)", "Security Audits"]
    },
    {
      title: 'Features',img:icons.avatarImg3, data: ["Task Creation and Assignment", "Ticket Management", "Filtering and Tracking", "Sub-task Creation", "User Management", "Timesheet Management", "Group Chats", "One-on-One Chats", "Company Listing", "Customizable"]
    }
  ])



  return (
    <>
      {/* <Divider border='1px' space1='6' space3='7' ></Divider> */}
      {/* <div className='container pb-4'>
        <h1 className='mt-lg-6 mt-sm-0 mt-4 display-2 text-default'><b> {translate('TMS.thirdScreen.Efficieny and Collaboration')} </b></h1>
        <div className='row justify-content-around pt-2'>
          <div className='col-lg-4 col-md-12 mt-md-4 mt-sm-0 mt-4'>

            <Card
              className=''
              style={{ backgroundColor: '#F6E7E0',height:"100%" }}
            >
              <h2 className={'text-default '}>
                <b>{translate('TMS.thirdScreen.Tag a person')}</b></h2>
              <Divider />
              <h2 className={'text-justify card-text'}> {translate('TMS.thirdScreen.Tag a personSubtext')}</h2>
            </Card>
          </div>
          <div className='col-lg-4 col-md-12 mt-md-4 mt-sm-0 mt-4'>
            <Card
              className=''
              style={{ backgroundColor: '#F6E7E0',height:"100%" }}
            >
              <h2 className={'text-default'}><b> {translate('TMS.thirdScreen.Video Call')}</b> </h2>
              <Divider />
              <h2 className='text-justify card-text'> {translate('TMS.thirdScreen.Video CallSubtext')} </h2>
            </Card>
          </div>
          <div className='col-lg-4 col-md-12  mt-md-4 mt-sm-0 mt-4'>
            <Card
              className=''
              style={{ backgroundColor: '#F6E7E0',height:"100%" }}>
              <h2 className={'text-default'}><b>{translate('TMS.thirdScreen.Reference Ticket')}</b></h2>
              <Divider />
              <h2 className='text-justify  card-text'>
                {translate('TMS.thirdScreen.Reference TicketSubtext')}
              </h2>
            </Card>
            
          </div>
          
        </div>
        <Divider space='6'/>
      </div> */}
      <div className='container'>
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
                        className={classnames("mb-sm-3 mb-md-0", {
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