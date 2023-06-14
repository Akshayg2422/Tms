import { useEffect, useRef, useState } from 'react'
import { GroupMessage, AddMessage, GroupEmployees, TaskChatGroup } from '@Modules'
import { Card, NoDataFound, Image } from '@Components'
import { useSelector, useDispatch } from 'react-redux'
import { getTokenByUser, selectedVcDetails, setSelectedGroupChatCode, } from '@Redux'
import { translate } from '@I18n'
import { CardHeader } from 'reactstrap'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { icons } from '@Assets'

function Groups() {

    const { selectedGroupChatCode, chatGroups, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch, user_details, company } = dashboardDetails || ''
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement>(null)
    const [infoHeight, setInfoHeight] = useState(0)
    const { goTo } = useNavigation()
    console.log(selectedGroupChatCode, "selectedGroupChatCode")



    const getUserToken = () => {
        dispatch(selectedVcDetails(selectedGroupChatCode))
        const params = {
            room_id: selectedGroupChatCode,
            user_name: user_details.name,
            email_id: user_details.email,
        }
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {

                console.log("success============>", success)
            },
            onError: (error: string) => () => {

            },

        }))
    }


    useEffect(() => {
        if (ref.current) {
            setInfoHeight(ref.current.clientHeight)
        }
    })

    return (
        <div className='m-3 v-100vh  '>
            <div className='mx-3 mt-3 mb-0 ' >
                <TaskChatGroup onClick={(code) => { dispatch(setSelectedGroupChatCode(code)) }} showAll={false} />

            </div>

            {chatGroups && chatGroups.length > 0 ? <div className='row'>
                <div className='col-8' ref={ref}>
                    <Card>
                        <CardHeader className='my--4 mx--4'>
                            <div className='text-right pointer'
                                onClick={() => {
                                    getUserToken()
                                    goTo(ROUTES['user-company-module']['video-conference'], false)
                                }}
                            >
                                <Image className={'mr-5'} src={icons.videoCall} width={20} height={20} />
                            </div>
                        </CardHeader>
                        <GroupMessage selectedGroup={selectedGroupChatCode ? selectedGroupChatCode : chatGroups && chatGroups[0]?.id} />
                        <AddMessage AddGroup={selectedGroupChatCode ? selectedGroupChatCode : chatGroups && chatGroups[0]?.id} />
                        {/* <ComponentLoader loading={true} children={undefined}/> */}

                    </Card>

                </div>
                <div className='col ml--3' style={{
                    height: infoHeight - 30
                }}>
                    <GroupEmployees groupCode={selectedGroupChatCode ? selectedGroupChatCode : chatGroups && chatGroups[0]?.id} />
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
