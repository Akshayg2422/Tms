import { Back, H, Image, MenuBar, Modal } from "@Components";
import React, { useState } from "react";
import { EventItemProps } from "./interface";
import { getPhoto, getDataAndTime, capitalizeFirstLetter, } from "@Utils";
import { translate } from "@I18n";
import { useModal } from "@Hooks";
import { Carousel } from "react-responsive-carousel";
import { icons } from "@Assets";

function EventItem({ item }: EventItemProps) {

    const MY_FEED_MENU = [
        {
            id: 0, name: 'Edit', icon: icons.tagUser,
        },
        {
            id: 1, name: 'delete', icon: icons.reassignUser,
        },

    ]

    console.log("item", JSON.stringify(item))
    const { title, attachments, description, event_by, created_at, applicable_branches, for_internal_company, for_external_company } =
        item;

    const imageModal = useModal(false)
    const [image, setImage] = useState([])

    return (
        <>
            <div className="row mx--5 ">
                <div className="col">
                    <div className='row d-flex justify-content-between m-0 mt--2 ml-2'>
                        <div className="col-lg-6">
                            <div className={'row'}>
                                <div className={'align-self-center'}>{<Image variant={'avatar'} src={getPhoto(event_by?.profile_image)} />}</div>
                                <div className='ml-1 '>
                                    <H
                                        className="py-1 m-0 pointer mb-0"
                                        tag={'h4'}
                                        text={capitalizeFirstLetter(event_by?.name)}
                                    />
                                    <div className={'d-flex align-items-center  mt--3'}>
                                        <div className={'mb-0 text-xs text-muted '} >{event_by ? event_by.department : '-'}</div>
                                        <div className='p-1 text-muted'>{'/'}</div>
                                        <div className={'mb-0 text-xs text-muted'}>{event_by ? event_by.designation : '-'}</div>
                                    </div>
                                    <div className=" mb-0 text-muted text-xs mt--2">{getDataAndTime(created_at)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row d-flex justify-content-end mt-3">
                                <MenuBar menuData={MY_FEED_MENU}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="row mt-4">
                        <div className="col-lg-12 col-sm-0 col-12 mt--2 ml-2">
                            <div className={'text-xs font-weight-600 mt--2'}>{title}</div>
                            <div className={'text-xs font-weight-600 mb--2'}>{description}</div>
                        </div>
                    </div>

                    <div className="mt-1 ml-2">
                        <span className="h4 text-capitalize"> Shared Across: {''} </span>
                        {applicable_branches &&
                            applicable_branches.length > 0 &&
                            applicable_branches?.map((applicable_branches: any, index: number) => {
                                return (

                                    <span className=" h5 text-capitalize font-weight-900 "


                                    >
                                        {applicable_branches.register_name} {' '} {','} {''}
                                    </span>

                                );
                            })}
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-sm-0 col-12 mt-3 mb--6">
                            <Carousel>
                                {attachments &&
                                    attachments.length > 0 &&
                                    attachments?.map((attachment_logo: any, index: number) => {
                                        return (
                                            <Image
                                                variant={"default"}
                                                src={getPhoto(attachment_logo.attachment_file)}
                                                height={'100%'}
                                                width={'100%'}
                                            />
                                        );
                                    })}
                            </Carousel>
                        </div>

                    </div>

                </div>
            </div>
        </>

    );
}

export { EventItem };

