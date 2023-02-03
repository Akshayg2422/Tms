import React from 'react'
import { image } from '@Assets';
import { Card, Divider } from '@Components';
import { translate } from "@I18n";
function HowItWork() {
  return (
    <div className='container pt-5'>
    <p className='text-center disc display-1 text-default pt-lg-5 pt-sm-0 pt-3  pb-lg-5 pt-sm-0 pb-4'>{translate('gate.sixthScreen.discoverHowItWork')}</p>
    <Card className='mt-3 pb-4 bg-secondary shadow-none'>
      <div className='row '>
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <div className=' pt-lg-6 pt-sm-0 pt-1 pl-sm-5 pl-md-0'>
            <h1 className={'text-default display-2 sub-heading col-lg-8 col-sm-12'}>{translate('gate.sixthScreen.howItWork')}</h1>
            <p className='text-default h2 font-weight-normal col-lg-11 col-sm-12 mt-4'>{translate('gate.sixthScreen.howItWorkSubtext')}</p>
            <div className='mt-lg-6 mt-sm-0 mt-4 mb-sm-0 mb-4 pl-sm-0 pl-2'>
              <a href="#">
              <i className='bi bi-play-circle-fill text-primary fa-4x' ></i>
              </a>
              <span className='ml-sm-0 ml-1 text-default sptag'> <b>{translate('gate.WatchTutorial')}</b></span>
            </div>
          </div>
        </div>
        {/* <div className='verticalLine d-none d-lg-block d-print-block mt--4 mb--5'></div> */}

        <div className='col-lg-6 col-md-12 col-sm-12  mt-md-5'>
          <div className='row'>
            <div className='col-sm-8'>
              <h2 className='text-default mt-md-3'>{translate('gate.sixthScreen.entry')}</h2>
              <p className='text-default  h4 font-weight-light mt-1'> {translate('gate.sixthScreen.entrySubtext')} </p>
            </div>
            <div className='col-sm-4'>
              <i className='bi bi-box-arrow-right fa-3x ml-lg-4 ml-md-6  text-blue ' ></i>
            </div>
          </div>

          <Divider opacity={'4'} />
          <div className='row'>
            <div className='col-sm-8'>

              <h2 className='text-default '> {translate('gate.sixthScreen.processing')} </h2>
              <p className='text-default h4 font-weight-light mt-1'> {translate('gate.sixthScreen.processingSubtext')} </p>
            </div>
            <div className='col-sm-4'>

              <i className='bi bi-qr-code-scan ml-lg-4 ml-md-6 fa-3x text-purple'></i>
            </div>
          </div>
          <Divider opacity={'4'} />

          <div className='row'>
            <div className='col-sm-8'>
              <h2 className='text-default'>{translate('gate.sixthScreen.exit')}</h2>
              <p className='text-default h4 font-weight-light mt-1'>{translate('gate.sixthScreen.exitSubtext')}</p>
            </div>
            <div className='col-sm-4 '>
              <i className='bi bi-box-arrow-left ml-lg-4 ml-md-6 fa-3x text-success'></i>
            </div>
          </div>
        </div>
      </div>

    </Card>
  </div>
 
  )
}

export { HowItWork }