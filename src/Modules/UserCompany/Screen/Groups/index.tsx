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
        <div className='m-3 v-100vh  '>
            <div className='mx-3 mt-3 mb-0' >
                <ChatGroups />
            </div>

            {selectedGroupChat ? <div className='row mt--3'>
                <div className='col-8' ref={ref}>
                    <Card>
                        <GroupMessage />
                        <div className='mb-3'></div>
                        <AddGroupChat />
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
