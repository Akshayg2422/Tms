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

function VirtualConference() {

    const [selectedNav, setSelectedNav] = useState<any>(1)
    const dispatch = useDispatch()
    const { goTo } = useNavigation()


    const { scheduledListData, dashboardDetails, vcNotificationData } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch, user_details, company } = dashboardDetails || ''
    const { height } = useWindowDimensions()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getScheduledMeetingList()
    }, [])

    const getScheduledMeetingList = () => {
        setLoading(true)
        const params = {}
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
        filter: 'invert(35%) sepia(100%) saturate(5908%) hue-rotate(245deg) brightness(73%) contrast(132%) '
        
        
    }


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

                                        {/* <div className='text-center mb-3' style={{background:'white',borderRadius:'50%',width:'100px',height:'100px'}}>
                                            <ImageIcon size={'xl'}  src={icons.VideoIcon} style={styles}/>
                                        </div> */}

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

                                        {/* </Image> */}
                                        {/* <Button
                                        className={'text-white'}
                                        // text={translate("product.Join")}
                                        style={{color:'red'}}
                                        onClick={() => {
                                            getUserToken()
                                            goTo(ROUTES['user-company-module']['video-conference'], false)

                                        }}
                                    ><i className="tim-icons icon-delivery-fast" /></Button> */}
                                        {/* <div className="buttons">
                                        <Button
                                            className="btn-round mr-3 pulse"
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="lg"
                                        >
                                            <i className="tim-icons icon-delivery-fast" />
                                        </Button>
                                        <p>Watch now!</p>
                                    </div> */}
                                    </Card>
                                </div>
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