import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { Card, CommonTable, HomeContainer, NoDataFound, Status, Image, Priority } from '@Components';
import { capitalizeFirstLetter, getDates, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getStatusFromCode, paginationHandler } from '@Utils';
import { translate } from "@I18n";
import { useWindowDimensions } from '@Hooks';

function CompanyTickets() {

  const dispatch = useDispatch();
  const { tickets, ticketNumOfPages, ticketCurrentPages } = useSelector((state: any) => state.TicketReducer);
  const { selectedCompany } = useSelector((state: any) => state.UserCompanyReducer);
  const { height } = useWindowDimensions()


  useEffect(() => {
    getTicketHandler(ticketCurrentPages)

  }, []);


  function getTicketHandler(page_number: number) {
    const params = {
      branch_id: selectedCompany.branch_id,
      page_number
    }
    dispatch(getTickets({
      params,
      onSuccess: (response) => () => {
    
      },
      onError: () => () => { }
    }))
  }

  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((el: any) => {
        return {

          "ticket":
            <div className="row">
              <Priority priority={el?.priority} />
              <span className="col">{capitalizeFirstLetter(el?.title)}</span>
              <div className="pt-1">
                {el.parent && el.parent?.name && <div>{el.parent?.name}
                </div>
                }
              </div>
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

    <HomeContainer type={'card'} className="shadow-none overflow-auto overflow-hide mt-3 pt-3" style={{
      height: height - 85
    }}>
      {tickets && tickets.length > 0 ?
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

        />
        : <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}><NoDataFound text={translate("auth.noTaskFound")!} /></div>
      }
    </HomeContainer>

  )
}
export { CompanyTickets }