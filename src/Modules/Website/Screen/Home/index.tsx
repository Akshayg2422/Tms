import React from 'react'
import { image } from '@Assets';
import { Image ,Button} from '@Components';
import {Card, Container, Row, Col } from "reactstrap";
import { translate } from "@I18n";
function Home() {
  return (
    <>
      <div className="bg-secondary header pt-5 pb-3">
        <div className='container'>
          <div className="header-body">
            <div className="row align-items-center hvh">
              <div className='col-lg-6  mt-sm-0 mt-5 mb-sm-0 mb-4  mt-md-7 mb-md-4'>
                <div className="pr-lg-2 ml-md-4">
                  <h1 className=" text-uppercase mainHeading text-default mb-0">
                    {translate('TMS.quanta TMS')}
                  </h1>
                  <h2 className=" text-default mainSubtext mt-3">
                    {translate('TMS.quanta TMS Subtext')}
                  </h2>
                  <div className="row mt-4 btn-pos m-0">
                  <Button
                   className="text-white shadow-none border-0 px-4 "
                   text={translate('TMS.download')}
                   size={'lg'}
                    />
                    <Button
                     className="text-white shadow-none border-0 d-lg-block d-md-block d-none px-4 "
                     style={{ background: "#b56feb" }}
                     text={translate('TMS.learnMore')}
                     size={'lg'}
                      />
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='row justify-content-center mt-lg-7 ml-lg-5 '>
                  <Image src={image.TMS_8} 
                  width={'90%'}
                   />
                </div>
              </div>
            </div>
            <div className='row scroll mt-sm-0 mt-3  mt-md-7 ml-md-2'>
            <a href='#screen2 '>
            <i className='bi bi-arrow-down-circle-fill pl-2 fa-2x icons '></i>
            <span className='small text-default pl-2 sptag1'>{translate('TMS.scrollDown')}</span>

          </a>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export { Home }