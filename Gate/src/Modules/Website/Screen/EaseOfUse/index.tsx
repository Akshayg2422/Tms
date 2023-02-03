import React from 'react'
import { image } from '@Assets';
import { Image, Divider } from '@Components';
import { translate } from "@I18n";
function EaseOfUse() {
  return (
    <div className='bg-secondary'>
      <div className='container pt-lg-3 pb-lg-7   pb-sm-0 pb-5 pb-md-5 '>
        <div className='row'>
          <div className='col-lg-6 col-md-12 col-sm-12 my-auto pt-md-6 pt-sm-0 pt-5 '>
            <div className='row justify-content-center '>
              <Image
                src={
                  image.EaseOfUse
                }
                width={'80%'}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-12 col-sm-12   mt-md-6 mt-sm-0 mt-5  pb-sm-0 pb-5 pr-sm-7 '>
              <h1 className='sub-heading display-2  pl-3 text-default '>
                {translate('gate.fifthScreen.easeOfUse')}
              </h1>
              <h2 className='text-default tag34 mt-4 col-lg-11'>
                {translate('gate.fifthScreen.easeOfUseSubtext')}
              </h2>

              <Divider space1='5' opacity={'4'} space3={'3'} />
              <div className='pl-3'>
                <i className='bi bi-qr-code-scan pr-3 fa-2x text-primary'></i>
                <span className='sptag1'>
                  <strong className='text-default font-weight-normal pl-3'> {translate('gate.fifthScreen.accurateBillingWithQRCode')} </strong>
                </span>
              </div>
              <Divider space='3' opacity={'4'} space3={'3'} />
              <div className='pt-1 pl-3'>
                <i className='bi bi-database pr-3 fa-2x text-primary'></i>
                <span className='sptag1'>
                  <strong className='text-default font-weight-normal pl-3'>{translate('gate.fifthScreen.easyDataStotrage')}</strong>
                </span>
              </div>
              <Divider space='3' opacity={'4'} space3={'3'} />
              <div className='pt-1  pl-3'>
                <i className='bi bi-tablet pr-3 fa-2x text-primary'></i>
                <span className='sptag1'>
                  <strong className='text-default font-weight-normal  pl-3'>{translate('gate.fifthScreen.easyInterface')}</strong>
                </span>
              </div>
            </div>
            </div>
        </div>
      </div>

      )
}

      export {EaseOfUse}