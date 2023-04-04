import { HomeContainer, NoDataFound, CommonTable } from "@Components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTickets, setIsSync, setSelectedReferenceIssues } from "@Redux";
import {  getStatusFromCode, paginationHandler } from "@Utils";
import { HOME_PATH } from "@Routes";
import { useNavigation } from "@Hooks";

function ReferenceTickets() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { issueReferenceDetails, referenceTicketNoOfPages, referenceTicketCurrentPages } = useSelector(
    (state: any) => state.CompanyReducer
  );
  const { selectedIssues, selectedReferenceIssues, dashboardDetails } = useSelector(
    (state: any) => state.AdminReducer
  );

  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.referenceTickets) {
      proceedgetReferenceTickets(referenceTicketCurrentPages);
    }
  }, [isSync]);


  const proceedgetReferenceTickets = (pageNumber: number) => {
    const params = {
      pageNumber: pageNumber,
      id: selectedReferenceIssues
        ? selectedReferenceIssues?.id
        : selectedIssues?.id,
      q: "",
    };

    dispatch(
      getReferenceTickets({
        params,
        onSuccess: () => () => { },
        onFailure: () => () => { },
      })
    );
  }


  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
        issue: el?.title,
        "raised by": el?.by_user?.name,
        status: getStatusFromCode(dashboardDetails, el?.ticket_status),
        "assigned to": el?.assigned_to?.name,
        phone: el?.by_user?.phone,
        email: el?.by_user?.email
      };
    });
  };

  function setSyncCompany(sync = false) {
    dispatch(
      setIsSync({
        ...isSync,
        referenceTickets: sync,
      })
    );
  }

  return (


    <div className="my-3">
      {issueReferenceDetails && issueReferenceDetails?.length > 0 ?
        <CommonTable
          isPagination
          tableDataSet={issueReferenceDetails}
          currentPage={referenceTicketCurrentPages}
          noOfPage={referenceTicketNoOfPages}
          title={"Reference Details"}
          displayDataSet={normalizedTableData(issueReferenceDetails)}
          paginationNumberClick={(currentPage) => {
            proceedgetReferenceTickets(paginationHandler("current", currentPage));
          }}
          previousClick={() => {
            proceedgetReferenceTickets(paginationHandler("prev", referenceTicketCurrentPages))
          }
          }
          nextClick={() => {
            proceedgetReferenceTickets(paginationHandler("next", referenceTicketCurrentPages));
          }
          }
          // tableOnClick={(e, index, item) => {
          //   const selectedItem = issueReferenceDetails.data?.[index]
          // }
          tableOnClick={(idx, index, item) => {
            // dispatch(setSelectedIssues(item));
            dispatch(setSelectedReferenceIssues(item))
            goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_DETAILS);
          }
        
        
        }

        /> : <NoDataFound />}
    </div>


  );
}

export { ReferenceTickets };
