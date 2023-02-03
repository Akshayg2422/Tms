import React from 'react'
import { Input, Card, Image, Heading } from '@Components'
import { translate } from '@I18n'
import { icons } from '@Assets'
import { SearchWithList } from '@Modules'

function SearchGooglePlaces() {
  const sampleData =
    [
      {
        id: 1,
        name: 'leora infotech',
        info: 'Buliding enterprise software solution.',
        image: icons.brandFill,
        alt: 'leorainfotech'
      },
      {
        id: 2,
        name: 'srihari clinic',
        info: 'personal care, baby care, health and nutrition.',
        image: icons.brandFill,
        alt: 'clinic'
      },
      {
        id: 3,
        name: 'D cart',
        info: 'Low prices are here,upto 65% offers here',
        image: icons.brandFill,
        alt: 'd cart'
      },
      {
        id: 4,
        name: 'srihari clinic',
        info: 'personal care, baby care, health and nutrition.',

        alt: 'clinic'
      }

    ]
  return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-center mt-3'>
          <div className='col-sm-6'>
            <Card>
              <div className='row mt-3'>
                <div className='col-sm-12'>
                  <Input
                    placeholder={translate('auth.businessNameLocation')!}
                    type={'search'}
                    formSize={'md'} />
                </div>

                <div>
                  <Image
                    className='position-absolute top-5 right-6 my-1'
                    src={require('../../../../Assets/Icons/SearchLine/icon.png')} width={'25px'} height={'25px'} alt='search' />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div>
        {
          sampleData.length > 0 ?
            <div className='container-fluid overflow-auto position-relative' style={{ height: '65vh' }}  >
              {
                sampleData.map((item) => {
                  const { name, info, image, alt } = item
                  return (
                    <SearchWithList title={name} subtitle={info} image={image} alt={alt} />
                  )
                })
              }
            </div>
            :
            <div className='text-center'>
              <Heading variant={'h3'} heading={'No Data Found'} />
            </div>
        }
      </div>
      <div className='fixed-bottom text-center'>
        <Heading heading={"can' t find ?"} variant={'h4'} />
      </div>

    </>



  )
}

export { SearchGooglePlaces }
