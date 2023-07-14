import { Back, H, Image, MenuBar, Modal } from "@Components";
import React, { useState } from "react";
import { MyfeedItemsProps } from "./interface";
import { getPhoto, getDataAndTime, capitalizeFirstLetter, } from "@Utils";
import { translate } from "@I18n";
import { useModal } from "@Hooks";
import { icons } from "@Assets";
import { Carousel } from "react-responsive-carousel";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function MyFeedItem({ item }: MyfeedItemsProps) {

    const MY_FEED_MENU = [
        {
            id: 0, name: 'Edit', icon: icons.tagUser,
        },
        {
            id: 1, name: 'delete', icon: icons.reassignUser,
        },

    ]

    const { title, attachments, description, created_by, created_at, applicable_branches } = item;



    return (
        <>
            <div className="row ">
                <div className=" mx--2">
                    <div className='row d-flex justify-content-between m-0 mt--2 '>
                        <div className="col-lg-6 ">
                            <div className={'row'}>
                                <div className={'align-self-center'}>{<Image variant={'avatar'} src={getPhoto(created_by?.profile_image)} />}</div>
                                <div className='ml-2'>
                                    <H
                                        className="py-1 m-0 pointer mb-0"
                                        tag={'h4'}
                                        text={capitalizeFirstLetter(created_by?.name)}
                                    />
                                    <div className={'d-flex align-items-center  mt--3'}>
                                        <div className={'mb-0 text-xs text-muted '} >{created_by ? created_by.department : '-'}</div>
                                        <div className='p-1 text-muted'>{'/'}</div>
                                        <div className={'mb-0 text-xs text-muted'}>{created_by ? created_by.designation : '-'}</div>
                                    </div>
                                    <div className=" mb-0 text-muted text-xs mt--2">{getDataAndTime(created_at)}</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row mt-4">
                        <div className="col-lg-12 col-sm-0 col-12 mt--2 ">
                            <div className={'text-xs font-weight-600 mt--2'}>{title}</div>
                            <div className={'text-xs font-weight-600 mb--2'}>{description}</div>
                        </div>
                    </div>

                    <div className="mt-1 ">
                        <div className="h5 text-uppercase mt-3 mb--1 m-0"> Shared Across: </div>
                        <span> {''} </span>
                        {applicable_branches &&
                            applicable_branches.length > 0 &&
                            applicable_branches?.map((applicable_branches: any, index: number) => {
                                return (

                                    <span className=" text-xs font-weight-600">
                                        {applicable_branches.register_name} {' '} {','} {''}
                                    </span>

                                );
                            })}
                    </div>

                    <div className="row">
                        <div className="">
                            <Carousel
                                dynamicHeight
                            >
                                {attachments &&
                                    attachments.length > 0 &&
                                    attachments?.map((attachment_logo: any, index: number) => {

                                        return (
                                            <div className={'container'}>
                                                <div className="row pointer">
                                                 
                                                    <Image className={'p-1'} src={getPhoto(attachment_logo?.attachment_file)} alt={'Task Attachments'} width={'100%'} height={'100%'} />
                                                 
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </Carousel>
                        </div>

                    </div>

                </div>
            </div>
        </>

    );
}

export { MyFeedItem };

