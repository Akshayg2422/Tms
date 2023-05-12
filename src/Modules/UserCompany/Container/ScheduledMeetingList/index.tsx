import { Button, Card } from '@Components'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import React from 'react'

function ScheduledMeetingList() {

    const { goTo } = useNavigation()


    return (
        <div>
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
                    {/* <div className='col-sm-4'>
                    {scheduledVideoCallData && scheduledVideoCallData.length > 0 && scheduledVideoCallData.map((el: any) => {
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
                                        checking2()
                                        goTo("/dashboard" + ROUTES.ADMIN.VIDEO_CALL,false)
                                    }}
                                />
                            </Card>
                        )
                    })
                    }
                </div> */}
                </Card>
            </div>
        </div>
    )
}

export { ScheduledMeetingList }