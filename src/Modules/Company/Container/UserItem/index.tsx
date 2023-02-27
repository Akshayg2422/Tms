import React from "react";
import { Badge, Card } from "@Components";
import { UserItemProps } from "./interface";
import { handleEmailClick } from "@Utils";

function UserItem({ item }: UserItemProps) {
  const { name, mobile_number, email } = item;

  return (
    <>
      <div className="container-fluid row d-flex justify-content-between align-items-center">
        <div className="col-sm-6">
          <h4 className="text-uppercase mb-0"> {name} </h4>
        </div>
        <div className="col-sm-6">
          <div className="row justify-content-end">
            <div>
              <Badge
                style={{ cursor: 'pointer' }}
                pill
                color={"info"}
                text={"Call"}
                className="mr-2"
              />
            </div>
            <div>

              <Badge pill color={"success"} text={"Email"} style={{ cursor: 'pointer' }} onClick={() => { (handleEmailClick(email)) }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { UserItem };
