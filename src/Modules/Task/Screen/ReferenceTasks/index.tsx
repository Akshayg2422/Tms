import { NoDataFound, CommonTable } from "@Components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTickets, setIsSync } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";

function ReferenceTasks() {
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
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "assigned to": el?.assigned_to.name,
        phone: el?.by_user.phone,
        email: el?.by_user.email
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

    <></>

    // <div style={{ height: '82.3vh' }}>
    //   {issueReferenceDetails && issueReferenceDetails?.length > 0 ?
    //     <CommonTable
    //       isPagination
    //       tableDataSet={issueReferenceDetails}
    //       currentPage={referenceTicketCurrentPages}
    //       noOfPage={referenceTicketNoOfPages}
    //       title={"Reference Details"}
    //       displayDataSet={normalizedTableData(issueReferenceDetails)}
    //       paginationNumberClick={(currentPage) => {
    //         proceedgetReferenceTickets(paginationHandler("current", currentPage));
    //       }}
    //       previousClick={() => {
    //         proceedgetReferenceTickets(paginationHandler("prev", referenceTicketCurrentPages))
    //       }
    //       }
    //       nextClick={() => {
    //         proceedgetReferenceTickets(paginationHandler("next", referenceTicketCurrentPages));
    //       }
    //       }
    //       tableOnClick={(e, index, item) => {
    //         const selectedItem = issueReferenceDetails.data?.[index]
    //       }}

    //     /> : <NoDataFound />}
    // </div>


  );
}

export { ReferenceTasks };