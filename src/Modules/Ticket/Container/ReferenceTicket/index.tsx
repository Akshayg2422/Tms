import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTickets, setSelectedTicket } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { NoDataFound, Card, CommonTable, Button } from "@Components";
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'

function ReferenceTasks() {
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()

  const { ticketReferenceDetails, referenceTicketNoOfPages, referenceTicketCurrentPages, selectedTicket } = useSelector(
    (state: any) => state.TicketReducer
  );

  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { goTo } = useNavigation()

  useEffect(() => {
    proceedgetReferenceTickets(referenceTicketCurrentPages);
  }, [selectedTicket]);


  const proceedgetReferenceTickets = (page_number: number) => {
    const params = {
      page_number,
      ticket_id: selectedTicket.id,
      q: ""
    };

    dispatch(
      getReferenceTickets({
        params,
        onSuccess: (response) => () => {
console.log('referenceTicket======>',(getReferenceTickets))
        },
        onError: () => () => { },
      })
    );
  }


  const normalizedTableData = (data: any) => {

    return data?.map((el: any) => {
      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "raised by company": el?.raised_by_company?.name
      };
    });
  };


  return (

    <Card className={'overflow-auto overflow-hide mb--1'} style={{ height: height - 15 }}>
      <div className="col text-right">
        <Button size={'sm'} text={'Add Reference Ticket'} onClick={() => {
          goTo(ROUTES["ticket-module"]["reference-ticket"])
        }} />
      </div>
      {ticketReferenceDetails && ticketReferenceDetails?.length > 0 ?
        <CommonTable
          isPagination
          tableDataSet={ticketReferenceDetails}
          currentPage={referenceTicketCurrentPages}
          noOfPage={referenceTicketNoOfPages}
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
          tableOnClick={(e, index, item) => {
            dispatch(setSelectedTicket(item))
            goTo(ROUTES["ticket-module"]["tickets-details"] + '/' + item.id)
          }}

        /> : <div className="d-flex h-100 justify-content-center align-items-center"><NoDataFound buttonText={'Add Reference Ticket'} onClick={()=> goTo(ROUTES["task-module"]["reference-task"])} isButton/></div>}
    </Card>


  );
}
export { ReferenceTasks };
