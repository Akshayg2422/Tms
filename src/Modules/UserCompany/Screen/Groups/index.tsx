import { Card, NoDataFound } from '@Components'
import { translate } from '@I18n'
import { AddGroupChat, ChatGroups, GroupEmployees, GroupMessage } from '@Modules'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'


function Groups() {

    const { selectedGroupChat } = useSelector((state: any) => state.UserCompanyReducer);
    const ref = useRef<HTMLDivElement>(null)
    const [infoHeight, setInfoHeight] = useState(0)

    useEffect(() => {
        if (ref.current) {
            setInfoHeight(ref.current.clientHeight)
        }
    })


    return (
<<<<<<< HEAD
        <div className='m-3 v-100vh  '>
            <div className='mx-3 mt-3 mb-0' >
                <ChatGroups />
            </div>
=======
        <div className='m-3  '>
            <div className='mx-3 mt-3 mb--3 ' >
                <TaskChatGroup onClick={(code) => { dispatch(setSelectedGroupChatCode(code)) }} showAll={false} />
            </div>

            {loading && (
          <div className="d-flex align-items-center justify-content-center pointer" style={{ minHeight: '200px' }}>
            <Spinner />
          </div>
        )}
>>>>>>> ed20cf4bb287e6ce0eb53e652789561f65844f2b

            {selectedGroupChat ? <div className='row mt--3'>
                <div className='col-8' ref={ref}>
                    <Card>
<<<<<<< HEAD
                        <GroupMessage />
                        <div className='mb-3'></div>
                        <AddGroupChat />
=======

                        <GroupMessage selectedGroup={selectedGroupChatCode ? selectedGroupChatCode : chatGroups && chatGroups[0]?.id} />
                        <AddMessage AddGroup={selectedGroupChatCode ? selectedGroupChatCode : chatGroups && chatGroups[0]?.id} />
                   

>>>>>>> ed20cf4bb287e6ce0eb53e652789561f65844f2b
                    </Card>

                </div>
                <div className='col ml--3' style={{
                    height: infoHeight - 30
                }}>
                    <GroupEmployees />
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
