import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { GroupMessage, AddMessage, TaskGroups, GroupEmployees, } from '@Modules'
import { Card, } from '@Components'
import { useSelector } from 'react-redux'
import { useWindowDimensions } from '@Hooks';


function Groups() {

    const { taskGroups, } = useSelector((state: any) => state.TaskReducer);
    const [selectGroup, setSelectGroup] = useState<any>()
    const { height } = useWindowDimensions()

    useEffect(() => {
        if (taskGroups && taskGroups.length > 0) {
            setSelectGroup(taskGroups[0].id)
        }

    }, [taskGroups])
    return (
        <div className='mx-3 '>
            <div className='row mb-0'>
                <div className=" mx-4 mt-3 mb-0">
                    <TaskGroups onClick={(code) => setSelectGroup(code)} showAll={false} />
                </div>
            </div>
            <div className='row mt--2'>
                <div className='col-8 mr--3' >
                    <Card className='shadow-none '>
                        <GroupMessage selectedGroup={selectGroup} />
                        <AddMessage AddGroup={selectGroup} />
                    </Card>
                </div>
                <div className='col-4 mx-0'>
                    <GroupEmployees Employees={selectGroup} height={height} />
                </div>
            </div>

        </div>
    )
}
export { Groups }
