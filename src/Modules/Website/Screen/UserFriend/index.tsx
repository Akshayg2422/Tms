import React from 'react'
import { image } from '@Assets';
import { Image, Divider } from '@Components';
import { translate } from "@I18n";
function UserFriend() {
  return (
    <div className='bg-secondary'>
      <div className='container pt-lg-3 pb-lg-7   pb-sm-0 pb-5 pb-md-5 '>
        <div className='row'>
          <div className='col-lg-6 col-md-12 col-sm-12 my-auto pt-md-6 pt-sm-0 pt-5 '>
            <div className='row justify-content-center '>
              <Image
                src={
                  image.TMS_3
                }
                width={'70%'}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-12 col-sm-12   mt-md-6 mt-sm-0 mt-5  pb-sm-0 pb-5 pr-sm-7 '>
            <h1 className='sub-heading display-2  pl-3 text-default '>
              <b>{translate('TMS.fifthScreen.User-Friendly Interface')}</b>
            </h1>
            <h2 className='text-default tag34 mt-4 col-lg-11'>
              <b>{translate('TMS.fifthScreen.User-Friendly InterfaceSubtext')}</b>
            </h2>

          </div>
        </div>
      </div>
    </div>

  )
}

export { UserFriend }