import { Back, H, Image, MenuBar, Modal } from "@Components";
import React, { useState } from "react";
import { EventItemProps } from "./interface";
import {
    getPhoto, getDataAndTime, capitalizeFirstLetter, getDisplayTimeDateMonthYearTime,
    getMomentObjFromServer,
} from "@Utils";
import { translate } from "@I18n";
import { useModal } from "@Hooks";
import { Carousel } from "react-responsive-carousel";
import { icons } from "@Assets";
import { useSelector } from "react-redux";

function EventItem({ item }: EventItemProps) {

    const MY_FEED_MENU = [
        {
            id: 0, name: 'Edit', icon: icons.edit,
        },
        {
            id: 1, name: 'delete', icon: icons.delete,
        },

    ]

    const { title, attachments, place, start_time, end_time, description, event_by, created_at, applicable_branches, for_internal_company, for_external_company } = item;



    const handleCarouselClick = (e) => {
        e.preventDefault();
    };

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
                    
                    </div>


                    <div className="row mt-4">
                        <div className="col-lg-12 col-sm-0 col-12 mt--2 ml-2">
                            <div className={'text-sm font-weight-600 mt--2'}>{title}</div>
                            <div className={'text-xs font-weight-600 mb--2'}>{description}</div>
                        </div>
                    </div>

                    <div className="mt-1 ml-2">
                        <div className="h5 text-uppercase mt-3 mb--1 m-0"> Shared Across: </div>
                        <span> {''} </span>
                        {applicable_branches &&
                            applicable_branches.length > 0 &&
                            applicable_branches?.map((applicable_branches: any, index: number) => {
                                return (

                                    <span className=" h5 text-capitalize  text-xs text-muted "

                                    >
                                        {applicable_branches.register_name} {' '} {','} {''}
                                    </span>
                                );
                            })}
                    </div>


                    {/* <div className="row">
                        <div className="col-lg-12 col-sm-0 col-12 mt-3 mb--6">
                            <Carousel
                                dynamicHeight
                                onClickThumb={handleCarouselClick}
                                >
                                {attachments &&
                                    attachments.length > 0 &&
                                    attachments?.map((attachment_logo: any, index: number) => {
                                        return (
                                            <Image
                                                variant={"default"}
                                                src={getPhoto(attachment_logo.attachment_file)}
                                                height={'80%'}
                                                width={'80%'}
                                            />
                                        );
                                    })}
                            </Carousel>
                        </div>

                    </div>

                    <div className="row ml-2 mt-4">
                        <div className="text-xs"> {place} </div>
                    </div>

                    <div className="row ml-2 text-xs">
                        <span> {getDisplayTimeDateMonthYearTime(getMomentObjFromServer(start_time))}  {" "} {'-'} {" "} </span>
                        <span>  {" "} {' '} {" "} {getDisplayTimeDateMonthYearTime(getMomentObjFromServer(end_time))} </span>
                    </div> */}

                </div>
            </div>
        </>

    );
}

export { EventItem };

