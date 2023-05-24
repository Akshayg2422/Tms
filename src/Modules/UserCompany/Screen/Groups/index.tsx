import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
<<<<<<< HEAD
import { GroupMessage, AddMessage, TaskGroups, GroupEmployees, } from '@Modules'
import { Card, } from '@Components'
=======
import { GroupMessage, AddMessage, TaskGroups,SubTaskGroup, GroupEmployees,} from '@Modules'
import { Card,} from '@Components'
>>>>>>> 3a42dd5a6d9bb7861c3382e005fa940567abaf6c
import { useSelector } from 'react-redux'
import { useWindowDimensions } from '@Hooks';


function Groups() {

<<<<<<< HEAD
    const { taskGroups, } = useSelector((state: any) => state.TaskReducer);
    const [selectGroup, setSelectGroup] = useState<any>()
=======
    const { taskGroups } = useSelector((state: any) => state.TaskReducer);
    const [selectGroup,setSelectGroup] = useState<any>()
>>>>>>> 3a42dd5a6d9bb7861c3382e005fa940567abaf6c
    const { height } = useWindowDimensions()
   

<<<<<<< HEAD
    useEffect(() => {
        if (taskGroups && taskGroups.length > 0) {
            setSelectGroup(taskGroups[0].id)
        }
=======
useEffect(()=>{
    if(taskGroups&& taskGroups.length>0)
    {
        setSelectGroup(taskGroups[0].id)
       
    }
>>>>>>> 3a42dd5a6d9bb7861c3382e005fa940567abaf6c

    }, [taskGroups])
    return (
        <div className='mx-3 '>
<<<<<<< HEAD
            <div className='row mb-0'>
                <div className=" mx-4 mt-3 mb-0">
                    <TaskGroups onClick={(code) => setSelectGroup(code)} showAll={false} />
=======
         
            <div className='row mb-0' >
                <div className=" mx-4 mt-3 mb-0" >
                    <TaskGroups onClick={(code) => setSelectGroup(code)} showAll={false}/>
>>>>>>> 3a42dd5a6d9bb7861c3382e005fa940567abaf6c
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
