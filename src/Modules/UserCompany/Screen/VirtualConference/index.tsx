import { icons } from '@Assets'
import { Back, Button, Card, Image } from '@Components'
import { useNavigation, useWindowDimensions } from '@Hooks'
import { translate } from '@I18n'
import { getTokenByUser, getVideoConferenceList } from '@Redux'
import { ROUTES } from '@Routes'
import classnames from 'classnames'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, NavItem, NavLink } from 'reactstrap'


const LIST_ITEMS = [
    { id: 1, name: 'SESSIONS', },
    // { id: 2, name: 'BATCH INFO', },
    { id: 2, name: 'EMPLOYEES', },
    // { id: 1, text: 'MEETING', }
]

function VirtualConference() {

    const [selectedNav, setSelectedNav] = useState<any>(1)
    const dispatch = useDispatch()

    const { scheduledListData, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch, user_details, company } = dashboardDetails || ''
    const { height } = useWindowDimensions()

    useEffect(() => {
        getScheduledMeetingList()
    }, [])

    const getScheduledMeetingList = () => {
        const params = {}
        dispatch(getVideoConferenceList({
            params,
            onSuccess: (success: any) => () => {
                console.log("success============>", success)
            },
            onError: (error: string) => () => {
            },

        }))
    }

    console.log("user_details", user_details)

    const getUserToken = () => {
        const params = {
            user_name: user_details.name,
            email_id: user_details.email,
        }
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {
                console.log("success============>", success)
            },
            onError: (error: string) => () => {
            },

        }))
    }

    console.log("scheduledListData", scheduledListData)


    const { goTo } = useNavigation()
    return (
        <div
            style={{
                height: height
            }}
            className='container py-4'>
            <div className='row ml-1 mt--2'>
                <Back />
                <h3 className=' ml-2'>{translate('order.Session')}</h3>
            </div>
            <div>
                <Card className='100vh'>
                    <div className='text-right'>
                        <Button
                            className={'text-white'}
                            size='sm'
                            text={translate("order.Create Meeting")}
                            onClick={() => {
                                goTo(ROUTES['user-company-module']['schedule-meeting'], false)
                            }}
                        />
                    </div>
                    <div className='col-sm-4'>
                        {scheduledListData && scheduledListData.length > 0 && scheduledListData.map((el: any) => {
                            return (
                                <Card className='col' style={{ backgroundColor: "#ffff" }}>
                                    <div className=''>
                                        <Image src={icons.videoConference} width={50} height={50} />
                                        <span className='text-black h4 ml-3'>{el.room_name}</span>
                                    </div>
                                    <div>
                                        <span className='text-black text-uppercase font-weight-600'>{"Date :"}</span>
                                        <span className='text-black'> {moment(el.start_time).format('MMMM Do YYYY')}</span>
                                    </div>
                                    <div>
                                        <span className='text-black'>{"Start Time :"}</span>
                                        <span className='text-black'> {moment(el.start_time).format('h:mm a')}</span>
                                    </div>
                                    <div>
                                        <span className='text-black'>{"End Time :"}</span>
                                        <span className='text-black'> {moment(el.end_time).format('h:mm a')}</span>
                                    </div>
                                    <Button
                                        className={'text-white'}
                                        text={"Join"}
                                        onClick={() => {
                                            getUserToken()
                                            goTo(ROUTES['user-company-module']['video-conference'], false)

                                        }}
                                    />
                                </Card>
                            )
                        })
                        }
                    </div>
                </Card>
            </div>
        </div>

    )
}

export { VirtualConference }