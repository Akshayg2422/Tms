import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeContainer, Button, Image, CommonTable, Priority, Status, NoDataFound } from "@Components";
import { useNavigation } from "@Hooks";
import { translate } from "@I18n";
import { TicketFilter } from '@Modules';
import { ROUTES,HOME_PATH } from '@Routes'
import { getPhoto, paginationHandler, getMomentObjFromServer, getDisplayDateTimeFromMoment, capitalizeFirstLetter, getDates } from "@Utils";
import { getTickets, setSelectedTicket, getDashboard, setSelectedTabPosition } from "@Redux";




function Tickets() {

  const DEFAULT_PARAMS = { q_many: "", "tickets_by": "ALL", "ticket_status": "ALL", "priority": "ALL", page_number: 1 }
  const { goTo } = useNavigation();
  const { tickets, ticketNumOfPages, ticketCurrentPages,selectedTicket } = useSelector((state: any) => state.TicketReducer);
  const date = new Date();
  const time = date.getHours()
  const dispatch = useDispatch();
  const [params, setParams] = useState(DEFAULT_PARAMS)


  useEffect(() => {
    getTicketHandler(ticketCurrentPages)
    
  }, [params])



  useEffect(() => {
    getDashboardDetails()
  }, [selectedTicket])


  function getDashboardDetails() {
    const params = {}
    dispatch(getDashboard({
      params,
      onSuccess: (response) => () => {
      },
      onError: () => () => { }
    }));
  }


  const getTicketHandler = (page_number: number) => {
    const updatedParams = { ...params, page_number }

    
    dispatch(
      getTickets({
        params: updatedParams,
        onSuccess: (response) => () => {
        },
        onError: (error) => () => {

          console.log(JSON.stringify(error));

        },
      })
    );
  };

  console.log("selectedTicket",selectedTicket)



  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0)
      return data.map((el: any) => {
        return {

          "issue":
            <div className="row">
              <Priority priority={el?.priority} />
              <span className="col">{capitalizeFirstLetter(el?.title)}</span>
              <div className="pt-1">
                {el.parent && el.parent?.name && <div>{el.parent?.name}
                </div>
                }
              </div>
            </div>,

          "attachments":
            <div className="avatar-group">
              {
                el?.ticket_attachments &&
                el?.ticket_attachments.length > 0 && el?.ticket_attachments.map((item) => {

                  return (
                    <Image
                      variant={'avatar'}
                      src={getPhoto(item?.attachment_file)} />)
                })
              }

            </div>,

          "raised by":
            <div className="h5 m-0"> {el?.by_user?.name} </div>,
          "raised to":
            <>
              <div className="row">

                {el.raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(el.raised_by_company?.attachment_logo)} />}


                <div className="ml-2">

                  <div className="h5 mb-0"> {el?.raised_by_company?.display_name}</div>
                  <div className="h5 mb-0  text-truncate">@<span className="h5"> {el?.assigned_to?.name} </span></div>
                  <small className={'text-uppercase mb-0  text-muted'}>{el?.raised_by_company?.place}</small>

                </div>
              </div>
            </>,

          'Assigned At': <div>{getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at))} </div>,
          status: <div> <Status status={el?.ticket_status} />
            <small>{  
            getDates() > getDates(el.eta_time) ? 'ABOVE ETA' : "" 
            }</small>
          </div>
        };
      });
  };



  return (
    <>
      <div className="m-3">
        <div className="row justify-content-end m-0 mb-3">
            <div className=" ">
              <Button
                size={'sm'}
                text={'Create Ticket'}
                onClick={() => {
                  goTo(ROUTES["ticket-module"]["add-ticket"])
                }
                }
              />
          </div>
        </div>

        <HomeContainer type={'card'}>
          <TicketFilter onParams={(filteredParams) => {
            setParams({ ...params, ...filteredParams })
          }} />

          {tickets && tickets.length > 0 ?
            <>
              <CommonTable
                isPagination
                tableDataSet={tickets}
                displayDataSet={normalizedTableData(tickets)}
                noOfPage={ticketNumOfPages}
                currentPage={ticketCurrentPages}
                paginationNumberClick={(currentPage) => {
                  getTicketHandler(paginationHandler("current", currentPage));
                }}
                previousClick={() => {
                  getTicketHandler(paginationHandler("prev", ticketCurrentPages))
                }
                }
                nextClick={() => {
                  getTicketHandler(paginationHandler("next", ticketCurrentPages));
                }
                }
                tableOnClick={(idx, index, item) => {
                  dispatch(setSelectedTicket(item));
                 dispatch(setSelectedTabPosition({ id: '1' }))
                 goTo(ROUTES['ticket-module']['tickets-details']+'/'+item?.id);
                }
                }
              />
            </> : <NoDataFound text={'No Ticket Found'} buttonText={'Create Ticket'} />
          }

        </HomeContainer>
      </div>
    </>
  );
}

export { Tickets };