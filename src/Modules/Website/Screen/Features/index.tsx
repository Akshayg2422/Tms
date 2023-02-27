import React from 'react'
import classnames from 'classnames';
import { useState } from 'react'
import { image } from '@Assets';
import { Image, Divider,  } from '@Components';
import { translate } from "@I18n";
import {
  ButtonGroup, CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from 'reactstrap'
// import { Button, Card, Container, Row, Col } from "reactstrap";

function Features() {
  const [tab1,setTab1] = useState('primary')
  const [tab2,setTab2] = useState('danger')
  const [tab3,setTab3] = useState('danger')
  const [navPill, setnavPill] = useState(1)
  const toggleNavs = (e: React.MouseEvent<HTMLAnchorElement,
    MouseEvent>, index: number) => {
    e.preventDefault();
    setnavPill(index)
  };
  return (
    <>
          {/* <Divider border='1px' space1='5' space3='7' opacity='0.2px'></Divider> */}
      <div className={'container pt-3  pb-7 mt--4 33ar4sz'}>

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
                    <b>
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
                    </b>
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
                      image.TMS_1
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
                    <b>
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
                    </b>
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
                    src={image.TMS_7}
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
                    <b>
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
                     </b>
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
                    src={image.TMS_6}
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

      </div>

      


    </>


  
  )
}

export { Features }