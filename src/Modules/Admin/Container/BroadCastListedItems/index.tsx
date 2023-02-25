import { H, Card, Image } from "@Components";
import React from "react";
import { BroadCastItemsProps } from "./interfaces";
import { getPhoto } from "@Utils";
import moment from "moment";

function BroadCastListedItems({ item }: BroadCastItemsProps) {
  const { title, attachments, description, created_by, created_at, company } =
    item;

  console.log(company[0].register_name);
  return (
    <div className="row d-flex justify-content-center pt-2 ">
      <div className="col-lg-12">
        <div className="row mx-sm-0 mx--5">
          <div className="col pl-sm-0 pl-4 pl-lg-3">
            <H
              tag={"h4"}
              className="text-capitalize font-weight-900 "
              text={title}
            />
          </div>
          <div className="col-auto text-xs text-capitalize">
            {moment(created_at).format("DD-MM-YYYY")}
          </div>
        </div>

        <div className=" pl-lg-3   text-xs pb-2 font-weight-600 mx-sm-0 mx--4">
          {description}
        </div>

        <div className="row mx-sm-0 mx--5">
          <div className="col-lg-10 col-sm-0 col-8 ">
            {company &&
              company.length > 0 &&
              company?.map((company: any, index: number) => {
                return (
                  <H
                    tag={"h3"}
                    className="text-capitalize font-weight-900 ls-15 mb--1 pl-sm-0 pl-2 "
                    text={company.register_name}
                  />
                );
              })}
          </div>

          <div className="col-auto pt-2 pl-sm-0 pl-4 pl-lg-1">
            <div className="text-xs font-weight-600">created by</div>
            <H
              tag={"h5"}
              className="text-capitalize font-weight-900 mt--1 "
              text={created_by.name}
            />
          </div>
        </div>
        <div className="row  pl-lg-3 ml-sm-0 ml--4 ">
          {attachments &&
            attachments.length > 0 &&
            attachments?.map((attachment_logo: any, index: number) => {
              return (
                <Image
                  variant={"default"}
                  src={getPhoto(attachment_logo.attachment_file)}
                  width={"100px"}
                  height={"100px"}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export { BroadCastListedItems };
