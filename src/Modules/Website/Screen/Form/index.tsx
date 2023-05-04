import React from 'react'
import { image } from '@Assets';
import { Image, Button, Input, Divider } from '@Components';
import { translate } from "@I18n";
function Form() {
  return (<>

    <div className='container '>
    <div id='screen2'></div>
      <div className='row mt-sm-0 mt-6 mt-lg-8 mt-md-6 m-0'>
        <h1 className={'text-default secondHeading display-2'}>
          <b>{translate('TMS.secondScreen.Efficient Resolution')}</b>
        </h1>


        <p className={'text-default mt-2 subText mb-4 h2'}>
          {translate('TMS.secondScreen.subText')}
        </p>
        <div className={'row mt-3 mb-lg-5 mb-sm-0 mb-4 '}>
          <div className='col-auto pr-2'>
            <Input placeholder={`${translate('common.email')}`} className={'pr-lg-7 bg-secondary  border-0'} />
          </div>
          <div className={'col-auto '}>
            <Button
              style={{ paddingBottom: '13.10px', paddingTop: '11px' }}
              color={'primary'}
              className={'position-absolute left-0 border-0 shadow-none '}
              text={translate('common.signUp')}
            />
          </div>
        </div>
      </div>
      <div className={'row ml-lg--3 ml-md--3 mt-md-4'}>
         <div className='col-lg-6'>
           <Image
            src={image.TMS_Img2}
            alt={'frame image'}
            width={'100%'}
            height={'100%'}
          /> 
        </div> 
        <div className='col-lg-6 mt-lg-0 mt-sm-0 mt-4 mt-md-5 pl-'>
          <Image
            src={image.TMS_Img3}
            alt={'Sname image'}
            width={'100%'}
            height={'100%'}
          />
        </div>
      </div>
      <Divider space='6'/>

    </div>
  </>
  )
}

export { Form }