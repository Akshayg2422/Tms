import React, { useState } from 'react';
import { TaskChatProps } from './interfaces';
import { useSelector } from 'react-redux'
import { getDataAndTime, getPhoto } from '@Utils';
import { H, Image, ImageFullScreen } from '@Components'
import { FullScreenHandle } from 'react-full-screen'

function Receive({ item }: any) {
    console.log('receive data-->------------->', item);
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
                                        <div
                                            className={'col-10 mx--3 alert fade bg-info show text-white'}
                                            role={'alert'}
                                        >
                                            {item?.attachments?.attachments?.map((attach) => {
                                                return (
                                                    <div
                                                        
                                                    >
                                                        <ImageFullScreen onChange={handleFullScreenChange}>
                                                            <Image src={getPhoto(attach.attachment_file)} style={{ height: "200px", width: "200px" }} />
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
                        <div className={'d-flex justify-content-center text-lightGray mb-1'}>
                            <div>{`@${taggedElements.name} tagged by ${item.by_user.name}`} </div>
                        </div>
                    )
                })
            }

            {
                item?.assigned_to?.name === undefined ? null :
                    <div className='d-flex justify-content-center text-lightGray mb-1'>{`@${item?.assigned_to?.name} tagged by ${item.by_user.name}`} </div>
            }

        </>
    )
}

function Send({ item }: any) {
    console.log('receive data-->------------->', item);
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
                        <div className={'d-flex float-right '}>
                <div className="ml-3" >
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    <div className="timeline-block ">
                      <span className="timeline-step badge-info ">
                        <i className="ni ni-bell-55 " />
                      </span>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-start pt-1">
                          <div className="pr-6">
                            <small className="text-muted">
                              <i className="fas fa-clock mr-1" />10 hrs ago
                            </small>
                          </div>
                          <div>
                            <span className="text-muted text-sm font-weight-bold"> New message</span>
                          </div>
                        </div>
                        <h6 className="text-sm mt-1 mb-0">
                          Let's meet at Starbucks at 11:30. Why?
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                        {/* <div
                            className={'col-6 alert fade show text-white'}
                            role={'alert'}
                            style={{ backgroundColor: '#AACACA' }}
                        >
                            <div className={'row mb--3'}>
                                <H className={'col-6 pb-3 text-black'}
                                    text={item.by_user.name} tag={'h4'}
                                />
                                <H className={'col-6 text-xs text-capitalize text-black'}
                                    text={getDataAndTime(item.created_at)} tag={'h4'}
                                />
                            </div>
                            {item.message}
                            <div>
                                {item?.attachments?.attachments?.map((attach) => {
                                    return (
                                        <div
                                            className={'alert fade show text-white d-flex justify-content-center'}
                                            role={'alert'}
                                        >
                                            <ImageFullScreen onChange={handleFullScreenChange}>
                                                <Image src={getPhoto(attach?.attachment_file)} style={{ height: "200px", width: "200px" }} />
                                            </ImageFullScreen>
                                        </div>
                                    )
                                })}
                            </div>
                        </div> */}
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
                    <div className='d-flex justify-content-center text-lightGray mb-1'>{`@${item?.assigned_to?.name} tagged by ${item.by_user.name}`} </div>
            }

        </>
    )
}

function TaskChat({ item }: TaskChatProps) {

    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
    console.log('dashboardDetails', JSON.stringify(dashboardDetails));


    function getChatComponents() {

        const isUser = item.by_user?.id === dashboardDetails.user_details?.id;

        return <>{isUser ? <Receive item={item} /> : <Send item={item} />}</>;
    }
    return <div>{getChatComponents()}</div>;
}

export { TaskChat }

