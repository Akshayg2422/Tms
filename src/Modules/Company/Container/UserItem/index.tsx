import React from "react";
import { Badge, Card } from "@Components";
import { UserItemProps } from "./interface";
import { handleEmailClick } from "@Utils";

function UserItem({ item }: UserItemProps) {
  const { name, mobile_number, email } = item;

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-lg-12 col-md-12 col-sm-7 ">
          <div className="row ">
            <div className="col-sm-0 col-6  col-lg-6">
              <h4 className="text-uppercase"> {name} </h4>
            </div>
            <div className="col-sm-0 col-6  col-lg-6">
              <div className="row justify-content-end">
                <div>
                  <Badge
                    pill
                    color={"primary"}
                    text={"Call"}
                    className="mr-2"
                  />
                </div>
                <div>
  
                  <Badge pill color={"success"} text={"Email"} onClick={() => {(handleEmailClick(email))}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { UserItem };
