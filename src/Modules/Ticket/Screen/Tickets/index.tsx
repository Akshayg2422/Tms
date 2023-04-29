import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssociatedCompanyBranch, setIsSync, setSelectedTask, getDashboard, getTickets } from "@Redux";
import { HomeContainer, Button, DropDown, InputHeading, Image, CommonTable, Priority, Status, NoDataFound } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { TicketFilter } from "@Modules";
import { getPhoto, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY_DROPDOWN_LIST, SEARCH_PAGE, COMPANY_TYPE, getMomentObjFromServer, getDisplayDateTimeFromMoment } from "@Utils";
import { setselectedReferenceTickets, setselectedTicket } from "@Redux";
// import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { icons } from "@Assets";
import { log } from "console";

const DEFAULT_PARAMS = { q_many: "","tickets_by": "assigned_to", "ticket_status": "INP", "priority": "ALL","group":"ALL", "include_subticket":false, page_number: 1 }

function Ticket() {

  const dispatch = useDispatch()
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const { tickets, ticketNumOfPages, ticketCurrentPages, selectedTicket } = useSelector((state: any) => state.TicketReducer);
  const date = new Date();
  const time = date.getHours()

  const { goTo } = useNavigation();

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
        params: updatedParams,
        onSuccess: (response) => () => {
          console.log(JSON.stringify(response));

        },
        onError: () => () => { },
      })
    );
  };


console.log('tickets======>',JSON.stringify(tickets));

  const normalizedTableData = (data: any) => {
    
    return data?.map((el: any) => {

      console.log('======>',data)
      return {

        "tickets": 
                 <div className="row"> 
                 <Priority priority={el?.priority} /> 
                 <span className="col">{el?.title}</span>
                 </div>,
        "attachments":
          <div className="avatar-group" style={{
            // width: '87px'
          }}>
            {
              el?.tickets_attachments &&
              el?.ticket_attachments.length > 0 && el?.ticket_attachments.map((item) => {

                return <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}>
                  <Image
                    variant={'avatar'}
                    src={getPhoto(item?.attachment_file)} /></a>
              })
            }

          </div>,

        "raised by":
          <div className="h5"> {el?.by_user?.name} </div>,
        "raised to":
          <>
            <div className="row">
              <div className="col-3 p-0 align-self-center">
                <div className="col p-0 d-flex justify-content-center"> {el.raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(el.raised_by_company?.attachment_logo)} />} </div>
              </div>

              <div className="col-9 text-truncate">
                <h6>
                  <div className="h5 mb-0"> {el?.raised_by_company?.display_name}</div>
                  <div className="h5 mb-0 d-inline-block text-truncate">@<span className="h5"> {el?.assigned_to?.name} </span></div>
                  <div className={'text-uppercase mb-0  text-muted'}>{el?.raised_by_company?.place || "Gummidipoondi"}</div>
                </h6>
              </div>
              <div className="col"></div>
            </div>

          </>,
        'Assigned At': getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at)),
        status: <div> <Status status={el?.ticket_status} /> </div>
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
                dispatch(selectedTicket(item));
                dispatch(setselectedReferenceTickets(undefined))
                goTo(HOME_PATH.TICKET_DETAILS);
              }
              }
            />
          </> : 
          <NoDataFound text={'No Ticket Found'} buttonText={'Create Ticket'} />
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
