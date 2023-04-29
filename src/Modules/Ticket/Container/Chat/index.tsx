import React, { useState } from 'react';
import { ChatProps } from './interfaces';
import { useSelector } from 'react-redux'
import { getDataAndTime, getPhoto } from '@Utils';
import { H, Image } from '@Components'

function Receive({ item }: any) {
    const [isFullScreen, setIsFullScreen] = useState(false);



    return (

        <>
            {
                ((item && item?.message) || (item?.attachments?.attachments)) && (
                    <div className={'d-flex justify-content-end'}>
                        <div
                            className={'col-5 alert fade show text-white'}
                            role={'alert'}
                            style={{ backgroundColor: '#6E81A8' }}
                        >
                            <div className={'row mb--3'}>
                                <H className={'col-6 pb-3 text-black'}
                                    text={item.by_user.name} tag={'h4'}
                                />
                                <H className={'col-6 text-xs text-capitalize text-black'}
                                    text={getDataAndTime(item.created_at)} tag={'h4'}
                                />
                            </div>
                            {item?.message}
                            <div>
                                {item?.attachments?.attachments?.map((attach) => {
                                    return (
                                        <div
                                            className={'alert fade show text-white d-flex justify-content-center'}
                                            role={'alert'}
                                        >
                                            {/* <ImageFullScreen onChange={handleFullScreenChange}>
                                                <Image src={getPhoto(attach.attachment_file)} style={{ height: "200px", width: "200px" }} />
                                            </ImageFullScreen> */}
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
                        <div className={'d-flex justify-content-center text-lightGray mb-1'}>
                            <div>{`@${taggedElements.name} tagged by ${item.by_user.name}`} </div>
                        </div>
                    )
                })
            }

            {
                item?.assigned_to?.name === undefined ? null :
                    <div className='d-flex justify-content-center text-lightGray mb-1'>{`@${item?.assigned_to} tagged by ${item.by_user.name}`} </div>
            }

        </>
    )
}

function Sent({ item }: any) {
    const [isFullScreen, setIsFullScreen] = useState(false);



    return (
        <>
            {
                ((item && item?.message) || (item?.attachments?.attachments)) && (
                    <div className={'d-flex justify-content-start'}>
                        <div
                            className={'col-6 alert fade show text-white'}
                            role={'alert'}
                            style={{ backgroundColor: '#AACACA' }}
                        >
                            <div className={'row mb--3'}>
                                <H className={'col-6 pb-3 text-black'}
                                    text={item?.by_user?.name} tag={'h4'}
                                />
                                <H className={'col-6 text-xs text-capitalize text-black'}
                                    text={getDataAndTime(item?.created_at)} tag={'h4'}
                                />
                            </div>
                            {item?.message}
                            <div>
                                {item?.attachments?.attachments?.map((attach) => {
                                    return (
                                        <div
                                            className={'alert fade show text-white d-flex justify-content-center'}
                                            role={'alert'}
                                        >
                                            {/* <ImageFullScreen onChange={handleFullScreenChange}>
                                                <Image src={getPhoto(attach.attachment_file)} style={{ height: "200px", width: "200px" }} />
                                            </ImageFullScreen> */}
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
                        <div className={'d-flex justify-content-center text-lightGray mb-1'}>
                            <div>{`@${taggedElements.name} tagged by ${item?.by_user?.name}`} </div>
                        </div>
                    )
                })
            }

            {
                item?.assigned_to?.name === undefined ? null :
                    <div className='d-flex justify-content-center text-lightGray mb-1'>{`@${item?.assigned_to} tagged by ${item?.by_user?.name}`} </div>
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
