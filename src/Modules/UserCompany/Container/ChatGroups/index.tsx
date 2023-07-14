import { Image, Spinner } from '@Components'
import { getChatGroups, setSelectedGroupChat } from '@Redux'
import { getPhoto, stringToUpperCase } from '@Utils'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatGroupsProps } from './interfaces'
import { useLoader } from '@Hooks'

function ChatGroups({ }: ChatGroupsProps) {

    const { selectedGroupChat, chatGroups } = useSelector((state: any) => state.UserCompanyReducer);
    const dispatch = useDispatch()

    const loader = useLoader(false)

    useEffect(() => {
        getChatGroupsApiHandler();
    }, [])

    function getChatGroupsApiHandler() {
        const params = {
            per_page_count: -1
        }

        loader.show()

        dispatch(
            getChatGroups({
                params,
                onSuccess: (res: any) => () => {
                    loader.hide()
                    const groups = res.details;
                    if (!selectedGroupChat && groups && groups.length > 0) {
                        dispatch(setSelectedGroupChat(groups[0]));
                    }
                },
                onError: () => () => {
                    loader.hide();
                },
            }
            )
        )
    }



    return (
        <div
            className='row overflow-auto  overflow-hide'>

            <div className='d-flex'>
                {chatGroups && chatGroups.length > 0 &&
                    chatGroups.map((el: any, index: number) => {

                        const { id, code, photo, name } = el;
                        const isSelected = id === selectedGroupChat?.id;
                        const bgColor = isSelected ? "bg-primary" : "bg-white"
                        const textColor = isSelected ? "text-white" : ""

                        return (
                            <div
                                className={`card ${bgColor} ${index !== 0 && "ml-2"} pointer d-flex justify-content-center align-items-center`}
                                key={id}
                                onClick={() => {
                                    dispatch(setSelectedGroupChat(el))
                                }}
                                style={{
                                    width: 120,
                                    height: 40,
                                }}
                            >
                                <div className='row align-items-center'>
                                    {el.photo && <Image variant={'rounded'} src={getPhoto(photo)} size={'xs'} />}
                                    <div className={`flex-wrap ml-1 ${textColor}`}>
                                        <div className='text-xxs'>{name} </div>
                                        <div className='text-xs'>{stringToUpperCase('#' + code)}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            {loader.loader && <Spinner />}
        </div >
    )
}

export { ChatGroups }
