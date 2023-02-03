import { icons } from '@Assets'
import { Card, Image } from '@Components'
import { translate } from '@I18n'
import React from 'react'
import { ViewGooglePlacesProps } from './interface'

type Item = {
    name: string;
    street: string;
    place: string;
    pincode: string;
    photo: any;
}
const ViewGooglePlaces: React.FC<ViewGooglePlacesProps> = ({ }) => {
    const registrationAddress: Array<Item> = [
        {
            photo: icons.clinic,
            name: 'Alphonsa Clinic',
            street: '23/A, Amala street,',
            place: 'Vadapalani, Chennai,',
            pincode: 'Pincode: 602105'
        },
        {
            photo: icons.clinic,
            name: 'Alphonsa Clinic',
            street: '23/A, Amala street,',
            place: 'Vadapalani, Chennai,',
            pincode: 'Pincode: 602105'
        },
        {
            photo: icons.clinic,
            name: 'Alphonsa Clinic',
            street: '23/A, Amala street,',
            place: 'Vadapalani, Chennai,',
            pincode: 'Pincode: 602105'
        },
        {
            photo: icons.clinic,
            name: 'Alphonsa Clinic',
            street: '23/A, Amala street,',
            place: 'Vadapalani, Chennai,',
            pincode: 'Pincode: 602105'
        },
        {
            photo: icons.clinic,
            name: 'Alphonsa Clinic',
            street: '23/A, Amala street,',
            place: 'Vadapalani, Chennai,',
            pincode: 'Pincode: 602105'
        },
        {
            photo: icons.clinic,
            name: 'Alphonsa Clinic',
            street: '23/A, Amala street,',
            place: 'Vadapalani, Chennai,',
            pincode: 'Pincode: 602105'
        },
    ]
    return (
        <>
            <div className="mb-3 row" style={{ display: 'flex' }}>
                <h1 className='col-xl-12 text-center mt-2'>{translate('auth.registration')}</h1>
            </div>
            <div className='col-xl-6 container col-12 overflow-auto position-relative' style={{ height: '80vh' }}>
                {registrationAddress.map((item) => {
                    return (
                        <Card>
                            <div className='p-2'>
                                <div className='row'>
                                    <div className='col-4 my-auto'>
                                        <Image alt={'image'} src={item.photo} size={'lg'} variant={'rounded'} />
                                    </div>
                                    <div className='col-8 my-auto'>
                                        <h4>
                                            {item.name}
                                        </h4>
                                        <h5>
                                            {`${item.street} ${item.place} ${item.pincode}`}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
            <div className='fixed-button text-center mt-2'>
                <h3>{translate('auth.notYourBusiness')}</h3>
            </div>
        </>
    )
}
export { ViewGooglePlaces }