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
                  pill
                  color={"info"}
                  text={"Call"}
                  className="mr-2 pointer"
                />
              </div>
              <div className=" col-lg-auto col-sm-0 col-6 ">

                <Badge className={'pointer'} pill color={"success"} text={"Email"} onClick={() => { (handleEmailClick(email)) }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { UserItem };
