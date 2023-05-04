import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "@Hooks";
import { Card, HomeContainer, Image, NoDataFound } from "@Components";
import { translate } from "@I18n";
import { getTicketsEvents } from "@Redux";
import { getPhoto, MEA } from "@Utils";

function Attachments() {
  const dispatch = useDispatch();
  const search = useInput("");
  const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
  const { selectedTicket, selectedReferenceTickets } = useSelector(
    (state: any) => state.AdminReducer
  );

  useEffect(() => {
    const params = {
      ticket_id: selectedReferenceTickets
        ? selectedReferenceTickets?.id
        : selectedTicket?.id,
      event_type: MEA,
    };

    dispatch(
      getTicketsEvents({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }, [selectedTicket, selectedReferenceTickets]);

  const getSearchHandler = () => {
    const params = {
      ticket_id: selectedReferenceTickets
        ? selectedReferenceTickets?.id
        : selectedTicket?.id,
      q_many: search.value,
      event_type: MEA,
    };
    dispatch(
      getTicketsEvents({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };


  return (
    <HomeContainer >
      <Card>
        <div className="input-group bg-white border  col-lg-5 col-md-5 ">
          <input
            type="text"
            className="form-control bg-transparent border border-0"
            placeholder={translate("auth.search")!}
            value={search.value}
            onChange={search.onChange}
          />
          <span className="input-group-text border border-0 pointer" onClick={getSearchHandler} >  <i className="fas fa-search" /></span>
        </div>
        <div className='mt-4'>
          {
            ticketEvents && ticketEvents?.data.length > 0 ? ticketEvents?.data?.map((item: any, index: number) => {

              return (
                <>
                  {item?.attachments?.attachments && <div>
                    <h4 className='my-2'> {item?.attachments?.name} </h4>
                    {
                      item?.attachments?.attachments.map((image: any) => {

                        return (

                          <span className='mr-3 my-3'>
                            <Image src={getPhoto(image?.attachment_file)} style={{ height: "120px", width: "120px" }} />
                          </span>
                        )
                      })
                    }
                  </div>}
                </>
              )
            }) : <NoDataFound />

          }
        </div>
      </Card>

    </HomeContainer>

  )
}
export { Attachments };
