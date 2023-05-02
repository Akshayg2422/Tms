import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getDashboard, getTickets,setSelectedTicket  } from "@Redux";
import { HomeContainer, Button,Image, CommonTable, Priority, Status, NoDataFound } from "@Components";
import { useNavigation, useDropDown } from "@Hooks";
import { ROUTES } from '@Routes'
import { translate } from "@I18n";
import { TicketFilter} from "@Modules";
import { paginationHandler, getPhoto, getDisplayDateTimeFromMoment, getMomentObjFromServer, capitalizeFirstLetter} from "@Utils";
import { icons } from "@Assets";
import { log } from "console";
import { json } from "stream/consumers";

const DEFAULT_PARAMS = { q_many: "","tickets_by": "assigned_to", "ticket_status": "INP", "priority": "ALL", page_number: 1 }

function Ticket() {

  const dispatch = useDispatch()
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const { tickets, ticketNumOfPages, ticketCurrentPages, selectedTicket } = useSelector((state: any) => state.TicketReducer);
  const date = new Date();
  const time = date.getHours()

  const { goTo } = useNavigation();

  useEffect(() => {
    getTicketHandler(ticketCurrentPages)
    // console.log('getTicketHandler ======>',JSON.stringify(getTicketHandler))
  }, [params])



  useEffect(() => {
    getDashboardDetails()
    // console.log('getDash ======>',JSON.stringify(getTicketHandler))
  }, [selectedTicket])


  function getDashboardDetails() {
    const params = {}
    dispatch(getDashboard({
      params,
      onSuccess: (response) => () => {

        console.log( 'Response=====>', JSON.stringify(response) );

      },
      onError: () => () => { }
    }));
  }

  const getTicketHandler = (page_number: number) => {
    const updatedParams = { ...params, page_number }

    console.log('UpdateParams=====>'+ JSON.stringify(updatedParams) );

    dispatch(
      getTickets({
        params,
        onSuccess: (response) => () => {
          console.log('get Tickets======>',JSON.stringify(response));
          

        },
        onError: () => () => { },
      })
    );
  };


  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
    return data?.map((el: any) => {
      
      const etaDate = new Date(el.eta_time)
      let etaTime = etaDate.getHours()

      console.log('======>',data)
      return {

        "tickets": 
            <>
              <div className="row">
                <Priority priority={el?.priority} />
                <div>
                  <span>{capitalizeFirstLetter(el?.title)}</span>
                  <div className="pt-1">
                    {el.parent && el.parent?.name && <div>{el.parent?.name}
                    </div>
                    }
                  </div>
                </div>
              </div>
            </>,
        "attachments":
          // <div className="avatar-group" style={{
          //   // width: '87px'
          // }}>
          //   {
          //     el?.tickets_attachments &&
          //     el?.ticket_attachments.length > 0 && el?.ticket_attachments.map((item) => {

          //       return <a
          //         href="#pablo"
          //         onClick={(e) => e.preventDefault()}>
          //         <Image
          //           variant={'avatar'}
          //           src={getPhoto(item?.attachment_file)} /></a>
          //     })
          //   }

          // </div>,

          <div className="row avatar-group">
              {
                el?.ticket_attachments &&
                el?.ticket_attachments.length > 0 && el?.task_attachments.map((item) => {
                  return (
                    <Image
                      variant={'avatar'}
                      src={getPhoto(item?.attachment_file)} />
                  )
                })
              }

            </div >,

        "raised by":
          <div className="h5"> {el?.by_user?.name} </div>,
        "raised to":
          // <>
          //   <div className="row">
          //     <div className="col-3 p-0 align-self-center">
          //       <div className="col p-0 d-flex justify-content-center"> {el.raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(el.raised_by_company?.attachment_logo)} />} </div>
          //     </div>

          //     <div className="col-9 text-truncate">
          //       <h6>
          //         <div className="h5 mb-0"> {el?.raised_by_company?.display_name}</div>
          //         <div className="h5 mb-0 d-inline-block text-truncate">@<span className="h5"> {el?.assigned_to?.name} </span></div>
          //         <div className={'text-uppercase mb-0  text-muted'}>{el?.raised_by_company?.place || "Gummidipoondi"}</div>
          //       </h6>
          //     </div>
          //     <div className="col"></div>
          //   </div>

          // </>,
          <div className="row">
              {el.raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(el.raised_by_company?.attachment_logo)} />}
              <div className="ml-2">
                <div className="h5 mb-0"> {el?.raised_by_company?.display_name}</div>
                <div className="h5 mb-0 text-truncate">@<span className="h5"> {el?.assigned_to?.name} </span></div>
                <small className={'text-uppercase mb-0  text-muted'}>{el?.raised_by_company?.place}</small>
              </div>
            </div >,
        'Assigned At': getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at)),
        status: <div> <Status status={el?.ticket_status} /> 
        <small>{time > etaTime ? 'ABOVE ETA' : ""}</small>
        </div>
      };
    });
  };



  return (
    <>
       {/* <HomeContainer>
        {tickets && tickets.length > 0 ?
          <div className="text-right ">
            <Button
              size={"sm"}
              text={translate("common.addTicket")}
              onClick={() => {
                goTo(HOME_PATH.ISSUE_TICKET);
              }}
            />
          </div> : null
        }
      </HomeContainer>   */}
      {/* <div className="row"> */}
         

        <div className="col-auto text-right">
          <Button
            size={'sm'}
            text={translate('common.addTicket')}
            onClick={() => {
              goTo(ROUTES["ticket-module"]["add-ticket"])
            }
            }

          />

        </div>
      {/* </div> */}

       <HomeContainer type={'card'} className={'m-3 p-2'} >
        <TicketFilter  onParams={(filteredParams) => {
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
                console.log('Currentpage=========>', currentPage)
              }}
              previousClick={() => {
                getTicketHandler(paginationHandler("prev", ticketCurrentPages))
                // console.log('priv=======>',ticketCurrentPages)
              }
              }
              nextClick={() => {
                getTicketHandler(paginationHandler("next", ticketCurrentPages));
              }
              }
              tableOnClick={(idx, index, item) => {
                dispatch(setSelectedTicket(item));
                // dispatch(setSelectedReferenceTickets(undefined))
                goTo((ROUTES["ticket-module"]["ticket-details"] + '/' + item?.id));
              }
              }
            />
          </> : 
          <NoDataFound text={'No Ticket Found'} buttonText={'Create Ticket'} onClick={() => { goTo(ROUTES["ticket-module"]["add-ticket"]) }}/>
        }
        
      </HomeContainer>
    </>
  );
}

export { Ticket };



  // const { goTo } = useNavigation();
  // const { tickets, ticketNumOfPages, ticketCurrentPages } = useSelector((state: any) => state.TicketReducer);
  // const dispatch = useDispatch();
  // const search = useInput("");
  // const [params, setParams] = useState(DEFAULT_PARAMS)
  // const filteredTickets = useDropDown(FILTERED_LIST[2])
  // const ticketStatus = useDropDown(STATUS_LIST[2])
  // const ticketPriority = useDropDown(PRIORITY_DROPDOWN_LIST[0])
  // const companyType = useDropDown(COMPANY_TYPE[0])
  // const { isSync } = useSelector((state: any) => state.AppReducer);
  // const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  // const [basicTag, setBasicTag] = useState(true)
  // const [advanceTag, setAdvanceTag] = useState(false)

  // // const getCompanyBranchDropdown = (details: any) => {
  // //   let companies: any = [];
  // //   companies.push({ id: '', text: "Self" })

  // //   if (details && details.length > 0) {
  // //     details.forEach(({ id, display_name }) => {
  // //       companies = [
  // //         ...companies,
  // //         { id: id, text: display_name, name: display_name },
  // //       ];
  // //     });
  // //     setModifiedCompanyDropDownData(companies);
  // //   }
  // // };

  // //

  
  // useEffect(() => {
  //   // setSynctick testing
  //   setSyncTickets()
  //   const params = { q: "" };
  //   dispatch(
  //     getAssociatedCompanyBranch({
  //       params,
  //       onSuccess: (response: any) => () => {
  //         console.log( 'Responsive========>' + JSON.stringify(response)  );
  //         dispatch(
  //           setIsSync({
  //             ...isSync,
  //             companies: false,
  //           })
  //         );
  //         // getCompanyBranchDropdown(response.details);

  //       },
  //       onError: () => () => {

  //       },
  //     })
  //   );
  // }, []);

  // useEffect(() => {
  //   if (!isSync.Tickets) {
  //     getTicketHandler(ticketCurrentPages)
  //   }
  // }, [params])


  // const getTicketHandler = (pageNumber: number) => {

  //   const params = {
  //     q_many: search.value,
  //     tickets_by: filteredTickets?.value.id,
  //     ticket_status: ticketStatus?.value.id,
  //     company: companyType.value.id,
  //     priority: ticketPriority.value.id,
  //     page_number: pageNumber
  //   };
  //   console.log('PARAMS======>'+JSON.stringify(params));

  //   dispatch(
  //     getTickets({
  //       params,
  //       onSuccess: () => () => {
  //         // console.log('params--------->',JSON.stringify(params));
  //         setSyncTickets(true)
  //       },
  //       onError: () => () => { },
  //     })
  //   );

  // };

  // function setSyncTickets(sync = false) {
  //   dispatch(
  //     setIsSync({
  //       ...isSync,
  //       tickets: sync,
  //     })
  //   );
  // }


  // function proceedTickerSearch() {
  //   setSyncTickets()
  //   getTicketHandler(SEARCH_PAGE)
  // }
