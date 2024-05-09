import React from "react";
import { Badge } from "@Components";
import { UserItemProps } from "./interface";
import { getPhoto, handleEmailClick } from "@Utils";
import { Image } from '@Components'

function UserItem({ item }: UserItemProps) {
  const { name, email, department, designation, profile_image } = item;



  return (
    <div className="container-fluid">
      <div className="row ml-sm-0 ml--4">
        <div className="col">
          <div className="row">
            <Image variant={'rounded'} src={getPhoto(profile_image)} />
            <div className="ml-3">
              <h4 className="text-uppercase mb-0"> {name} </h4>
              <div className="col">
                <div className="row align-items-center">
                  {department ? <span className="text-xs text-uppercase mb-0"> {department.name} </span> : '-'}
                  <div className="mx-1 font-weight-bolder">/</div>
                  {designation ? <span className="text-xs text-uppercase mb-0"> {designation.name} </span> : '-'}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="col-auto col-sm-0 align-items-center justify-content-center d-flex">
          <div className="row justify-content-end">
            <div className="col-lg-auto col-sm-0 col-6 mr-lg--4">
              <Badge
                pill
                color={"info"}
                text={"Call"}
                className="mr-2 pointer"
              />
            </div>
            <div className="ol-lg-auto col-sm-0 col-6">
              <Badge className={'pointer'} pill color={"success"} text={"Email"} onClick={() => { (handleEmailClick(email)) }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export { UserItem };
