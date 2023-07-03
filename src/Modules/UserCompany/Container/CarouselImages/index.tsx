import { Image} from "@Components";
import React, { useState } from "react";
import { CarouselImagesProps } from './interfaces';
import { getPhoto, getDisplayTimeDateMonthYearTime,getMomentObjFromServer} from "@Utils";
import { Carousel } from "react-responsive-carousel";

function CarouselImages({ item }: CarouselImagesProps) {


    const { attachments,place,start_time,end_time,} =
        item;


    return (
        <>

                    <div className="">
                        <div className="">
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
                     <div className="">
                    <div className="row ml--4 ">
                        <div className="text-xs"> {place} </div>
                    </div>

                    <div className="row ml--4 text-xs">
                        <span> {getDisplayTimeDateMonthYearTime(getMomentObjFromServer(start_time))}  {" "} {'-'} {" "} </span>
                        <span>  {" "} {' '} {" "} {getDisplayTimeDateMonthYearTime(getMomentObjFromServer(end_time))} </span>
                    </div>
                    </div> 
                  
        </>

    );
}

export { CarouselImages };

