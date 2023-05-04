import { HomeContainer, NoDataFound, CommonTable } from "@Components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTickets, setIsSync, setSelectedReferenceTickets } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { HOME_PATH } from "@Routes";
import { useNavigation } from "@Hooks";

function ReferenceTickets() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { ticketReferenceDetails, referenceTicketNoOfPages, referenceTicketCurrentPages } = useSelector(
    (state: any) => state.CompanyReducer
  );
  const { selectedTicket, selectedReferenceTickets, dashboardDetails } = useSelector(
    (state: any) => state.AdminReducer
  );

  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.referenceTickets) {
      proceedgetReferenceTickets(referenceTicketCurrentPages);
    }
  }, [isSync, selectedReferenceTickets]);


  const proceedgetReferenceTickets = (pageNumber: number) => {
    const params = {
      pageNumber: pageNumber,
      id: selectedReferenceTickets
        ? selectedReferenceTickets?.id
        : selectedTicket?.id,
      q: "",
    };

    dispatch(
      getReferenceTickets({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }


  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {
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
      {ticketReferenceDetails && ticketReferenceDetails?.length > 0 ?
        <CommonTable
          isPagination
          tableDataSet={ticketReferenceDetails}
          currentPage={referenceTicketCurrentPages}
          noOfPage={referenceTicketNoOfPages}
          title={"Reference Details"}
          displayDataSet={normalizedTableData(ticketReferenceDetails)}
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
          //   const selectedItem = ticketReferenceDetails.data?.[index]
          // }
          tableOnClick={(idx, index, item) => {
            // dispatch(setselectedTicket(item));
            // dispatch(setSelectedReferenceTickets(item))
            goTo(HOME_PATH.ISSUE_DETAILS);
          }


          }

        /> : <NoDataFound />}
    </div>


  );
}

export { ReferenceTickets };
