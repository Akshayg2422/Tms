import React from 'react'
import { icons } from '@Assets'
import { Card, Image, H , AuthContainer} from '@Components'
import { translate } from '@I18n'
import { useSelector } from 'react-redux'
import { UserBusinessPlaceItem } from '@Services'
const ViewGooglePlaces = () => {

    const { userBusinessPlaces } = useSelector((state: any) => state.AuthReducer);


    console.log(JSON.stringify(userBusinessPlaces));


    return (
        <AuthContainer title='Google Places'>
            {
                userBusinessPlaces && userBusinessPlaces.length > 0 && userBusinessPlaces.map((place: UserBusinessPlaceItem) => {
                    return (
                        <div key={place.place_id} className={'row align-items-center'}>
                            <Image alt={'google-place-image'} variant={'rounded'} src={icons.logo} size={'xl'} />
                            <div className='ml-3'>
                                <H tag={'h2'} className={'mb-0'} text={place.title}/>
                                <small>
                                    {
                                        place.address
                                    }
                                </small>
                            </div>
                        </div>
                    )
                })
            }
        </AuthContainer>
    )
}
export { ViewGooglePlaces }