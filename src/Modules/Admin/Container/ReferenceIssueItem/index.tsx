import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeContainer, H, Badge } from "@Components";
import { ReferenceIssueItemProps } from "./interfaces";
import { getStatusFromCode } from "@Utils";

function ReferenceIssueItem({
  item,
  id,
  value,
  handleIssueOnClick,
}: ReferenceIssueItemProps) {
  const dispatch = useDispatch();
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);

  const {
    title,
    by_user,
    raised_by_company,
    ticket_status,
    created_at,
    assigned_to,
  } = item;
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-lg-8">
        <div className="row">
          <div className="col">
            <H tag={"h3"} className="text-capitalize pl-1" text={title} />
          </div>
          <div className="form-check col-auto">
            <input
              className="form-check-input text-muted"
              type="checkbox"
              value={value}
              id={id}
              onClick={handleIssueOnClick}
            ></input>
          </div>
        </div>
      </div>
      <div className="col-lg-5 col-md-7 col-sm-0 col-7">
        <div className="">
          <div className="h4 pl-1">
            {" "}
            <i className="bi bi-person-circle "></i> {by_user.name}{" "}
          </div>
          <div className="h3 text-uppercase px-1">
            {raised_by_company.display_name}
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-5 col-sm-0 col-5">
        <div className="">
          <span className="py-2">
          <h5 className="text-uppercase text-muted mb-0 card-title"><i className="ni ni-email-83 mr-1 mb-0"></i> {getStatusFromCode(dashboardDetails, ticket_status)} </h5>
          </span>
        </div>
      </div>
    </div>
  );
}
export { ReferenceIssueItem };
