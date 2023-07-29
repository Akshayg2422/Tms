import { Card, HomeContainer, ImagePicker, Input, ColorPicker, Button } from '@Components'
import { useInput, useNavigation } from '@Hooks'
import { fetchUsingCompanyLabel } from '@Redux'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function CompanyConfig() {

  const dispatch = useDispatch()

  const primaryColorPicker = useInput('#fcfafa')
  const secondaryColorPicker = useInput('#fcfafa')
  const playStore = useInput('')
  const appStore = useInput('')
  const siteDomain = useInput('')
  const apiDomain = useInput('')
  const [photo, setPhoto] = useState('')


  const companyLabelHandler = () => {
    const params = {

      primary_color: primaryColorPicker.value,
      secondary_color: secondaryColorPicker.value,
      play_store_id: playStore.value,
      app_store_id: appStore.value,
      site_domain: siteDomain.value,
      api_domain: apiDomain.value,
      code: 'CDFG',
      profile_banner: photo
    }
    console.log(params,"ppppp==<")
    dispatch(
      fetchUsingCompanyLabel({
        params,
        onSuccess: (response: any) => () => {

        },
        onError: (error: any) => () => {

        }

      })
    )

  }




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
          value={primaryColorPicker.value}
          onChange={primaryColorPicker.onChange}
        />

        <ColorPicker
          heading={'Secondary'} value={secondaryColorPicker.value}
          onChange={secondaryColorPicker.onChange}
        />

        <Input
          heading={'PlayStore'}
          value={playStore.value}
          onChange={playStore.onChange}
        />

        <Input
          heading={'AppStore'}
          value={appStore.value}
          onChange={appStore.onChange} />

        <Input heading={'SiteDomain'}
          value={siteDomain.value}
          onChange={siteDomain.onChange} />

        <Input heading={'ApiDomain'}
          value={apiDomain.value}
          onChange={apiDomain.onChange} />

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
      <div className='d-flex justify-content-end text-right mt-3'>
        <Button text={'Submit'} size={'sm'}
          onClick={() => {
            companyLabelHandler()
          }} />

      </div>
    </Card>
  )
}

export { CompanyConfig }