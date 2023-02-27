import React from 'react'
import { image } from '@Assets';
import { Card, Divider,Image } from '@Components';
import { translate } from "@I18n";
function EvantManagSystem() {
  return (
    <div className='container pt-5'>
    <h1 className='text-center disc display-1 text-default pt-lg-5 pt-sm-0 pt-3  pb-lg-5 pt-sm-0 pb-4'><b>{translate('TMS.sixthScreen.discoverHowItWork')}</b></h1>
    <Card className='mt-3 pb-4 bg-secondary shadow-none'>
      <div className='row '>

        <div className='col-lg-6 col-md-12 col-sm-12 my-auto pt-md-6 pt-sm-0 pt-5 '>
            <div className='row justify-content-center '>
              <Image
                src={
                  image.TMS_2
                }
                width={'80%'}
              />
            </div>
            <div className='mt-lg-6 mt-sm-0 mt-4 mb-sm-0 mb-4 pl-sm-0 '>
              <a href="#">
              <i className='bi bi-play-circle-fill text-primary fa-4x pl-4 pl-sm-4' ></i>
              </a>
              <span className='ml-sm-0 ml-4 text-default sptag pl-2'> <b>{translate('TMS.WatchTutorial')}</b></span>
            </div>
          </div>
          <div className='col-lg-6 col-md-12 col-sm-12'>
          <div className=' pt-lg-6 pt-sm-0 pt-1 pl-sm-5 pl-md-0'>
            <h1 className={'text-default display-2 sub-heading col-lg-12 col-sm-12 '}><b>{translate('TMS.sixthScreen.Event Management System')}</b></h1>
            <p className='text-default h2 font-weight-normal col-lg-11 col-sm-12 mt-4 '>
              <b>
              <ul>
              <li>{translate('TMS.sixthScreen.Event planningSubtext')}</li>
              <li>{translate('TMS.sixthScreen.Coordinating logisticsSubtext')}</li>
              <li>{translate('TMS.sixthScreen.Promoting the eventSubtext')}</li>
              <li>{translate('TMS.sixthScreen.Managing the eventSubtext')}</li>
              <li>{translate('TMS.sixthScreen.Evaluating the eventSubtext')}</li>
              {translate('TMS.sixthScreen.contentSubtext')}
              
              </ul>
              </b>
              </p>
          </div>
        </div>
      </div>

    </Card>
  </div>
 
  )
}

export { EvantManagSystem }