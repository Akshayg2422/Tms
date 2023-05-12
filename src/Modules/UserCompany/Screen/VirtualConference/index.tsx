import { Back, Button, Card } from '@Components'
import { useNavigation } from '@Hooks'
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
    { id: 2, name: 'EMPLOYS', },
    // { id: 1, text: 'MEETING', }
]

function VirtualConference() {

    const [selectedNav, setSelectedNav] = useState<any>(1)
    const dispatch = useDispatch()

    const { scheduledListData, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch, user_details, company } = dashboardDetails || ''

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

    console.log("user_details",user_details)

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
        <div className='container py-4'>
            <div className='row ml-1 mt--2'>
                <Back />
                <h3 className=' ml-2'>Session</h3>
            </div>
            <div>
                <Card className='h-100vh'>
                    <div className='text-right'>
                        <Button
                            size='sm'
                            text={"Create Meeting"}
                            onClick={() => {
                                goTo(ROUTES['user-company-module']['schedule-meeting'], false)
                            }}
                        />
                    </div>
                    <div className='col-sm-4'>
                        {scheduledListData && scheduledListData.length > 0 && scheduledListData.map((el: any) => {
                            return (
                                <Card className='col' style={{ backgroundColor: "#d9d9d9" }}>
                                    <div className=''>
                                        <i className="bi bi-camera-video-fill text-black fa-lg align-middle" style={{ fontSize: '50px' }}></i>
                                        <span className='text-black h4 ml-3'>{el.room_name}</span>
                                    </div>
                                    <div>
                                        <span className='text-black'>{"Date :"}</span>
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