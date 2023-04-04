import React, { useState } from 'react';
import { TaskChatProps } from './interfaces';
import { useSelector } from 'react-redux'
import { getDataAndTime, getPhoto } from '@Utils';
import { Card, H, Image, ImageFullScreen } from '@Components'
import { FullScreenHandle } from 'react-full-screen'

function Receive({ item }: any) {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreenChange = (state: boolean, handle: FullScreenHandle) => {
        setIsFullScreen(state);
        if (!state) {
            handle.exit();
        }
    };


    return (

        <>
            {
                ((item && item?.message) || (item?.attachments?.attachments)) && (
                    <div className={'d-flex justify-content-end'}>
                        <div className="ml-3" >
                            <div
                                className="timeline timeline-one-side"
                                data-timeline-axis-style="dashed"
                                data-timeline-content="axis"
                            >
                                <div className="timeline-block">
                                    <span className="timeline-step badge-info">
                                        <i className="ni ni-bell-55" />
                                    </span>
                                    <div className="timeline-content">
                                        <div className="d-flex justify-content-start pt-1">
                                            <div>
                                                <span className="text-muted text-sm font-weight-bold">{item.by_user.name}</span>
                                            </div>
                                            <div className="pl-6">
                                                <small className="text-muted text-xs text-capitalize">
                                                    <i className="fas fa-clock mr-1" />{getDataAndTime(item.created_at)}
                                                </small>
                                            </div>
                                        </div>
                                        <h6 className="text-sm mt-1 mb-0">
                                            {item.message}
                                        </h6>
                                        <div>
                                            {item?.attachments?.attachments?.map((attach) => {
                                                return (
                                                    <div
                                                    >
                                                        <ImageFullScreen onChange={handleFullScreenChange}>
                                                            <Image className={'rounded m-1'} src={getPhoto(attach.attachment_file)} style={{ height: "200px", width: "200px" }} />
                                                        </ImageFullScreen>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }

            {
                item.tagged_users?.length > 0 && item.tagged_users.map((taggedElements) => {

                    return (
                        <div className={'d-flex justify-content-end text-lightGray mb-1'}>
                            <div>{`@${taggedElements.name} tagged by ${item.by_user.name}`} </div>
                        </div>
                    )
                })
            }

            {
                item?.assigned_to?.name === undefined ? null :
                    <div className='d-flex justify-content-end text-lightGray mb-1'>{`@${item?.assigned_to?.name} tagged by ${item.by_user.name}`} </div>
            }

        </>
    )
}

function Send({ item }: any) {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreenChange = (state: boolean, handle: FullScreenHandle) => {
        setIsFullScreen(state);
        if (!state) {
            handle.exit();
        }
    };

    return (
        <>
            {
                ((item && item?.message) || (item?.attachments?.attachments)) && (
                    <div className={'d-flex justify-content-start'}>
                        <div className="ml-3" >
                            <div
                                className="timeline timeline-one-side"
                                data-timeline-axis-style="dashed"
                                data-timeline-content="axis"
                            >
                                <div className="timeline-block">
                                    <span className="timeline-step badge-info">
                                        <i className="ni ni-bell-55" />
                                    </span>
                                    <div className="timeline-content">
                                        <div className="d-flex justify-content-start pt-1">
                                            <div>
                                                <span className="text-muted text-sm font-weight-bold">{item.by_user.name}</span>
                                            </div>
                                            <div className="pl-6">
                                                <small className="text-muted text-xs text-capitalize">
                                                    <i className="fas fa-clock mr-1" />{getDataAndTime(item.created_at)}
                                                </small>
                                            </div>
                                        </div>
                                        <h6 className="text-sm mt-1 mb-0">
                                            {item.message}
                                        </h6>
                                        <div>
                                            {item?.attachments?.attachments?.map((attach) => {
                                                return (
                                                    <div
                                                    >
                                                        <ImageFullScreen onChange={handleFullScreenChange}>
                                                            <Image src={getPhoto(attach.attachment_file)} style={{ backgroundColor: 'white', height: "200px", width: "200px" }} />
                                                        </ImageFullScreen>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }

            {
                item.tagged_users?.length > 0 && item.tagged_users.map((taggedElements) => {

                    return (
                        <div className={'d-flex justify-content-start text-lightGray mb-1'}>
                            <div>{`@${taggedElements.name} tagged by ${item.by_user.name}`} </div>
                        </div>
                    )
                })
            }

            {
                item?.assigned_to?.name === undefined ? null :
                    <div className='d-flex justify-content-start text-lightGray mb-1'>{`@${item?.assigned_to?.name} tagged by ${item.by_user.name}`} </div>
            }

        </>

    )
}

function TaskChat({ item }: TaskChatProps) {

    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);

    function getChatComponents() {

        const isUser = item.by_user?.id === dashboardDetails.user_details?.id;

        return <>{isUser ? <Receive item={item} /> : <Send item={item} />}</>;
    }
    return <div>{getChatComponents()}</div>;
}

export { TaskChat }

