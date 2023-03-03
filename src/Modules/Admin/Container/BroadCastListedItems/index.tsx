import { H, Image } from "@Components";
import React from "react";
import { BroadCastItemsProps } from "./interfaces";
import { getPhoto,getDataAndTime } from "@Utils";
import { translate } from "@I18n";

function BroadCastListedItems({ item }: BroadCastItemsProps) {
  const { title, attachments, description, created_by, created_at, applicable_branches } =
    item;


  return (
    <div className="row d-flex justify-content-center ">
      <div className="col-lg-12">
        <div className="row ">
          <div className="col ">
            <H
              tag={"h4"}
              className="text-capitalize font-weight-900 "
              text={title}
            />
          </div>
          <div className="col-auto text-xs text-capitalize">
            {getDataAndTime(created_at)}
           
          </div>
        </div>

        <div className="   text-xs pb-2 font-weight-600 ">{description}</div>

        <div className="row ">
          <div className="col ">
            {applicable_branches &&
              applicable_branches.length > 0 &&
              applicable_branches?.map((applicable_branches: any, index: number) => {
                return (
                  <H
                    tag={"h5"}
                    className="text-capitalize font-weight-900  mb--1 "
                    text={applicable_branches.register_name}
                  />
                );
              })}
               <div className="row col-auto pt-2 mt-1">
          {attachments &&
            attachments.length > 0 &&
            attachments?.map((attachment_logo: any, index: number) => {
              return (
                <Image
                className="mr-2"
                  variant={"default"}
                  src={getPhoto(attachment_logo.attachment_file)}
                  width={"90px"}
                  height={"90px"}
                />
              );
            })}
        </div>
          </div>

          <div className="col-auto pt-2 ">
            <div className="text-xs font-weight-600"> {translate('common.createdBy')} </div>
            <H
              tag={"h5"}
              className="text-capitalize font-weight-900 mt--1 "
              text={created_by.name}
            />
          </div>
        </div>
      
      </div>
    </div>
  );
}

export { BroadCastListedItems };
