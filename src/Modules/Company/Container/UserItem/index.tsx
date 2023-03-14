import React from "react";
import { Badge } from "@Components";
import { UserItemProps } from "./interface";
import { handleEmailClick } from "@Utils";

function UserItem({ item }: UserItemProps) {
  const { name, email } = item;

  return (
    <>
      <div className="container-fluid ">
        <div className="row ml-sm-0 ml--4">

       
        <div className=" col-lg-6 col-sm-0 col-7 ">
          <h4 className="text-uppercase mb-0"> {name} </h4>
        </div>
        <div className="col-lg-6 col-sm-0 col-5 ">
          <div className="row justify-content-end ">
            <div className="col-lg-auto col-sm-0 col-6 mr-lg--4">
              <Badge
                style={{ cursor: 'pointer' }}
                pill
                color={"info"}
                text={"Call"}
                className="mr-2"
              />
            </div>
            <div className=" col-lg-auto col-sm-0 col-6 ">

              <Badge pill color={"success"} text={"Email"} style={{ cursor: 'pointer' }} onClick={() => { (handleEmailClick(email)) }} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export { UserItem };
