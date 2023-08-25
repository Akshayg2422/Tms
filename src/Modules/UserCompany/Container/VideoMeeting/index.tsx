import { icons } from '@Assets'
import { Back, Button, Card, Dropzone, Image, ImageIcon, Spinner } from '@Components'
import { useNavigation, useWindowDimensions } from '@Hooks'
import { translate } from '@I18n'
import { getTokenByUser, getVideoConferenceList, selectedVcDetails } from '@Redux'
import { ROUTES } from '@Routes'
import classnames from 'classnames'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { VideoConference } from '../../Container'
import { join } from 'path'
import styled from 'styled-components'


const LIST_ITEMS = [
    { id: 1, name: 'SESSIONS', },
    // { id: 2, name: 'BATCH INFO', },
    { id: 2, name: 'EMPLOYEES', },
    // { id: 1, text: 'MEETING', }
]

function VideoMeeting() {

    const [selectedNav, setSelectedNav] = useState<any>(1)
    const dispatch = useDispatch()
    const { goTo } = useNavigation()


    const { scheduledListData, dashboardDetails, vcNotificationData } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch, user_details, company } = dashboardDetails || ''
    const { height, width } = useWindowDimensions()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getScheduledMeetingList()
    }, [])

    const getScheduledMeetingList = () => {
        setLoading(true)
        const params = {

        }

        dispatch(getVideoConferenceList({
            params,
            onSuccess: (success: any) => () => {
                setLoading(false)

            },
            onError: (error: string) => () => {
                setLoading(false)
            },

        }))
    }

    console.log("vcNotificationData", vcNotificationData)


    const getUserToken = (data) => {

        const params = {
            vc_id: data?.id,
            user_name: user_details.name,
            email_id: user_details.email,
        }
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: string) => () => {

            },

        }))
    }

    const styles = {
        height: '40px',
        filter: 'invert(100%) sepia(0%) saturate(701%) hue-rotate(304deg) brightness(107%) contrast(88%) '
    }


    return (

        <div className={'m-4'} >

            <div className={'d-flex justify-content-between mb-3 '}>
                <div className='row ml-1' >


                    <Back />
                    <h3 className=' ml-2'>{translate('order.Session')}</h3>
                </div>
                <div className='mr-1'>
                    <Button
                        className={'text-white '}
                        size='sm'
                        text={translate("order.Create Meeting")}
                        onClick={() => {
                            goTo(ROUTES['user-company-module']['schedule-meeting'], false)
                        }}
                    />

                </div>

            </div>
            <Card className='100vh'>

                <div className='row d-flex  ' >

                    {scheduledListData && scheduledListData.length > 0 && scheduledListData.map((el: any) => {
                        return (
                            <div className='col-4' >

                                <Card className='shadow-sm'
                                    style={{ backgroundColor: 'rgb(247, 249, 252)' }}
                                >

                                    {
                                        loading && (
                                            <div className='d-flex justify-content-center align-item-center' style={{ minHeight: '200px', marginTop: '250px' }}>
                                                <Spinner />
                                            </div>
                                        )
                                    }

                                    <div className='d-flex justify-content-center text-center  '>


                                        <div className=' mb-2  ' style={{ background: 'white', borderRadius: '50%', width: '80px', height: '80px' }}>
                                            <ImageIcon size={'xl'} src={icons.videoCall} style={styles} className=' ml-1 mt-4' />
                                        </div>
                                    </div>


                                    <div className='text-center mb-4 '>
                                        <h3 className='text-black h4'>{el.room_name}</h3>
                                    </div>
                                    <div className={'row d-flex justify-content-center text-center  '}>

                                        <ImageIcon src={icons.timeTable} height={20} width={20} />
                                        <h6 className='text-black text-xs pl-2 pr-1'> {moment(el.start_time).format('MMMM Do YYYY')} |</h6>
                                        <h6 className='text-black text-xs pr-1'> {moment(el.start_time).format('h:mm a')} -</h6>
                                        <h6 className='text-black text-xs '> {moment(el.end_time).format('h:mm a')}</h6>
                                    </div>



                                    <div className=' pt-3 d-flex justify-content-center'>
                                      
                                        <Button 
                                        text={'Connect'}
                                        className={'px-6 btn btn-outline-primary shadow-none'}
                                        onClick={() => {
                                            dispatch(selectedVcDetails(el))
                                            getUserToken(el)
                                            goTo(ROUTES['user-company-module']['video-conference'], false)

                                        }}
                                         size={'md'} 
                                        />


                                    </div>

                                </Card>

                            </div>
                        )
                    })
                    }
                </div>
            </Card>










            {/* <div> */}
            {/* <Card className='100vh'>
                
                    <div className='row d-flex justify-content-center' >

                        {scheduledListData && scheduledListData.length > 0 && scheduledListData.map((el: any) => {
                            return (
                                <div style={{ width: '300px' }}>

                                    <Card className='shadow-sm mt-3 m-4' style={{ backgroundColor: 'rgb(246, 248, 253)' }} >
                                        
                                        {
                                            loading && (
                                                <div className='d-flex justify-content-center align-item-center' style={{ minHeight: '200px', marginTop: '250px' }}>
                                                    <Spinner />
                                                </div>
                                            )
                                        }

                                       
                                        <div className=' mb-3 ml-5 ' style={{ background: 'white', borderRadius: '50%', width: '85px', height: '85px' }}>
                                        <ImageIcon size={'xl'}  src={icons.VideoIcon} style={styles} className=' ml-3 mt-4'/>
                                        </div>

                                        <div className='text-center '>
                                            <span className='text-black h4'>{el.room_name}</span>
                                        </div>

                                        <div className=' mt-2 ml-4 text-center' style={{ fontSize: '15px' }}>
                                            <div className='text-left '>
                                                <span className='text-black text-uppercase font-weight-600'>{"Date :"}</span>
                                                <span className='text-black'> {moment(el.start_time).format('MMMM Do YYYY')}</span>
                                            </div>
                                            <div className='text-left '>
                                                <span className='text-black'>{"Start Time :"}</span>
                                                <span className='text-black'> {moment(el.start_time).format('h:mm a')}</span>
                                            </div>
                                            <div className='text-left'>
                                                <span className='text-black'>{"End Time :"}</span>
                                                <span className='text-black'> {moment(el.end_time).format('h:mm a')}</span>
                                            </div>
                                        </div>
                                        <div className=' pt-3 d-flex justify-content-center'>
                                            <Button
                                                size='lg'
                                                icon={icons.VideoImage}
                                                variant='icon-rounded'
                                                height="25px"
                                                width="25px"
                                                onClick={() => {
                                                    dispatch(selectedVcDetails(el))
                                                    getUserToken(el)
                                                    goTo(ROUTES['user-company-module']['video-conference'], false)

                                                }} ></Button>

                                                
                                        </div>

                                    </Card>
                                </div>
                            )
                        })
                        }
                    </div>
                </Card> */}
            {/* </div> */}

        </div>

    )
}

export { VideoMeeting }