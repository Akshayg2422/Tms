import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useNavigation } from "@Hooks";
import { getStatusFromCode } from "@Utils";
import { useSelector } from "react-redux";
import { TicketItemProps } from './interfaces'; 
import { getPhoto } from "@Utils";
import { Image } from "@Components";
import { setSelectedIssues, setSelectedReferenceIssues } from "@Redux";
import { HOME_PATH } from "@Routes";



import {
  Badge,
  Media,
  Table
} from "reactstrap";



function TicketItem({ item ,value}: TicketItemProps) {
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
  const { selectedReferenceIssues } = useSelector(
    (state: any) => state.AdminReducer
  );
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

  console.log("index",value)

  return (
    <>
      <tbody className="list"
         onClick={() => {
          dispatch(setSelectedIssues(item));
          dispatch(setSelectedReferenceIssues(undefined))
          goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_DETAILS);
      } }>
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              
              <Media>
                <span className="name  mb-0 text-sm">
                  {title}
                </span>
              </Media>

            </Media>
          </th>
          <td>
          <Media className="justify-content-center align-items-center">
          <a
                className=" mr-3"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >

                <Image
                  src={getPhoto(raised_by_company?.attachment_logo)}
                  variant={'rounded'}
                  size={"lg"}
                />
              </a>
              </Media>
             </td>
          <td className="budget"> <span>  {by_user?.name} </span></td>
          <td>
            <Badge color="" className="badge-dot mr-4">
              <i className={`bg-${showPriorityColor}`} />
              <span className="status">
                {showPriority}
              </span>
            </Badge>
          </td>
          <td>
            <span className="status"> {getStatusFromCode(dashboardDetails, ticket_status)}</span>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <span>{assigned_to?.name}</span>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <span> {raised_by_company?.display_name}</span>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <span> {raised_by_company?.address} </span>
            </div>
          </td>
        </tr>


      </tbody>
    </>
  )
}
export { TicketItem }