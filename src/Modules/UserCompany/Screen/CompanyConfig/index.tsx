import { Card, HomeContainer, ImagePicker, Input,ColorPicker  } from '@Components'
import { useInput } from '@Hooks'
import React, { useState } from 'react'

function CompanyConfig() {

  const primaryColorPicker=useInput('')
  const secondaryColorPicker=useInput('')
  const playStore=useInput('')
  const appStore=useInput('')
  const siteDomain=useInput('')
  const apiDomain=useInput('')
  const [photo,setPhoto]=useState('')




  return (
    <Card className={'m-3 '}>
        <div className='col'>
                <div className="row mt--2">
              
                    <h3 className="ml-3">{'Company Config'}</h3>
                </div>
            </div>
            <hr className='mt-2'></hr>
    <div className='col-6'>
      
        <ColorPicker
        heading={'Primary'}
        />
        
        <ColorPicker
        heading={'Secondary'}/>

        <Input
        heading={'PlayStore'}/>

        <Input
        heading={'AppStore'}/>

        <Input heading={'SiteDomain'}/>

        <Input heading={'ApiDomain'}/>

        <div className='row'>
        <ImagePicker
        size='xl'
        heading={'ProfileBanner'}
        noOfFileImagePickers={0}
        onSelect={(image) => { 
          let file = image.toString().replace(/^data:(.*,)?/, "")
          setPhoto(file)

        }}
        
        />

        </div>

 


      
        </div>
        </Card>
  )
}

export {CompanyConfig}