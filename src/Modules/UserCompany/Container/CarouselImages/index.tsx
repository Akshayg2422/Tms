import { Image } from "@Components";
import React, { useState, useEffect, useRef } from "react";
import { CarouselImagesProps } from './interfaces';
import { getPhoto, getDisplayTimeDateMonthYearTime, getMomentObjFromServer } from "@Utils";
import { Carousel } from "react-responsive-carousel";

function CarouselImages({ item }: CarouselImagesProps) {


    const { attachments, place, start_time, end_time, } =
        item;



    return (
        <>
            <div className="row mx--5">
                <div className="col">
                    <div className="row" >
                        <div className="col-lg-12 col-sm-0 col-12 mt-3 mb--6">
                            <Carousel
                                dynamicHeight
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
                    </div>
                </div>

            </div>


        </>

    );
}

export { CarouselImages };

