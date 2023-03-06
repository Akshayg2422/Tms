import { ChatProps } from './interfaces';
import { useSelector } from 'react-redux'
import { getDataAndTime, getPhoto } from '@Utils';
import { Image } from '@Components'


function Receive({ item }: any) {


    return (
        <>
            {
                ((item && item?.message) || (item?.attachments?.attachments)) && (
                    <div className={'d-flex justify-content-end'}>
                        <div
                            className={'col-4 alert fade show text-white'}
                            role={'alert'}
                            style={{ backgroundColor: '#fcc9e0' }}
                        >
                            <div className={'row'}>
                                <div className={'col-6 pb-3'}>{item.by_user.name}</div>
                                <div className={'col-6 text-xs text-capitalize'}>
                                    {getDataAndTime(item.created_at)}
                                </div>
                            </div>
                            {item.message}
                            <div>
                                {item?.attachments?.attachments.map((attach) => {
                                    return (
                                        <div
                                            className={'alert fade show text-white d-flex justify-content-center bg-white'}
                                            role={'alert'}

                                        >
                                            <Image src={getPhoto(attach.attachment_file)} style={{ backgroundColor: '#fcc9e0', height: "200px", width: "200px" }} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }

            {
                item.tagged_users?.length > 0 && item.tagged_users.map((taggedElements) => {

                    return (
                        <div className={'d-flex justify-content-center text-muted'}>
                            <div>{`@${taggedElements.name} tagged by ${item.by_user.name}`} </div>
                        </div>
                    )
                })
            }

            {
                item?.assigned_to?.name === undefined ? null :
                    <div className='d-flex justify-content-center text-muted'>{`@${item?.assigned_to?.name} tagged by ${item.by_user.name}`} </div>
            }

        </>
    )
}

function Sent({ item }: any) {

    return (
        <>
            {
                ((item && item?.message) || (item?.attachments?.attachments)) && (
                    <div className={'d-flex justify-content-end'}>
                        <div
                            className={'col-4 alert fade show text-white'}
                            role={'alert'}
                            style={{ backgroundColor: '#fcc9e0' }}
                        >
                            <div className={'row'}>
                                <div className={'col-6 pb-3'}>{item.by_user.name}</div>
                                <div className={'col-6 text-xs text-capitalize'}>
                                    {getDataAndTime(item.created_at)}
                                </div>
                            </div>
                            {item.message}
                            <div>
                                {item?.attachments?.attachments.map((attach) => {
                                    return (
                                        <div
                                            className={'alert fade show text-white d-flex justify-content-center bg-white'}
                                            role={'alert'}

                                        >
                                            <Image src={getPhoto(attach.attachment_file)} style={{ backgroundColor: '#fcc9e0', height: "200px", width: "200px" }} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }

            {
                item.tagged_users?.length > 0 && item.tagged_users.map((taggedElements) => {

                    return (
                        <div className={'d-flex justify-content-center text-muted'}>
                            <div>{`@${taggedElements.name} tagged by ${item.by_user.name}`} </div>
                        </div>
                    )
                })
            }

            {
                item?.assigned_to?.name === undefined ? null :
                    <div className='d-flex justify-content-center text-muted'>{`@${item?.assigned_to?.name} tagged by ${item.by_user.name}`} </div>
            }

        </>
    )
}

function Chat({ item }: ChatProps) {

    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);

    function getChatComponents() {

        const isUser = item.by_user?.id === dashboardDetails.user_details?.id;

        return <>{isUser ? <Receive item={item} /> : <Sent item={item} />}</>;
    }
    return <div>{getChatComponents()}</div>;
}

export { Chat }

