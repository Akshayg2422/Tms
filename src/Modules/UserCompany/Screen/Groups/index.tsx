import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { GroupMessage, AddMessage, TaskGroups, GroupEmployees, } from '@Modules'
import { Card, NoDataFound, } from '@Components'
import { useSelector } from 'react-redux'
import { useWindowDimensions } from '@Hooks';


function Groups() {

    const { taskGroups, } = useSelector((state: any) => state.TaskReducer);
    const [selectGroup, setSelectGroup] = useState<any>()

    const ref = useRef<HTMLDivElement>(null)

    const { width, height } = useWindowDimensions()
    const [infoHeight, setInfoHeight] = useState(0)

    useEffect(() => {
        if (taskGroups && taskGroups.length > 0) {
            setSelectGroup(taskGroups[0].id)
        }

    }, [taskGroups])

    useEffect(() => {
        if (ref.current) {
            setInfoHeight(ref.current.clientHeight)
        }
    })

    return (
        <div className='m-3 v-100vh'>
            <div className='mx-3 mt-3' >
                <TaskGroups onClick={(code) => setSelectGroup(code)} showAll={false} />
            </div>

            {taskGroups && taskGroups.length > 0 ? <div className='row'>
                <div className='col-8' ref={ref}>
                    <Card>
                        <GroupMessage selectedGroup={selectGroup} />
                        <AddMessage AddGroup={selectGroup} />
                    </Card>

                </div>
                <div className='col ml--3' style={{
                    height: infoHeight - 30
                }}>
                    <GroupEmployees Employee={selectGroup} />
                </div>
            </div>
                : <div className='d-flex h-100vh justify-content-center align-items-center'>
                    <NoDataFound text={'No Group Found'} />
                </div>
            }

        </div >
    )
}
export { Groups }
