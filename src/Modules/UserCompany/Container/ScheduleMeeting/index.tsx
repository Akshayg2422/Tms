import { getEmployeesl } from '@Redux';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function ScheduleMeeting() {
    const dispatch = useDispatch();


    useEffect(() => {
        getEmployeesHandler(1)
    }, [])
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
    return (
        <div>
            ttttttttttttttttttttttttttttttttttttttt
        </div>
    )
}

export { ScheduleMeeting }