import { icons } from '@Assets';
import { Back, Button, Card, DateTimePicker, Input, InputHeading, Image } from '@Components';
import { useDynamicHeight, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { getEmployeesl, postVideoConference } from '@Redux';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ScheduleMeeting() {
    const dispatch = useDispatch();
    const { goTo, goBack } = useNavigation()
    const { employeesl, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const dynamicHeight: any = useDynamicHeight()

    const { company_branch, user_details, company } = dashboardDetails || ''

    const [filteredData, setFilteredData] = useState<any>()
    const [searchAddedStudent, setSearchAddedStudent] = useState('')
    const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState<any>([])
    const [batchCode, setBatchCode] = useState('')
    const [batchId, setBatchId] = useState('')
    const [roomTitle, setRoomTitle] = useState<any>()
    const [scheduleData, setScheduleDate] = useState<any>()
    const [startTime, setStartTime] = useState<any>()
    const [endTime, setEndTime] = useState<any>()
    const [isSelected, setIsSelected] = useState<any>(false)


    useEffect(() => {
        getEmployeesHandler(1)
        setSelectedEmployeeDetails([user_details])
    }, [])

    console.log("employeesl", user_details)

    const addSelectedEmployeeDetails = (item: any, type: any) => {
        if (type === 'Select All') {
            setSelectedEmployeeDetails([...selectedEmployeeDetails, ...employeesl])
        }
        else if (type === 'Remove All') {
            setSelectedEmployeeDetails([])
        }
        else {
            let updateSelectedBatchUser = [...selectedEmployeeDetails];

            const isExists = updateSelectedBatchUser?.some(
                (el: any) => el.id === item.id
            ) as never;

            if (isExists) {
                updateSelectedBatchUser = updateSelectedBatchUser?.filter(
                    (eachItem: any) => eachItem.id !== item.id
                );
            }
            else {
                updateSelectedBatchUser = [...updateSelectedBatchUser, item as never];
            }
            setSelectedEmployeeDetails(updateSelectedBatchUser as never)
        }
    };


    const getEmployeesHandler = ((page_number: any) => {
        const params = {
            page_number
        }
        dispatch(
            getEmployeesl({
                params,
                onSuccess: (response: any) => () => {

                },
                onError: (error) => () => {
                },
            })

        )
    })

    useEffect(() => {
        filterEmployeeData()
    }, [selectedEmployeeDetails])

    const filterEmployeeData = () => {
        let array: any = []
        selectedEmployeeDetails.forEach((el) => {
            array.push({
                emp_id: el?.id,
                user_name: el?.name,
                email_id: el?.email
            })
        })
        setFilteredData(array)
    }

    const addEmployeeDetailsToScheduleMeeting = () => {
        const params = {
            room_name: roomTitle,
            start_date: scheduleData + ' ' + startTime + ":00",
            end_date: scheduleData + ' ' + endTime + ":00",
            emp_details: filteredData
        }
        dispatch(postVideoConference({
            params,
            onSuccess: (success: any) => () => {
                console.log("success============>", success)
            },
            onError: (error: string) => () => {
            },

        }))
    }


    return (
        <div className='container py-4'>
            <div className='row ml-1 mt--2'>
                <Back />
                <h3 className=' ml-2'>{translate('order.Meeting Schedule')}</h3>
            </div>
            <Card>

                <div className='row mt-2'>

                    <div className=' col-sm-3'>
                        <InputHeading
                            id={"Title"}
                            heading={translate('order.Title')}
                        />
                        <Input
                            placeholder={translate("order.Title")}
                            id='Title'
                            onChange={(e) => {
                                setRoomTitle(e.target.value)
                            }}
                        />
                    </div>
                    <div className=' col-sm-3'>
                        <DateTimePicker
                            // disableFuture={true}
                            format='YYYY-MM-DD'
                            heading={translate("order.Schedule Date")}
                            placeholder={translate("order.Schedule Date")!}
                            value={''}
                            onChange={(e) => { setScheduleDate(e) }}
                        />
                    </div>
                    <div className='col-sm-3'>
                        <InputHeading
                            id={"Start Time"}
                            heading={translate("order.Start Time")}
                        />
                        <Input
                            defaultValue="10:30:00"
                            id="Start Time"
                            type="time"
                            onChange={
                                (e) => { setStartTime(e.target.value) }
                            }
                        />
                    </div>
                    <div className='col-sm-3'>
                        <InputHeading
                            id={"End Time"}
                            heading={translate("order.end Time")}
                        />
                        <Input
                            defaultValue="10:30:00"
                            id="End Time"
                            type="time"
                            onChange={
                                (e) => { setEndTime(e.target.value) }
                            }
                        />
                    </div>
                </div>
            </Card>
            <div className='row  mt-3'>


                <div className='col-sm-6'>
                    <Card style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 330 : dynamicHeight.dynamicHeight - 50 }}>
                        <div className='mb-4 d-flex justify-content-between mr-3'>
                            <h3 className=''>{translate("order.Employee list")}</h3>
                            <div className=''>
                                <Button
                                    text={translate("order.Select All")}
                                    size={'sm'}
                                    onClick={() => {
                                        addSelectedEmployeeDetails(employeesl, 'Select All')
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='col-sm-8 ml--3  mt--4'>
                                <Input
                                    // heading={'Search Student'}
                                    placeholder={translate('order.Search student')}
                                    value={searchAddedStudent}
                                    onChange={(e) => {
                                        setSearchAddedStudent(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className='overflow-auto scroll-hidden' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 170 : dynamicHeight.dynamicHeight - 50 }}>
                            {
                                employeesl && employeesl.length > 0 && employeesl.map((el: any) => {
                                    console.log("data===>", el)
                                    const isActive = selectedEmployeeDetails && selectedEmployeeDetails?.some((item: any) => item?.id === el?.id)
                                    return (
                                        <>
                                            <div className='d-flex justify-content-between mb-4 ' >
                                                <div className='d-flex'>
                                                    {/* <Image
                                                        variant={'rounded'}
                                                        alt="..."
                                                        src={el.photo ? getImageUrl(el.photo) : icons.profile}
                                                    /> */}
                                                    <h4 className='ml-2 mt-2'>{el?.name}</h4>
                                                </div>
                                                <div>
                                                    <div className='mt--4'>
                                                        <div className='d-flex justify-content-between my-4'>
                                                            {/* <div className='col-xl-6 col-sm-0 '>
                                                        <h3>{el.name}</h3>
                                                    </div> */}
                                                            <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>
                                                                <i className={`bi bi-${isActive ? 'check-circle-fill pointer text-success' : 'circle-fill text-light'} pointer`}
                                                                    onClick={() => {
                                                                        addSelectedEmployeeDetails(el, '')
                                                                    }}
                                                                ></i>
                                                            </td>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>

                    </Card>

                </div>
                <div className='col-sm-6'>
                    <Card style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 330 : dynamicHeight.dynamicHeight - 50 }}>
                        <div className='mb-4 d-flex justify-content-between mr-3'>
                            <h3 className='mb-4'>{translate("order.Selected List")}</h3>
                            <div className=''>
                                <Button
                                    text={"Remove All"}
                                    onClick={() => {
                                        addSelectedEmployeeDetails('', 'Remove All')
                                    }}
                                />
                            </div>
                        </div>
                        <div className='overflow-auto scroll-hidden' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 170 : dynamicHeight.dynamicHeight - 50 }}>
                            {selectedEmployeeDetails && selectedEmployeeDetails.length > 0 && selectedEmployeeDetails.map((el:any) => {
                                const isActive = selectedEmployeeDetails && selectedEmployeeDetails?.some((item: any) => item?.id === el?.id)

                                return (
                                    <>
                                        <div className='d-flex justify-content-between mt-4'>
                                            <div className='d-flex'>
                                                {/* <Image
                                                    variant={'rounded'}
                                                    alt="..."
                                                    src={el.photo ? getImageUrl(el.photo) : icons.profile}
                                                /> */}
                                                <h4 className='ml-2 mt-2'>{el?.name}</h4>
                                            </div>
                                            <div>
                                                <div className='mt--4'>
                                                    <div className='d-flex justify-content-between my-4'>
                                                        {/* <div className='col-xl-6 col-sm-0 '>
                                                        <h3>{el.name}</h3>
                                                    </div> */}
                                                        <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>
                                                            <i className={`bi bi-${'bi bi-x-circle-fill pointer text-danger'}`}
                                                                onClick={() => {
                                                                    addSelectedEmployeeDetails(el, '')
                                                                }}
                                                            ></i>
                                                        </td>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            }

                        </div>
                        <div className='text-right mb--3'>
                            <Button
                                text={translate("common.submit")}
                                size='lg'
                                onClick={() => {
                                    addEmployeeDetailsToScheduleMeeting()
                                }}
                            />
                        </div>
                    </Card>
                </div>
            </div>



        </div >
    )
}

export { ScheduleMeeting }