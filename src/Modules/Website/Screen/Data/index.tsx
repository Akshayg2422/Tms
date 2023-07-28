import React from 'react'   
import { Card,Divider } from '@Components';
import { translate } from "@I18n";
function Data() {
  return (
    <>
 {/* <Divider border='1px' space1='6' space3='7' ></Divider> */}
      <div className='container pb-4'>
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
      </div>

      

    </>
  )
}

export { Data }