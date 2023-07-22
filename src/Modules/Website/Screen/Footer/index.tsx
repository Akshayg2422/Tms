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
    // <div className='container-fluid bg-secondary'>
    //   <div className=' pb-5 gradient'>
    //     <div className={'text-center z-index'}>
    //       <div className={'row'}>
    //         <Image
    //           src={
    //             'https://framerusercontent.com/images/O1KbowTKivLKjFvBd8bJQLUE9VU.png'
    //           }
    //           alt={'gallery-icon'}
    //           width={'35%'}
    //           height={'10%'}
    //           className={'pl-6 pr-9'}
    //         />

    //         <Image
    //           src={
    //             'https://framerusercontent.com/images/0ECMOTJrwnaSR1sE7ZtSG1qxDo.png'
    //           }
    //           alt={'gallery-icon'}
    //           width={'35%'}
    //           height={'10%'}
    //           className={'pl-9 pr-8 pt-5'}
    //         />

    //         <Image
    //           src={
    //             'https://framerusercontent.com/images/oTzZJH40491qCFebiIcn3sdjZ40.png'
    //           }
    //           alt={'paint icon'}
    //           width={'30%'}
    //           height={'10%'}
    //           className={'pl-9 '}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className={'text-center pt-5 mt--5'}>
    //     <div className={'pt-sm-2  h3 display-1'}><b> {translate('TMS.ninethScreen.readyToUseQuantaTMS?')} </b></div>
    //     <p className={'  mt-lg-0 mt-sm-0 mt-3 h1'}>
    //       <b> {translate('TMS.ninethScreen.subText')}</b>
    //     </p>
    //   </div>



    //   <div className={'text-center'}>
    //     <Image
    //       src={
    //         'https://framerusercontent.com/images/ksLcmTWeXB6SPXETK7ARAMMdg.png'
    //       }
    //       alt={'group icon'}
    //       width={'250px'}
    //     />
    //   </div>
    //   <div className={'text-center'}>
    //     <Button
    //       text={translate('TMS.ninethScreen.getStarted')}
    //       size={'lg'}
    //       className={'bg-primary text-white border-0 px-3 py-3 mt-4'}
    //     />
    //   </div>
    //   <div className={'text-right d-none d-lg-block d-print-block'}>
    //     <Image
    //       src={
    //         'https://framerusercontent.com/images/VmKu8NUTEeURnzzBVMIy99WusFI.png'
    //       }
    //       alt={'like'}
    //       width={'10%'}
    //     />
    //   </div>
    //   <div className={'row m-0'}>
    //     <span className='col-sm-3 d-none d-lg-block d-print-block'>
    //       <Image
    //         src={
    //           'https://framerusercontent.com/images/k2KuDOsi25tEQIVolkp0obxf8U4.png'
    //         }
    //         alt={'defaultGallery icon'}
    //         width={'60%'}
    //       />
    //     </span>

    //     <span className={'text-center d-none  d-lg-block col-sm-4'}>
    //       <Image
    //         src={
    //           'https://framerusercontent.com/images/zBv8FLxWT91sj5ZJYcocQkJ0GJs.png'
    //         }
    //         alt={'smiley'}
    //         width={'40%'}
    //       />
    //     </span>
    //     <span className={'text-right col-sm-4 pl-5 d-none d-lg-block d-print-block'}>
    //       <Image
    //         src={
    //           'https://framerusercontent.com/images/4Mb9lhQ88PBj0py2C06Q3tXFhw.png'
    //         }
    //         alt={'comb'}
    //         width={'60%'}
    //       />
    //     </span>
    //   </div>

    //   <div className='pt-5 pb-3'>
    //     <Divider space={'1'} />

    //     <div className='row m-0'>
    //       <div className='col-lg-3 col-md-3 col-sm-12 pt-5  '>
    //         <th className={'pb-4 h3'}><b>{translate('TMS.product')}</b></th>
    //         <p className={'text h4 pb-2'}>{translate('TMS.fourthScreen.features')}</p>
    //         <p className={'text h4 pb-2'}>{translate('TMS.pricing')}</p>
    //         <p className={'text h4 pb-2'}>{translate('TMS.download')}</p>
    //         <div className='d-block d-lg-none'>
    //           {/* <Divider space={'0'} /> */}
    //         </div>
    //         <div className='verticalLine d-none d-lg-block d-print-block'></div>
    //       </div>



    //       <div className='col-lg-3 col-md-3 col-sm-12 pt-sm-5 '>
    //         <th className={' h3 pb-4'}><b>{translate('common.company')}</b></th>
    //         <p className={'text h4 pb-2  d-lg-block d-print-block'}>{translate('TMS.about')}</p>
    //         <p className={'text h4 pb-2  d-lg-block d-print-block'}>{translate('TMS.blog')}</p>
    //         <p className={'text h4 pb-2  d-lg-block d-print-block'}>{translate('TMS.contact')}</p>
    //         <div className='d-block d-lg-none'>
    //           {/* <Divider space={'0'} /> */}
    //         </div>
    //         <div className='verticalLine d-none d-lg-block d-print-block'></div>
    //       </div>



    //       <div className='col-lg-3 col-md-3 col-sm-12 pt-sm-5 '>

    //         <th className={'pb-4  h3'}><b>{translate('TMS.community')}</b></th>
    //         <p className={'text h4 pb-2  d-lg-block d-print-block'}>{translate('TMS.help')}</p>
    //         <p className={'text h4 pb-2  d-lg-block d-print-block'}>{translate('TMS.discord')}</p>
    //         <p className={'text h4 pb-2  d-lg-block d-print-block'}>{translate('TMS.twitter')}</p>
    //         <p className={'text h4 pb-2  d-lg-block d-print-block'}>{translate('TMS.linkedin')}</p>

    //         <div className='d-block d-lg-none'>
    //           {/* <Divider space={'0'} /> */}
    //         </div>
    //         <div className='verticalLine d-none d-lg-block d-print-block'></div>
    //       </div>




    //       <div className='col-sm-3 pt-5 pb-5'>
    //         <div className='row '>
    //           <Image
    //             src={image.TMS_Logo}
    //             alt='nav-icon'
    //             width={'50px'}
    //             height={'50px'}
    //             className={'mb-4'}
    //           />
    //           <h1 className={'mt-lg-2 pl-lg-3 pt-lg-1 p-sm-0 p-3 h4 h2 d-lg-block d-print-block'}><b>{translate('TMS.quanta TMS')}</b></h1>
    //           <p className='h4 h3'><> {translate('TMS.footerContent')} </> </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className='Divider'>
    //       {/* <Divider space={'0'} /> */}
    //     </div>
    //   </div>
    //   <footer className={'row justify-content-between m-0'}>
    //     <p className=' col-sm-6 small pl-sm-0 pl-8 h4'><b> {translate('TMS.copyrightcontent')} </b></p>
    //     <p style={{ cursor: 'pointer' }} className='col-sm-2 small h4 text-lg-right mr-sm-0  text-sm-center pl-sm-0 pl-8   '>  <a className='h4' onClick={() => goTo(ROUTES["auth-module"].privacy)}><b> {translate('auth.PrivacyPolicy')} </b> </a></p>
    //     <p style={{ cursor: 'pointer' }} className='col-sm-2 small h4 text-lg-right mr-sm-0  text-sm-center pl-sm-0 pl-8   '>  <a className='h4' onClick={() => goTo(ROUTES["auth-module"].TermsAndConditions)}><b> {translate('auth.Term & Conditions')} </b> </a></p>
    //     <p style={{ cursor: 'pointer' }} className='col-sm-2 small h4 text-lg-right mr-sm-0  text-sm-center pl-sm-0 pl-8   '>  <a className='h4' onClick={() => goTo(ROUTES["auth-module"].ReturnAndRefund)}><b> {translate('auth.Return & Refund')} </b> </a></p>
    //   </footer>
    // </div>
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
                    // href="https://www.creative-tim.com/presentation?ref=adpr-auth-footer"
                    // target="_blank"
                  >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    // href="http://blog.creative-tim.com?ref=adpr-auth-footer"
                    // target="_blank"
                  >
                    Terms & Conditions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    // href="https://www.creative-tim.com/license?ref=adpr-auth-footer"
                    // target="_blank"
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