import { useEffect, useRef, useState } from 'react'
import { GroupMessage, AddMessage, GroupEmployees, TaskChatGroup } from '@Modules'
import { Card, NoDataFound, } from '@Components'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedGroupChatCode, } from '@Redux'
import { translate } from '@I18n'

function Groups() {
    const { taskGroups, } = useSelector((state: any) => state.TaskReducer);
    const { selectedGroupChatCode } = useSelector((state: any) => state.UserCompanyReducer);
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
                        <GroupMessage selectedGroup={selectedGroupChatCode} />
                        <AddMessage AddGroup={selectedGroupChatCode} />
                    </Card>

                </div>
                <div className='col ml--3' style={{
                    height: infoHeight - 30
                }}>
                    <GroupEmployees groupCode={selectedGroupChatCode} />
                </div>
            </div>
                : <div className='d-flex h-100vh justify-content-center align-items-center'>
                    <NoDataFound text={translate('common.No Group Found')!} />
                </div>
            }

        </div >
    )
}
export { Groups }
