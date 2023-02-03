import React from 'react'   
import { Card,Divider } from '@Components';
import { translate } from "@I18n";
function Data() {
  return (
    <>
 <Divider border='1px' space1='6' space3='7' ></Divider>
      <div className='container pb-4'>
        <h1 className='mt-lg-6 mt-sm-0 mt-4 display-2 text-default sub-heading'> {translate('gate.thirdScreen.dataStorageAndRetrieval')} </h1>
        <div className='row justify-content-around pt-2'>
          <div className='col-lg-4 col-md-12 mt-md-4 mt-sm-0 mt-4'>

            <Card
              className=''
              style={{ backgroundColor: '#e1d3fa',height:"100%" }}
            >
              <h2 className={'text-default '}>{translate('gate.thirdScreen.cloudStorage')}</h2>
              <Divider />
              <p className={'text-justify card-text'}> {translate('gate.thirdScreen.cloudStorageSubtext')}</p>
            </Card>
          </div>
          <div className='col-lg-4 col-md-12 mt-md-4 mt-sm-0 mt-4'>
            <Card
              className=''
              style={{ backgroundColor: '#b6dfec',height:"100%" }}
            >
              <h2 className={'text-default'}> {translate('gate.thirdScreen.analysisData')} </h2>
              <Divider />
              <p className='text-justify card-text'> {translate('gate.thirdScreen.analysisDataSubtext')} </p>
            </Card>
          </div>
          <div className='col-lg-4 col-md-12  mt-md-4 mt-sm-0 mt-4'>
            <Card
              className=''
              style={{ backgroundColor: '#cbe7be',height:"100%" }}>
              <h2 className={'text-default'}>{translate('gate.thirdScreen.shareSheets')}</h2>
              <Divider />
              <p className='text-justify  card-text'>
                {translate('gate.thirdScreen.shareSheetsSubtext')}
              </p>
            </Card>
          </div>
        </div>
      </div>



    </>
  )
}

export { Data }