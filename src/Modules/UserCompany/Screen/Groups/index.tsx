import React, { useState } from 'react'
import { GroupMessage, AddMessage, TaskGroups, GroupEmployees,} from '@Modules'
import { Card,} from '@Components'
import { useSelector } from 'react-redux'


function Groups() {
    const { taskGroups, } = useSelector((state: any) => state.TaskReducer);
    const [selectGroup,setSelectGroup] = useState<any>(taskGroups && taskGroups[0].id)
    
    console.log('taskGroup===>',taskGroups)
    console.log('selectGroup======>>',selectGroup)

    return (
        <div className='mt-4 m-3'>
            <div className='row'>
                <div className="mx-2 mb--3 m-3">
                    <TaskGroups onClick={(code) => setSelectGroup(code)} />
                </div>
            </div>
            <div className='row'>
                <div className='col-8 pt-3' >
                    <Card>
                        <GroupMessage selectedGroup={selectGroup}/>
                        <AddMessage AddGroup={selectGroup} />
                    </Card>
                </div>
                <div className='col-4'>
                    <GroupEmployees Employees={selectGroup}/>
                </div>
            </div>

        </div>
    )
}
export { Groups }
