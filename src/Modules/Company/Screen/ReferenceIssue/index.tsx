import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Divider, H, Badge } from "@Components";
import { ReferenceIssueProps } from "./interfaces";
import { setIsSync, setSelectedReferenceIssues } from "@Redux";
import { getStatusFromCode, handleEmailClick, getDataAndTime } from "@Utils";
import { translate } from "@I18n";
import { HOME_PATH } from "@Routes";
import { useNavigation } from "@Hooks";
import { Home } from "@Modules//Website";

function ReferenceIssue({ item, divider }: ReferenceIssueProps) {
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);

  const { title, by_user, ticket_status, created_at, assigned_to } = item;
  const dispatch = useDispatch();
  const { goTo, goBack } = useNavigation();

  return (
    <div
      className="row d-flex justify-content-center"
      onClick={() => {
        dispatch(setSelectedReferenceIssues(item));

        goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_DETAILS);
        dispatch(setIsSync({ ...isSync, issues: false }));
      }}
    >
      <div className="col col-sm-9">
        <div className="d-flex justify-content-between">
          <div>
            <H tag={"h3"} className="text-capitalize pl-1" text={title} />
            <div className="h4 pl-1">
              {" "}
              <i className="bi bi-person-circle  "></i> {by_user.name}{" "}
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
          <div>
            <h5 className="text-uppercase text-muted mb-0 card-title">
              <i className="bi bi-calendar-week mr-1"></i>
              {getStatusFromCode(dashboardDetails, ticket_status)}
            </h5>
            <h5 className=" text-muted m-0"> {getDataAndTime(created_at)}</h5>
            <div className="mt-2">
              <small className="text-muted mb-0 text-sm">
                {" "}
                {translate("common.assignedBy")}{" "}
              </small>
              <p className="h4"> {assigned_to?.name} </p>
            </div>
          </div>
        </div>
        {divider && <Divider />}
      </div>
    </div>
  );
}
export { ReferenceIssue };
