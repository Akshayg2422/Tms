import { Input, Card, Heading, Button, Option } from '@Components'
import React, { useState } from 'react'
import { RegisterBusinessProps } from './interfaces'
import { icons } from '@Assets'
import { translate } from '@I18n'
import DropDown from '@Components//Core/DropDown'

function RegisterBusiness() {
  const [businessName, setBusinessName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessPinCode, setBusinessPinCode] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [businessSector, setBusinessSector] = useState([
    { id: "1", text: 'tamil', other: 'Business Sector' },
    { id: "2", text: 'selvan', other: 'Business Sector' }
  ])
  const [businessServiceType, setBusinessServiceType] = useState([
    { id: "1", text: 'tamil333', other: 'Business Sector' },
    { id: "2", text: 'selva6666n', other: 'Business Sector' }
  ])
  const [businessServiceProvider, setBusinessServiceProvider] = useState([
    { id: "1", text: 'tamilaaaaa', other: 'Business Sector' },
    { id: "2", text: 'jjjjj', other: 'Business Sector' }
  ])

  const handleChange = () => {

  }
  return (
    <div className='container-fluid '>
      <div className='row justify-content-center'>
        <div className='col-sm-7 py-5 '>
          <Card >
            <div className='text-center pb-5'>
              <Heading variant={'h1'} text-white heading={translate('common.register')} text-center />
            </div>
            <div className='col-sm-10 mx-sm-5 px-sm-5' >
              <Input id={'Business Name'} heading={translate('common.businessName')} type={'text'} />
              <Input id={'Business Address'} heading={translate('common.businessAddress')} type={'text'} value={businessAddress} onChange={handleChange} />
              <Input id={'Business PinCode'} heading={translate('common.businessPinCode')} type={'number'} value={businessPinCode} onChange={handleChange} />
              <Input id={'Contact Number'} heading={translate('common.contactNumber')} type={'number'} value={businessName} onChange={handleChange} />
              <Input id={'Alternative Contact Number'} heading={translate('common.alternativeContactNumber')} type={'number'} value={contactNumber} onChange={handleChange} />
              <DropDown heading={'Business Sector'} data={businessSector} />
              <DropDown heading={'Business Service Type'} data={businessServiceType} />
              <DropDown heading={'Business Service Provide'} data={businessServiceProvider} />

            </div>
            <div className='col-sm-3 ml-sm-5 pl-sm-5 pt-sm-3 '>
              <Card style={{ width: '100px', height: '100px' }}>
                <img className='' src={icons.plusBlack} alt={'Responsive img'} width='50px' height='50px'></img>
              </Card>
            </div>
            <div className='col-sm-12 text-center py-3'>
              <Button text={'Submit'} padding={'px-5'} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { RegisterBusiness }