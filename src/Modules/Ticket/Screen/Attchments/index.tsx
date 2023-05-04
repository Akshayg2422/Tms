// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useInput } from "@Hooks";
// import { Card, HomeContainer, Image, NoDataFound ,SearchInput,Divider, Spinner } from "@Components";
// import { translate } from "@I18n";
// import { getTicketsEvents } from "@Redux";
// import { getPhoto, MEA } from "@Utils";
// import InfiniteScroll from 'react-infinite-scroll-component';

// function Attachments() {
//   const dispatch = useDispatch();
//   const search = useInput("");
//   const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
//   const { selectedTicket, selectedReferenceTickets } = useSelector(
//     (state: any) => state.TicketReducer
//   );

//   const { taskEventAttachments, taskEventAttachmentsCurrentPage, refreshTaskEvents } = useSelector((state: any) => state.TaskReducer);

//   useEffect(() => {
//     const params = {
//       "ticket_id":"414b6c1c-47a3-4674-80fd-be61bc6173de",
//       "event_type":"MEA"
//     };

//     dispatch(
//       getTicketsEvents({
//         params,
//         onSuccess: () => () => { 
//           console.log("getTicketsEvents==========<>>>")
//         },
//         onError: () => () => { },
//       })
//     );
//   }, [selectedTicket, selectedReferenceTickets]);

//   const getSearchHandler = () => {
//     const params = {
//       ticket_id: selectedReferenceTickets
//         ? selectedReferenceTickets?.id
//         : selectedTicket?.id,
//       q_many: search.value,
//       event_type: MEA,
//     };
//     dispatch(
//       getTicketsEvents({
//         params,
//         onSuccess: () => () => { 
//           console.log('getSearchHandler---------->')
//         },
//         onError: () => () => { },
//       })
//     );
//   };

import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useWindowDimensions } from "@Hooks";
import { Card, Image, SearchInput, Divider, Spinner } from "@Components";
import { getTicketEventAttachments } from "@Redux";
import { getPhoto, MEA, capitalizeFirstLetter, INITIAL_PAGE } from "@Utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

function Attachments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const search = useInput("");
  const { ticketEventAttachments, ticketEventAttachmentsCurrentPage, refreshTicketEvents } = useSelector((state: any) => state.TicketReducer);
  const { height } = useWindowDimensions()



  useEffect(() => {
    getTicketEventsApiHandler(INITIAL_PAGE, search.value,)
  }, [search.value, refreshTicketEvents, id]);


  function getTicketEventsApiHandler(page_number: number, q_many?: string) {

    const params = {
      "ticket_id":"414b6c1c-47a3-4674-80fd-be61bc6173de",
      "event_type":"MEA",
      q_many,
      page_number
    };

    dispatch(
      getTicketEventAttachments({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => { }
      })
    );
  }


  return (

    <Card className="overflow-auto" style={{
      // height: height - 15
    }}>
      <div className="row text-right">
        <div className="col-5" >
          <SearchInput onSearch={search.set} />
        </div>
      </div >
      {ticketEventAttachments && ticketEventAttachments.length > 0 && <InfiniteScroll
        dataLength={ticketEventAttachments.length}
        hasMore={ticketEventAttachmentsCurrentPage !== -1}
        loader={<h4>
          <Spinner />
        </h4>}
        next={() => {
          if (ticketEventAttachments !== -1) {
            getTicketEventsApiHandler(ticketEventAttachments)
          }
        }
        }>
        <div className="mt-3">
          {
            ticketEventAttachments && ticketEventAttachments?.length > 0 && ticketEventAttachments?.map((item: any, index: number) => {
              const { attachments } = item
              return (
                <div >
                  {attachments?.attachments && <div>
                    <h4 className="mb-2"> {capitalizeFirstLetter(attachments?.name)} </h4>
                    {
                      attachments?.attachments?.map((image: any) => {
                        return (
                          <Image className={'mb-3 ml-2'} src={getPhoto(image?.attachment_file)} style={{ height: "100px", width: "100px" }} />
                        )
                      })
                    }
                  </div>
                  }
                  {index !== ticketEventAttachments.length - 1 && <Divider space={'3'} />}
                </div>
              )
            })
          }
        </div>
      </InfiniteScroll>}
    </Card >

  )
}
export { Attachments };
