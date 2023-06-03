import { useEffect, useRef, useState } from 'react'
import { GroupMessage, AddMessage, GroupEmployees, TaskChatGroup } from '@Modules'
import { Card, NoDataFound, } from '@Components'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedGroupChatCode, } from '@Redux'

function Groups() {
    const { taskGroups, } = useSelector((state: any) => state.TaskReducer);
    const { selectedGroupChatCode,chatGroups } = useSelector((state: any) => state.UserCompanyReducer);
    console.log(chatGroups,"vvvvvvvvvvvvv")
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement>(null)
    const [infoHeight, setInfoHeight] = useState(0)

    useEffect(() => {
        if (ref.current) {
            setInfoHeight(ref.current.clientHeight)
        }
    })

    return (
        <div className='m-3 v-100vh'>
            <div className='mx-3 mt-3 mb-0' >
                <TaskChatGroup onClick={(code) => { dispatch(setSelectedGroupChatCode(code)) }} showAll={false} />
            </div>

            {taskGroups && taskGroups.length > 0 ? <div className='row'>
                <div className='col-8' ref={ref}>
                    <Card>
                        <GroupMessage selectedGroup={selectedGroupChatCode?selectedGroupChatCode: chatGroups && chatGroups[0]?.id } />
                        <AddMessage AddGroup={selectedGroupChatCode?selectedGroupChatCode:chatGroups &&chatGroups[0]?.id } />
                    </Card>

                </div>
                <div className='col ml--3' style={{
                    height: infoHeight - 30
                }}>
                    <GroupEmployees groupCode={selectedGroupChatCode?selectedGroupChatCode:chatGroups && chatGroups[0]?.id } />
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
