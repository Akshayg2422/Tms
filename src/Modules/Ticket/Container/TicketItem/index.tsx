import React, { useEffect, useState } from "react";
import { TicketItemProps } from "./interfaces";
import { H, Image, Badge, Divider } from "@Components";
import { useDispatch } from "react-redux";
// import { setSelectedTicket, setSelectedReferenceTickets } from "@Redux";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { getPhoto } from "@Utils";
import { getStatusFromCode, handleEmailClick, getDataAndTime } from "@Utils";
import { useSelector } from "react-redux";
import { translate } from "@I18n";

function TicketItem({ item, divider }: TicketItemProps) {
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
  const {
    title,
    by_user,
    raised_by_company,
    ticket_status,
    created_at,
    assigned_to,
    priority,
  } = item;

  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const [showPriorityColor, setShowPriorityColor] = useState("");
  const [showPriority, setShowPriority] = useState("");

  const { selectedReferenceTickets } = useSelector(
    (state: any) => state.AdminReducer
  );

  useEffect(() => {
    switch (priority) {
      case 1:
        setShowPriorityColor("gray");
        setShowPriority("Low");
        break;
      case 2:
        setShowPriorityColor("black");
        setShowPriority("Lowest");
        break;
      case 3:
        setShowPriorityColor("yellow");
        setShowPriority("Medium");
        break;
      case 4:
        setShowPriorityColor("orange");
        setShowPriority("High");
        break;
      case 5:
        setShowPriorityColor("red");
        setShowPriority("Urgent");
        break;
      default:
        setShowPriorityColor("");
    }
  }, []);

  useEffect(() => {
    window.addEventListener(
      "popstate",
      (event) => {
        if (event.state) {
          //do your code here
        }
      },
      false
    );
  });

  return (
    <div
      className="row d-flex justify-content-center"
      onClick={() => {
        // dispatch(setSelectedTicket(item));
        // dispatch(setSelectedReferenceTickets(undefined))
        goTo( HOME_PATH.ISSUE_DETAILS);
      }}
    >
      <div className="col col-sm-9">
        <div className="d-flex justify-content-between">
          <div>
            <H tag={"h3"} className="text-capitalize" text={title} />
            <div>
              <div className="h4 pl-1">
                <i className="bi bi-person-circle  mr-1"></i>
                {by_user.name}
              </div>
              <div>
                <span className="mr-2">
                  <Badge
                    pill
                    color={"info"}
                    className="h4 text-uppercase text-muted pointer"
                    text={"PHONE"}
                  />{" "}
                </span>
                <Badge
                  pill
                  color={"success"}
                  className="h4 text-uppercase text-muted pointer"
                  onClick={() => {
                    handleEmailClick(by_user.email);
                  }}
                  text={"Email"}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div>
              <h5 className="text-uppercase text-muted mb-0 card-title">
                {" "}
                <i
                  className={`bi bi-flag-fill text-${showPriorityColor} mr-2 mb-0`}
                ></i>
                {showPriority}
              </h5>
              <h5 className="text-uppercase text-muted mb-0 card-title">
                {" "}
                {getStatusFromCode(dashboardDetails, ticket_status)}{" "}
              </h5>
              <h5 className="text-muted mb-0">{getDataAndTime(created_at)}</h5>
            </div>
            <div className="mt-2">
              <small className="text-muted mb-0 text-sm">
                {" "}
                {translate("common.assignedBy")}{" "}
              </small>
              <p className="h4"> {assigned_to?.name} </p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <div>
            <div>
              <h2 className="h3 text-uppercase mb-0">
                {raised_by_company.display_name}
              </h2>
              <h5 className="h5 font-weight-normal">
                {raised_by_company.address}
              </h5>
            </div>
            <div className="m-0 mt-2">
              <span className="mr-2">
                {" "}
                <Badge
                  pill
                  color={"info"}
                  className=" h4 text-uppercase text-muted pointer"
                  text={"Phone"}
                />{" "}
              </span>
              <span className="">
                {" "}
                <Badge
                  pill
                  color={"success"}
                  className="h4 text-uppercase text-muted pointer"
                  onClick={() => {
                    handleEmailClick(by_user.email);
                  }}
                  text={"Email"}
                />
              </span>
            </div>
          </div>
          <div>
            <Image
              src={getPhoto(raised_by_company.attachment_logo)}
              variant={"rounded"}
              size={"xxl"}
            />
          </div>
        </div>

        {divider && <Divider />}
      </div>
    </div>
  );
}

export { TicketItem };
