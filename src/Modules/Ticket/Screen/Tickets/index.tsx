import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeContainer, Button, Image, CommonTable, Priority, Status, NoDataFound, Spinner } from "@Components";
import { useNavigation } from "@Hooks";
import { TicketFilter } from '@Modules';
import { ROUTES } from '@Routes'
import { getPhoto, paginationHandler, getMomentObjFromServer, getDisplayDateTimeFromMoment, capitalizeFirstLetter, getDates } from "@Utils";
import { getTickets, setSelectedTicket, setSelectedTicketTabPosition } from "@Redux";
import { translate } from '@I18n'


function Tickets() {

  const DEFAULT_PARAMS = { q_many: "", "tickets_by": "ALL", "ticket_status": "ALL", "priority": "ALL", "department_id": "ALL", "designation_id": "ALL", page_number: 1 }
  const { goTo } = useNavigation();
  const { tickets, ticketNumOfPages, ticketCurrentPages, selectedTicket } = useSelector((state: any) => state.TicketReducer);
  const dispatch = useDispatch();
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    setLoading(true)
    getTicketHandler(ticketCurrentPages)
  }, [params])

  const getTicketHandler = (page_number: number) => {
    const updatedParams = { ...params, page_number }


    dispatch(
      getTickets({
        params: updatedParams,
        onSuccess: (response) => () => {
          setLoading(false)
        },
        onError: (error) => () => {
          setLoading(false)
          console.log(JSON.stringify(error));

        },
      })
    );
  };



  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0)
      return data.map((el: any) => {
        return {

          "ticket":
            <div className="row">
              <div className="d-flex ">


                <div className="col-auto ">

                  <div className="mr--3"><Priority priority={el?.priority} /></div>


                </div>
                <div className="col ml--2 ">
                  <span>{capitalizeFirstLetter(el?.title)}</span>
                  <div className=" text-primary  ">
                    {el?.parent &&el
                    ?.parent?.name && <div>{el?.parent?.name}
                    </div>
                    }
                  </div>
                </div>
              </div>

              {/* <Priority priority={el?.priority} />
              <span className="col">{capitalizeFirstLetter(el?.title)}</span>
              <div className="pt-1">
                {el.parent && el.parent?.name && <div>{el.parent?.name}
                </div>
                }
              </div>
               */}
            </div>,
          'description': <div>
            {el?.description}

          </div>,

          "":
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

          'Assigned At': 
          <div>{getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at))} </div>,
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
              className={'text-white shadow-none'}
              size={'sm'}
              text={translate("common.createTicket")}
              onClick={() => {
                goTo(ROUTES["ticket-module"]["add-ticket"])
              }}
            />
          </div>
        </div>

        <HomeContainer type={'card'}>
          <TicketFilter onParams={(filteredParams) => {
            setParams({ ...params, ...filteredParams })
          }} />

          {
            loading && (
              <div className="d-flex justify-content-center align-item-center pointer" style={{ minHeight: '200px' }}>
                <Spinner />
              </div>
            )
          }

          {!loading && <div style={{ marginRight: '-23px', marginLeft: '-23px' }}>

            {tickets && tickets.length > 0 ?
              <div>
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
                    dispatch(setSelectedTicketTabPosition({ id: '1' }))
                    goTo(ROUTES['ticket-module']['tickets-details'] + '/' + item?.code);
                  }
                  }
                />
              </div> : <NoDataFound buttonText={translate("common.createTicket")!} />
            }
          </div>}

        </HomeContainer>
      </div>

    </>
  );
}

export { Tickets };